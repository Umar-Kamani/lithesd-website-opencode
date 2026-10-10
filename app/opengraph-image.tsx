import { ImageResponse } from "next/og";

export const alt =
  "Lithe SD — a more flexible approach to enterprise technology distribution";
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
            "radial-gradient(900px 520px at 50% 42%, #06105a 0%, #00052e 72%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 99,
              background: "#34fcff",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#afb4db",
            }}
          >
            Lithe SD
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.05,
              letterSpacing: -2,
              fontWeight: 300,
              maxWidth: 900,
            }}
          >
            A more flexible approach to technology
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.45,
              color: "#afb4db",
              maxWidth: 820,
            }}
          >
            Solutions Value-Added Distributor · IOC · East Africa · Middle East
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.16)",
            paddingTop: 26,
            fontSize: 22,
            color: "#8185a0",
          }}
        >
          <span>100% Channel Driven</span>
          <span style={{ color: "#34fcff" }}>lithesd.com</span>
        </div>
      </div>
    ),
    size,
  );
}
