import React, { useEffect, useMemo, useState } from "react";

export default function CounterThemes() {
  const [dark, setDark] = useState(false);
  const [count, setCount] = useState(0);
  // Jami bosishlar sonini saqlash uchun yangi state
  const [totalClicks, setTotalClicks] = useState(0);

  const theme = useMemo(() => {
    if (dark) {
      return {
        bg: "#0B0F19",
        panel: "#121A2B",
        text: "#E6EAF2",
        muted: "#A8B0C2",
        button: "#2B6CB0",
        buttonText: "#FFFFFF",
        border: "rgba(255,255,255,0.10)",
      };
    }
    return {
      bg: "#F6F7FB",
      panel: "#FFFFFF",
      text: "#111827",
      muted: "#4B5563",
      button: "#2563EB",
      buttonText: "#FFFFFF",
      border: "rgba(0,0,0,0.08)",
    };
  }, [dark]);

  useEffect(() => {
    document.body.style.background = theme.bg;
    document.body.style.color = theme.text;
    document.body.style.transition = "background 200ms ease, color 200ms ease";
    return () => {
      document.body.style.background = "";
      document.body.style.color = "";
    };
  }, [theme.bg, theme.text]);

  const redStyle = {
    color: "#EF4444",
    fontWeight: 800,
    marginTop: 10,
    fontSize: 14,
  };

  // +1 bosilganda
  const handleIncrement = () => {
    setCount((c) => c + 1);
    setTotalClicks((t) => t + 1); // Jami bosishlar ko'payadi
  };

  // -1 bosilganda
  const handleDecrement = () => {
    setCount((c) => c - 1); // Asosiy qiymat kamayadi
    setTotalClicks((t) => t + 1); // Pastdagi bosimlar soni esa baribir KO'PAYADI
  };

  // Reset bosilganda
  const handleReset = () => {
    setCount(0);
    setTotalClicks(0);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          width: 420,
          background: theme.panel,
          border: `1px solid ${theme.border}`,
          borderRadius: 16,
          padding: 20,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "space-between", gap: 12 }}
        >
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Counter</div>
            <div style={{ marginTop: 6, color: theme.muted }}>
              Dark mode: <b>{dark ? "ON" : "OFF"}</b>
            </div>
          </div>

          <button
            onClick={() => setDark((v) => !v)}
            style={{
              background: "transparent",
              color: theme.text,
              border: `1px solid ${theme.border}`,
              borderRadius: 12,
              padding: "10px 12px",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            {dark ? "light 💡" : "dark mode 🌙"}
          </button>
        </div>

        {/* BOSHQARUVLAR */}
        <div
          style={{
            marginTop: 18,
            borderRadius: 14,
            border: `1px solid ${theme.border}`,
            padding: 16,
          }}
        >
          <div style={{ color: theme.muted, fontWeight: 700, marginBottom: 8 }}>
            Bosimlar
          </div>

          {/* ASOSIY SANAGICH */}
          <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: 1 }}>
            {count}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button
              onClick={handleIncrement}
              style={{
                flex: 1,
                background: theme.button,
                color: theme.buttonText,
                border: "none",
                borderRadius: 12,
                padding: "12px 14px",
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              +1
            </button>

            <button
              onClick={handleDecrement}
              style={{
                flex: 1,
                background: "transparent",
                color: theme.text,
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                padding: "12px 14px",
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              -1
            </button>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <button
              onClick={handleReset}
              style={{
                width: "100%",
                background: "transparent",
                color: theme.text,
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                padding: "12px 14px",
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              Reset
            </button>
          </div>

          {/* LIMIT / MANFIY */}
          {count > 10 && <div style={redStyle}>Limit</div>}
          {count < 0 && <div style={redStyle}>manfiy</div>}
        </div>

        {/* PASTDA SANALADIGAN QISIM */}
        <div
          style={{
            marginTop: 16,
            borderRadius: 14,
            border: `1px solid ${theme.border}`,
            padding: 14,
          }}
        >
          <div style={{ color: theme.muted, fontWeight: 800, marginBottom: 8 }}>
            Bosimlar pastda sanaladi
          </div>

          <div style={{ fontSize: 14, lineHeight: 1.6, color: theme.text }}>
            <div>
              Hozirgi bosim: <b>{totalClicks}</b>{" "}
              {/* Faqat ko'payadigan jami bosishlar */}
            </div>

            <div>
              Status:{" "}
              {count > 10 ? (
                <span style={{ color: "#EF4444", fontWeight: 900 }}>limit</span>
              ) : count < 0 ? (
                <span style={{ color: "#EF4444", fontWeight: 900 }}>
                  manfiy
                </span>
              ) : (
                <span style={{ color: theme.muted, fontWeight: 800 }}>
                  normal
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
