import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 90,
          background: "linear-gradient(135deg, #f16334 0%, #df4e1f 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontWeight: 900,
          borderRadius: "36px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: "-2px",
        }}
      >
        IG
      </div>
    ),
    {
      ...size,
    }
  );
}
