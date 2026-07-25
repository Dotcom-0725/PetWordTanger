import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2F9E63 0%, #1B6B44 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 80 }}>🐾</div>
        <div style={{ fontSize: 64, fontWeight: 800, marginTop: 20 }}>Tanger Animalerie</div>
        <div style={{ fontSize: 28, marginTop: 16, opacity: 0.9 }}>
          Animaux Vivants · Alimentation · Accessoires — Depuis 2015
        </div>
      </div>
    ),
    { ...size }
  );
}
