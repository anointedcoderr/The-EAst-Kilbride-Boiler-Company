import { ImageResponse } from "next/og";

// Apple touch icon - 180x180, same brand mark scaled up. Shows when an
// iOS user adds the site to their home screen. Same Carbon Mint design
// as the favicon but with bigger EKBC wordmark (the 180px canvas has
// room for the full four letters), thicker glow border and a more
// prominent inset glow.

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          background: "#050505",
          color: "#5BFEB1",
          fontFamily:
            "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          borderRadius: 36,
          border: "2px solid rgba(91, 254, 177, 0.5)",
          boxShadow: "inset 0 0 40px rgba(91, 254, 177, 0.18)",
        }}
      >
        <span
          style={{
            fontSize: 76,
            fontWeight: 900,
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          EKBC
        </span>
        <span
          style={{
            marginTop: 10,
            fontSize: 12,
            fontWeight: 700,
            color: "#A3FED6",
            letterSpacing: 3,
          }}
        >
          EAST KILBRIDE
        </span>
      </div>
    ),
    { ...size }
  );
}
