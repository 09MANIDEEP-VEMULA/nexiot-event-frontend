import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const CountdownTimer = ({ targetDate = "2024-12-31T00:00:00" }) => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;

      if (diff > 0) {
        setTime({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) return null;

  const boxStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "90px",
    height: "90px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(0,255,255,0.25)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 0 20px rgba(0,255,255,0.08)",
    color: "#00e5ff",
    fontFamily: "monospace",
  };

  const labelStyle = {
    fontSize: "11px",
    marginTop: "8px",
    color: "#aaa",
    letterSpacing: "2px",
    textTransform: "uppercase",
  };

  const numberStyle = {
    fontSize: "26px",
    fontWeight: "bold",
  };

  const colonStyle = {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#00e5ff",
    margin: "0 8px",
    animation: "pulse 1s infinite",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "10px",
        padding: "20px 0",
      }}
    >
      {/* DAYS */}
      <div style={boxStyle}>
        <div style={numberStyle}>{String(time.days).padStart(2, "0")}</div>
        <div style={labelStyle}>Days</div>
      </div>

      <div style={colonStyle}>:</div>

      {/* HOURS */}
      <div style={boxStyle}>
        <div style={numberStyle}>{String(time.hours).padStart(2, "0")}</div>
        <div style={labelStyle}>Hours</div>
      </div>

      <div style={colonStyle}>:</div>

      {/* MINUTES */}
      <div style={boxStyle}>
        <div style={numberStyle}>
          {String(time.minutes).padStart(2, "0")}
        </div>
        <div style={labelStyle}>Minutes</div>
      </div>

      <div style={colonStyle}>:</div>

      {/* SECONDS */}
      <div style={boxStyle}>
        <div style={numberStyle}>
          {String(time.seconds).padStart(2, "0")}
        </div>
        <div style={labelStyle}>Seconds</div>
      </div>
    </div>
  );
};

export default CountdownTimer;