export function OrbitArtwork() {
  return (
    <svg aria-hidden="true" className="orbdiagram" viewBox="0 0 520 320">
      <defs>
        <radialGradient id="b">
          <stop stopColor="#9cbaff"></stop>
          <stop offset=".3" stopColor="#285be5"></stop>
          <stop offset="1" stopColor="#285be5" stopOpacity="0"></stop>
        </radialGradient>
        <radialGradient id="r">
          <stop stopColor="#ffb4bf"></stop>
          <stop offset=".3" stopColor="#df354a"></stop>
          <stop offset="1" stopColor="#df354a" stopOpacity="0"></stop>
        </radialGradient>
      </defs>
      <ellipse
        className="orbit"
        cx="260"
        cy="160"
        rx="225"
        ry="72"
        transform="rotate(-23 260 160)"
      ></ellipse>
      <ellipse
        className="orbit"
        cx="260"
        cy="160"
        rx="225"
        ry="72"
        transform="rotate(23 260 160)"
      ></ellipse>
      <path className="orbit" d="M40 160h440M260 30v260"></path>
      <g id="orbitBlue" transform="translate(149 160)">
        <circle fill="url(#b)" r="84"></circle>
        <circle fill="#285be5" r="23"></circle>
      </g>
      <g id="orbitRed" transform="translate(370 160)">
        <circle fill="url(#r)" r="84"></circle>
        <circle fill="#df354a" r="23"></circle>
      </g>
      <circle cx="260" cy="160" fill="#8d70bd" r="3"></circle>
    </svg>
  );
}
