import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "PM Streak";
  const vertical = searchParams.get("vertical") ?? "pm";

  const verticalLabel: Record<string, string> = {
    pm: "Product Management",
    design: "Design",
    engineering: "Engineering",
    growth: "Growth",
  };

  const label = verticalLabel[vertical] ?? "Learn";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              background: "#58cc02",
              borderRadius: 12,
              padding: "6px 16px",
              fontSize: 15,
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.3px",
            }}
          >
            PM STREAK
          </div>
          <div style={{ color: "#6b7280", fontSize: 15 }}>{label}</div>
        </div>
        <div>
          <div
            style={{
              color: "white",
              fontSize: title.length > 55 ? 40 : title.length > 40 ? 48 : 56,
              fontWeight: 900,
              lineHeight: 1.2,
              marginBottom: 20,
              letterSpacing: "-1px",
            }}
          >
            {title.length > 80 ? title.slice(0, 80) + "…" : title}
          </div>
          <div style={{ color: "#9ca3af", fontSize: 20 }}>learnanything.pro</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
