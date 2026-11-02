import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
const args = process.argv.slice(2);
const read = (...names) => {
  const i = args.findIndex((arg) => names.includes(arg));
  return i < 0 ? undefined : args[i + 1];
};
const host = read("--host", "--hostname") || "0.0.0.0";
const port = read("--port", "-p") || process.env.PORT || "3000";
if (!/^\d+$/.test(port)) throw new Error("Invalid development port");
const child = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    args.includes("--strictPort") && existsSync(".next/BUILD_ID")
      ? "start"
      : "dev",
    "--hostname",
    host,
    "--port",
    port,
  ],
  { stdio: "inherit" },
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => child.kill(signal));
child.on("exit", (code) => process.exit(code ?? 1));
