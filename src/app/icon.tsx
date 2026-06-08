import { ImageResponse } from "next/og";

// Dynamic 32x32 favicon rendered by next/og. The existing wide wordmark
// in /public/images/logo.png is illegible at 32px so we generate a
// compact square brand mark on the same Carbon Mint palette instead.
// Carbon-950 background, mint-500 EK letters, soft mint border halo.

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
          color: "#5BFEB1",
          fontSize: 18,
          fontWeight: 900,
          fontFamily:
            "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          letterSpacing: -1,
          borderRadius: 6,
          border: "1px solid rgba(91, 254, 177, 0.45)",
          boxShadow: "inset 0 0 6px rgba(91, 254, 177, 0.25)",
        }}
      >
        EK
      </div>
    ),
    { ...size }
  );
}
