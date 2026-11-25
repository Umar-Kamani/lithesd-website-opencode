import { ImageResponse } from "next/og";

export const alt = "Lithe SD — a more flexible approach to enterprise technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(900px 520px at 50% 40%, #0a1a55 0%, #05070F 70%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 10, height: 10, borderRadius: 99, background: "#1E6DFF" }} />
          <div style={{ width: 10, height: 10, borderRadius: 99, background: "#F6772F" }} />
          <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#95979E" }}>
            Lithe SD
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 72, lineHeight: 0.98, letterSpacing: -3, fontWeight: 500, maxWidth: 920 }}>
            A more flexible approach to technology
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.4, color: "#A9A9AA", maxWidth: 840 }}>
            Solutions value-added distributor · IOC · East Africa · Middle East
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 26,
            fontSize: 22,
            color: "#6B7280",
          }}
        >
          <span>Specialist brands · 100% channel driven</span>
          <span style={{ color: "#4A8BFF" }}>lithesd.com</span>
        </div>
      </div>
    ),
    size,
  );
}
