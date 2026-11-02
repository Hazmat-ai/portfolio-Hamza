(()=>{
/** Educational timing model, not an ARM emulator or hardware benchmark. */
const CORES = Object.freeze({
  m0: { name: "Cortex-M0", irqCycles: 16, defaultMHz: 32, isa: "ARMv6-M" },
  m0p: { name: "Cortex-M0+", irqCycles: 15, defaultMHz: 48, isa: "ARMv6-M" },
  m3: { name: "Cortex-M3", irqCycles: 12, defaultMHz: 72, isa: "ARMv7-M" },
  m4: { name: "Cortex-M4", irqCycles: 12, defaultMHz: 168, isa: "ARMv7E-M" },
});
const DEFAULTS = Object.freeze({
  core: "m3",
  clockMHz: 72,
  low: 800,
  high: 3200,
  sampleHz: 2,
  signalHz: 0.2,
  noise: 80,
  manual: 2048,
  source: "sine",
  loadCycles: 2,
  storeCycles: 2,
  branchCycles: 3,
  gpioNs: 2,
  seed: 42,
});
const PROGRAM = Object.freeze([
  ["poll", "LDR", "R1, [ADC_DR]", "Read the ADC sample"],
  ["", "LDR", "R2, =T_HIGH", "Load the upper threshold"],
  ["", "CMP", "R1, R2", "Compare unsigned ADC code"],
  ["", "BHI", "alert_high", "Branch if above the upper limit"],
  ["", "LDR", "R3, =T_LOW", "Load the lower threshold"],
  ["", "CMP", "R1, R3", "Compare with the lower limit"],
  ["", "BLO", "alert_low", "Branch if below the lower limit"],
  ["", "MOVS", "R0, #0", "Safe output"],
  ["", "STR", "R0, [GPIO_OUT]", "Write GPIO"],
  ["", "B", "poll", "Repeat polling"],
  ["alert_high", "MOVS", "R0, #1", "High alert output"],
  ["", "STR", "R0, [GPIO_OUT]", "Write GPIO"],
  ["", "B", "poll", "Repeat polling"],
  ["alert_low", "MOVS", "R0, #2", "Low alert output"],
  ["", "STR", "R0, [GPIO_OUT]", "Write GPIO"],
  ["", "B", "poll", "Repeat polling"],
]);
const finite = (v, min, max, name, integer = false) => {
  if (
    typeof v !== "number" ||
    !Number.isFinite(v) ||
    v < min ||
    v > max ||
    (integer && !Number.isInteger(v))
  )
    throw new Error(
      `${name} must be ${integer ? "an integer" : "a number"} from ${min} to ${max}.`,
    );
  return v;
};
function validateConfig(c) {
  if (!c || typeof c !== "object" || Array.isArray(c))
    throw new Error("Settings must be an object.");
  if (Object.keys(c).some((k) => !Object.hasOwn(DEFAULTS, k)))
    throw new Error("Unknown setting in session.");
  const out = { ...DEFAULTS, ...c };
  if (!Object.hasOwn(CORES, out.core))
    throw new Error("Select a supported Cortex core.");
  if (!["sine", "manual"].includes(out.source))
    throw new Error("Select sine or manual input.");
  for (const [key, min, max, integer] of [
    ["clockMHz", 1, 1000, false],
    ["low", 0, 4095, true],
    ["high", 0, 4095, true],
    ["sampleHz", 1, 20, false],
    ["signalHz", 0.01, 10, false],
    ["noise", 0, 1000, true],
    ["manual", 0, 4095, true],
    ["loadCycles", 1, 100, true],
    ["storeCycles", 1, 100, true],
    ["branchCycles", 1, 100, true],
    ["gpioNs", 0, 10000, false],
    ["seed", 1, 4294967295, true],
  ])
    finite(out[key], min, max, key, integer);
  if (out.low >= out.high)
    throw new Error("Lower threshold must be below the upper threshold.");
  return out;
}
function adcCode(voltage, vref = 3.3, bits = 12) {
  finite(vref, 0.001, 100, "Reference voltage");
  finite(bits, 1, 24, "ADC bits", true);
  finite(voltage, 0, vref, "Input voltage");
  return Math.round((voltage / vref) * (2 ** bits - 1));
}
function classify(code, low, high) {
  finite(code, 0, 4095, "ADC code", true);
  if (
    !Number.isInteger(low) ||
    !Number.isInteger(high) ||
    low < 0 ||
    high > 4095 ||
    low >= high
  )
    throw new Error("Invalid thresholds.");
  return code > high ? "high" : code < low ? "low" : "safe";
}
function pathFor(status) {
  if (status === "high") return [0, 1, 2, 3, 10, 11, 12];
  if (status === "low") return [0, 1, 2, 3, 4, 5, 6, 13, 14, 15];
  if (status === "safe") return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  throw new Error("Unknown alert state.");
}
function timing(status, config) {
  const c = validateConfig(config),
    path = pathFor(status);
  const costs = path.map((i) => {
    const op = PROGRAM[i][1];
    if (op === "LDR") return c.loadCycles;
    if (op === "STR") return c.storeCycles;
    if (op === "B") return c.branchCycles;
    if (op === "BHI") return status === "high" ? c.branchCycles : 1;
    if (op === "BLO") return status === "low" ? c.branchCycles : 1;
    return 1;
  });
  const cycles = costs.reduce((a, b) => a + b, 0),
    clockNs = 1000 / c.clockMHz,
    executionNs = cycles * clockNs;
  const gpioIndex = path.findIndex((i) => PROGRAM[i][1] === "STR");
  const detectionNs =
    costs.slice(0, gpioIndex + 1).reduce((a, b) => a + b, 0) * clockNs +
    c.gpioNs;
  return {
    path,
    costs,
    instructions: path.length,
    cycles,
    clockNs,
    executionNs,
    detectionNs,
    samplingWorstNs: 1e9 / c.sampleHz + detectionNs,
    irqNs: CORES[c.core].irqCycles * clockNs,
    activeFraction: (executionNs / (1e9 / c.sampleHz)) * 100,
  };
}
function createRng(seed) {
  let value = seed >>> 0;
  return () => {
    value = (Math.imul(1664525, value) + 1013904223) >>> 0;
    return value / 4294967296;
  };
}
function sampleAt(index, config, rng, elapsed = null) {
  const c = validateConfig(config);
  finite(index, 0, 1e9, "Sample index", true);
  const seconds =
    elapsed === null
      ? index / c.sampleHz
      : finite(elapsed, 0, 1e12, "Sample time");
  const code =
    c.source === "manual"
      ? c.manual
      : Math.max(
          0,
          Math.min(
            4095,
            Math.round(
              2047.5 +
                1700 * Math.sin(2 * Math.PI * c.signalHz * seconds) +
                (rng() - 0.5) * 2 * c.noise,
            ),
          ),
        );
  const status = classify(code, c.low, c.high);
  return {
    index,
    time: seconds,
    code,
    voltage: (code / 4095) * 3.3,
    status,
    core: c.core,
    clockMHz: c.clockMHz,
    low: c.low,
    high: c.high,
    sampleHz: c.sampleHz,
    ...timing(status, c),
  };
}
function parseSession(text) {
  if (text.length > 100000) throw new Error("Session file is too large.");
  const data = JSON.parse(text);
  if (data?.version !== 1) throw new Error("Unsupported session format.");
  return validateConfig(data.config);
}
function csvRows(records) {
  return [
    "sample,time_s,adc_code,voltage_v,state,modeled_cycles,modeled_execution_ns,core,clock_mhz,lower_threshold,upper_threshold,sample_hz",
    ...records.map((r) =>
      [
        r.index,
        r.time.toFixed(6),
        r.code,
        r.voltage.toFixed(6),
        r.status,
        r.cycles,
        r.executionNs.toFixed(3),
        r.core,
        r.clockMHz,
        r.low,
        r.high,
        r.sampleHz,
      ].join(","),
    ),
  ].join("\n");
}

const $ = (id) => document.getElementById(id);
let config = { ...DEFAULTS },
  records = [],
  running = false,
  timer = null,
  elapsed = 0,
  index = 0,
  rng = createRng(config.seed),
  last = sampleAt(0, config, createRng(config.seed)),
  noticeTimer;
const num = (n, d = 1) =>
  n.toLocaleString(undefined, {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
const escape = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
function notice(text) {
  $("notice").textContent = text;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => ($("notice").textContent = ""), 4000);
}
function error(text) {
  $("error").textContent = text;
  $("error").hidden = !text;
}
function download(name, type, content) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function syncInputs() {
  for (const key of Object.keys(config)) {
    const input = $(key);
    if (input) input.value = config[key];
  }
  for (const key of ["low", "high", "manual", "noise"])
    $(key + "-value").value = config[key];
  $("manual").disabled = config.source !== "manual";
}
function pause() {
  running = false;
  clearTimeout(timer);
  timer = null;
  $("run").textContent = "Run simulation";
  $("run-status").textContent = "Paused · single sample available";
}
function preview() {
  const code = config.source === "manual" ? config.manual : last.code;
  last = {
    ...sampleAt(0, config, createRng(config.seed), elapsed),
    code,
    voltage: (code / 4095) * 3.3,
    status: classify(code, config.low, config.high),
    ...timing(classify(code, config.low, config.high), config),
  };
  render();
}
function capture() {
  last = sampleAt(index, config, rng, elapsed);
  records.push(last);
  if (records.length > 1000) records.shift();
  index++;
  elapsed += 1 / config.sampleHz;
  render();
}
function schedule() {
  if (!running) return;
  timer = setTimeout(() => {
    capture();
    schedule();
  }, 1000 / config.sampleHz);
}
function reset() {
  pause();
  records = [];
  elapsed = 0;
  index = 0;
  rng = createRng(config.seed);
  last = sampleAt(0, config, createRng(config.seed));
  render();
  notice("Capture reset. The same seed repeats the same signal.");
}
for (const key of Object.keys(config)) {
  const input = $(key);
  if (!input) continue;
  input.addEventListener(
    input.tagName === "SELECT" ? "change" : "input",
    () => {
      const candidate = {
        ...config,
        [key]: ["core", "source"].includes(key)
          ? input.value
          : Number(input.value),
      };
      if (key === "core") candidate.clockMHz = CORES[input.value].defaultMHz;
      try {
        config = validateConfig(candidate);
        error("");
        syncInputs();
        if (key === "seed") rng = createRng(config.seed);
        if (running) {
          clearTimeout(timer);
          schedule();
        }
        preview();
      } catch (e) {
        error(e.message);
      }
    },
  );
  input.addEventListener("blur", syncInputs);
}
$("run").onclick = () => {
  if (running) pause();
  else {
    error("");
    running = true;
    $("run").textContent = "Pause simulation";
    $("run-status").textContent = "Running · generated input";
    capture();
    schedule();
  }
};
$("step").onclick = () => {
  pause();
  capture();
};
$("reset").onclick = () => {
  if (
    index &&
    !confirm(
      "Clear the captured samples? Export CSV first if you want to keep them.",
    )
  )
    return;
  reset();
};
$("export-csv").onclick = () =>
  download("signal-bench-capture.csv", "text/csv", csvRows(records));
$("export-session").onclick = () =>
  download(
    "signal-bench-settings.json",
    "application/json",
    JSON.stringify({ version: 1, config }, null, 2),
  );
$("import-session").onclick = () => $("file").click();
$("file").onchange = async (event) => {
  const file = event.target.files[0];
  event.target.value = "";
  if (!file) return;
  try {
    if (file.size > 100000)
      throw new Error("Choose a settings file smaller than 100 KB.");
    const parsed = parseSession(await file.text());
    if (index && !confirm("Loading settings starts a new capture. Continue?"))
      return;
    config = parsed;
    syncInputs();
    reset();
    error("");
    notice("Settings loaded.");
  } catch (e) {
    error(
      e instanceof SyntaxError ? "This file contains invalid JSON." : e.message,
    );
  }
};
document.addEventListener("visibilitychange", () => {
  if (document.hidden && running) {
    pause();
    notice("Paused while this tab is hidden.");
  }
});
function render() {
  const status = classify(last.code, config.low, config.high),
    t = timing(status, config);
  $("adc").textContent = last.code;
  $("voltage").textContent = num((last.code / 4095) * 3.3, 3) + " V input";
  $("alert").textContent =
    status === "safe" ? "SAFE" : status === "high" ? "HIGH ALERT" : "LOW ALERT";
  $("alert").className = "status " + status;
  $("boundary").textContent =
    status === "safe"
      ? `${config.low} ≤ D ≤ ${config.high}`
      : status === "high"
        ? `D > ${config.high}`
        : `D < ${config.low}`;
  $("sample-count").textContent = `${index} sample${index === 1 ? "" : "s"}`;
  $("export-csv").disabled = !records.length;
  $("path-count").textContent =
    `${t.instructions} instructions · ${t.cycles} modeled cycles`;
  $("assembly").innerHTML = PROGRAM.map(
    ([label, op, args, comment], i) =>
      `${label ? '<div class="asm-label">' + escape(label) + ":</div>" : ""}<div class="code-line ${t.path.includes(i) ? "active" : ""} ${label ? "label" : ""}" title="${escape((label ? label + ": " : "") + comment)}"><span>${t.path.includes(i) ? "→" : ""}</span><em>${op}</em><span>${escape(args)}</span></div>`,
  ).join("");
  const metrics = [
    ["Clock period", num(t.clockNs, 3) + " ns"],
    ["Whole loop path", num(t.executionNs) + " ns"],
    ["ADC read → GPIO write", num(t.detectionNs) + " ns"],
    ["Sampling interval", num(1000 / config.sampleHz) + " ms"],
    ["Sampled detection bound", num(t.samplingWorstNs / 1e6, 4) + " ms"],
    ["Ideal exception entry", num(t.irqNs) + " ns"],
    ["Per-sample work fraction", num(t.activeFraction, 6) + "%"],
  ];
  $("timing").innerHTML = metrics
    .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
    .join("");
  const nyquist = config.sampleHz >= 2 * config.signalHz;
  $("nyquist").textContent =
    config.source === "manual"
      ? "Manual input: no periodic signal is defined, so no Nyquist conclusion is made."
      : `${nyquist ? "Nyquist condition met" : "Aliasing risk"} for the clean sine: ${config.sampleHz} Hz ${nyquist ? "≥" : "<"} 2 × ${config.signalHz} Hz. Random noise is not band-limited by this model.`;
  renderTrace();
  renderComparison(t);
  renderEquations(t, status);
}
function svgFrame(width, height, content, label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escape(label)}">${content}</svg>`;
}
function renderTrace() {
  const w = Math.max(300, $("signal-plot").clientWidth),
    h = 255,
    left = 48,
    right = 18,
    top = 20,
    bottom = 40,
    xspan = w - left - right,
    yspan = h - top - bottom;
  const shown = records.slice(-60),
    first = shown[0]?.time ?? 0,
    lastTime = shown.at(-1)?.time ?? 1,
    timeSpan = Math.max(1 / config.sampleHz, lastTime - first);
  const x = (t) => left + ((t - first) / timeSpan) * xspan,
    y = (v) => top + ((4095 - v) / 4095) * yspan;
  let s = [0, 1024, 2048, 3072, 4095]
    .map(
      (value) =>
        `<line x1="${left}" y1="${y(value)}" x2="${w - right}" y2="${y(value)}" stroke="#dce2df"/><text x="${left - 8}" y="${y(value) + 4}" text-anchor="end">${value}</text>`,
    )
    .join("");
  for (const [v, color, label] of [
    [config.low, "#946017", "LOW"],
    [config.high, "#b14539", "HIGH"],
  ])
    s += `<line x1="${left}" y1="${y(v)}" x2="${w - right}" y2="${y(v)}" stroke="${color}" stroke-dasharray="4 4"/><text x="${w - right}" y="${y(v) - 6}" text-anchor="end">${label} ${v}</text>`;
  if (shown.length)
    s += `<polyline points="${shown.map((p) => `${x(p.time)},${y(p.code)}`).join(" ")}" fill="none" stroke="#1e4562" stroke-width="2"/>`;
  for (const p of shown)
    s += `<circle cx="${x(p.time)}" cy="${y(p.code)}" r="3" fill="${p.status === "safe" ? "#38644a" : p.status === "high" ? "#b14539" : "#946017"}"><title>${p.time.toFixed(2)} s: ${p.code} (${p.status})</title></circle>`;
  if (!shown.length)
    s += `<text x="${left + xspan / 2}" y="${top + yspan / 2}" text-anchor="middle">Run or take a single sample to start the trace.</text>`;
  s += `<text x="${left}" y="${h - 15}">${first.toFixed(1)} s</text><text x="${w - right}" y="${h - 15}" text-anchor="end">${(first + timeSpan).toFixed(1)} s</text><text x="${left + xspan / 2}" y="${h - 15}" text-anchor="middle" class="axis-label">Simulated time (s)</text><text x="0" y="12" class="axis-label">ADC code</text>`;
  $("signal-plot").innerHTML = svgFrame(w, h, s, "ADC trace with thresholds");
}
function renderComparison() {
  const w = Math.max(300, $("comparison-plot").clientWidth),
    h = 300,
    left = 100,
    right = 65,
    top = 35,
    bottom = 46;
  const rows = Object.entries(CORES).map(([id, c]) => {
    const cfg = {
      ...config,
      core: id,
      clockMHz: id === config.core ? config.clockMHz : c.defaultMHz,
    };
    return {
      name: c.name,
      mhz: cfg.clockMHz,
      active: id === config.core,
      ...timing(classify(last.code, config.low, config.high), cfg),
    };
  });
  const max = Math.max(...rows.flatMap((r) => [r.executionNs, r.irqNs])) * 1.1,
    x = (v) => left + ((w - left - right) * v) / max;
  let s = `<rect x="${left}" y="10" width="12" height="8" fill="#1e4562"/><text x="${left + 18}" y="18">Polling path</text><rect x="${left + 120}" y="10" width="12" height="8" fill="#abbdb9"/><text x="${left + 138}" y="18">IRQ entry</text>`;
  rows.forEach((r, i) => {
    const y = top + i * 52;
    s += `<text x="${left - 10}" y="${y + 12}" text-anchor="end">${r.name.replace("Cortex-", "")}${r.active ? " *" : ""}</text><text x="${left - 10}" y="${y + 30}" text-anchor="end" class="axis-label">${r.mhz} MHz</text><rect x="${left}" y="${y}" width="${x(r.executionNs) - left}" height="13" fill="#1e4562"/><rect x="${left}" y="${y + 17}" width="${x(r.irqNs) - left}" height="13" fill="#abbdb9"/><text x="${x(r.executionNs) + 5}" y="${y + 11}">${num(r.executionNs)}</text><text x="${x(r.irqNs) + 5}" y="${y + 28}">${num(r.irqNs)}</text>`;
  });
  s += `<line x1="${left}" y1="${h - bottom}" x2="${w - right}" y2="${h - bottom}" stroke="#b9c5c0"/><text x="${left}" y="${h - 24}">0</text><text x="${w - right}" y="${h - 24}" text-anchor="end">${num(max, 0)}</text><text x="${left + (w - left - right) / 2}" y="${h - 7}" text-anchor="middle" class="axis-label">Modeled time (ns) · * selected core</text>`;
  $("comparison-plot").innerHTML = svgFrame(
    w,
    h,
    s,
    "Modeled core comparison, nanoseconds",
  );
}
function renderEquations(t, status) {
  const volts = (last.code / 4095) * 3.3;
  const equations = [
    [
      "01 · ADC conversion",
      "D = round((Vin / Vref) × (2ⁿ − 1))",
      `${num(volts, 3)} / 3.3 × 4095 ≈ ${last.code}`,
    ],
    [
      "02 · Quantization step",
      "LSB = Vref / 2ⁿ",
      `${num((3.3 / 4096) * 1000, 4)} mV per ideal quantization bin`,
    ],
    [
      "03 · Sample frequency",
      "fs = 1 / Ts",
      `1 / ${num(1 / config.sampleHz, 3)} s = ${config.sampleHz} Hz`,
    ],
    [
      "04 · Nyquist condition",
      "fs ≥ 2 × fsignal",
      config.source === "manual"
        ? "Not evaluated for manual input."
        : `${config.sampleHz} Hz vs ${2 * config.signalHz} Hz; applies to the clean sine only.`,
    ],
    [
      "05 · Upper threshold",
      "D > T_HIGH → high",
      `${last.code} > ${config.high}: ${last.code > config.high}`,
    ],
    [
      "06 · Lower threshold",
      "D < T_LOW → low",
      `${last.code} < ${config.low}: ${last.code < config.low}`,
    ],
    [
      "07 · Inclusive safe range",
      "T_LOW ≤ D ≤ T_HIGH",
      status === "safe" ? "Both bounds satisfied." : "Outside the safe range.",
    ],
    [
      "08 · Modeled execution",
      "T_exec = Σ(cost_i) × T_clock",
      `${t.cycles} × ${num(t.clockNs, 3)} ns = ${num(t.executionNs)} ns`,
    ],
    [
      "09 · Detection bound",
      "T_detect ≤ Ts + T_read-to-GPIO",
      `${num(t.samplingWorstNs / 1e6, 4)} ms, assuming a sample opportunity within Ts`,
    ],
    [
      "10 · GPIO modeled response",
      "T_GPIO_response = prefix cycles / fclk + GPIO delay",
      `${num(t.detectionNs)} ns; includes instructions through STR`,
    ],
    [
      "11 · Electrical power",
      "P = V × I",
      "No current is measured or specified. Power is not estimated.",
    ],
    [
      "12 · Per-sample work fraction",
      "work fraction = T_exec / Ts × 100%",
      `${num(t.activeFraction, 6)}%; excludes busy polling and other processor work.`,
    ],
  ];
  $("equations").innerHTML =
    '<div class="equations-grid">' +
    equations
      .map(
        ([title, formula, value]) =>
          `<section class="eq"><h3>${escape(title)}</h3><p>${escape(formula)}</p><span>${escape(value)}</span></section>`,
      )
      .join("") +
    "</div>";
}
new ResizeObserver(() => {
  renderTrace();
  renderComparison();
}).observe($("signal-plot"));
syncInputs();
render();

})();