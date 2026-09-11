import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: "linear-gradient(135deg, #f16334 0%, #df4e1f 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontWeight: 900,
          borderRadius: "7px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: "-0.5px",
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
