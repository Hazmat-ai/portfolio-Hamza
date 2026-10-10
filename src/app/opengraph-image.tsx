import { ImageResponse } from "next/og";
export const alt = "Hamza Rizvi — Built on curiosity.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 70,
        background: "#08090c",
        color: "#f1f0f3",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
        }}
      >
        <span>HAMZA RIZVI</span>
        <span style={{ color: "#a5c6ff" }}>SOFTWARE DEVELOPER</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 88,
          letterSpacing: -5,
          lineHeight: 1.05,
        }}
      >
        <span>Hamza Rizvi.</span>
        <span style={{ color: "#a5c6ff" }}>Built on curiosity.</span>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #39353f",
          paddingTop: 25,
          fontSize: 20,
          color: "#b0afb9",
        }}
      >
        Full-stack · AI / ML · Robotics · UX Design
      </div>
    </div>,
    size,
  );
}
