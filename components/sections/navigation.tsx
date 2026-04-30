"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const TRANSITION = "450ms cubic-bezier(0.4, 0, 0.2, 1)";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Outer fixed track — spans full viewport, centers child */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
          paddingTop: scrolled ? 14 : 0,
          paddingLeft: scrolled ? 20 : 0,
          paddingRight: scrolled ? 20 : 0,
          pointerEvents: "none",
          transition: `padding ${TRANSITION}`,
        }}
      >
        {/* The box that shrinks */}
        <div
          style={{
            width: "100%",
            maxWidth: scrolled ? 656 : 1920,
            height: scrolled ? 52 : 75,
            background: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: scrolled ? 9999 : 0,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: scrolled ? "rgba(0,0,0,0.10)" : "transparent",
            boxShadow: scrolled
              ? "0 4px 24px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05)"
              : "none",
            position: "relative",
            overflow: "hidden",
            pointerEvents: "auto",
            transition: [
              `max-width ${TRANSITION}`,
              `height ${TRANSITION}`,
              `border-radius ${TRANSITION}`,
              `border-color ${TRANSITION}`,
              `box-shadow ${TRANSITION}`,
            ].join(", "),
          }}
        >
          {/* ── FULL-WIDTH LAYOUT (not scrolled) ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 316px",
              opacity: scrolled ? 0 : 1,
              transform: scrolled ? "scale(0.96)" : "scale(1)",
              transition: "opacity 200ms ease, transform 200ms ease",
              pointerEvents: scrolled ? "none" : "auto",
            }}
          >
            <Link
              href="/"
              style={{ fontSize: 18, fontWeight: 500, color: "#000", textDecoration: "none", whiteSpace: "nowrap" }}
            >
              <span style={{ textTransform: "uppercase" }}>H. Nahid</span>™
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
              <span style={{ fontSize: 18, fontWeight: 500, color: "#000", whiteSpace: "nowrap" }}>
                <span style={{ color: "#32ff32" }}>✺</span>{" "}Available for work
              </span>
              <Link href="#work"    style={{ fontSize: 18, fontWeight: 500, color: "rgba(0,0,0,0.4)", textDecoration: "none", whiteSpace: "nowrap" }} className="hover:!text-black transition-colors">Cases</Link>
              <Link href="#about"   style={{ fontSize: 18, fontWeight: 500, color: "#000", textDecoration: "none", whiteSpace: "nowrap" }} className="hover:opacity-70 transition-opacity">About</Link>
              <Link href="#contact" style={{ fontSize: 18, fontWeight: 500, color: "#000", textDecoration: "none", whiteSpace: "nowrap" }} className="hover:opacity-70 transition-opacity">Contact</Link>
            </div>
          </div>

          {/* ── PILL LAYOUT (scrolled) ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 22px",
              opacity: scrolled ? 1 : 0,
              transform: scrolled ? "scale(1)" : "scale(1.04)",
              transition: "opacity 220ms ease 180ms, transform 220ms ease 180ms",
              pointerEvents: scrolled ? "auto" : "none",
            }}
          >
            <Link
              href="/"
              style={{ fontSize: 15, fontWeight: 500, color: "#000", textDecoration: "none", whiteSpace: "nowrap" }}
            >
              <span style={{ textTransform: "uppercase" }}>H. Nahid</span>™
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: "#000", whiteSpace: "nowrap" }}>
                <span style={{ color: "#32ff32" }}>✺</span>{" "}Available for work
              </span>
              <Link href="#work"    style={{ fontSize: 14, fontWeight: 500, color: "rgba(0,0,0,0.4)", textDecoration: "none", whiteSpace: "nowrap" }} className="hover:!text-black transition-colors">Cases</Link>
              <Link href="#about"   style={{ fontSize: 14, fontWeight: 500, color: "#000", textDecoration: "none", whiteSpace: "nowrap" }} className="hover:opacity-70 transition-opacity">About</Link>
              <Link href="#contact" style={{ fontSize: 14, fontWeight: 500, color: "#000", textDecoration: "none", whiteSpace: "nowrap" }} className="hover:opacity-70 transition-opacity">Contact</Link>
            </div>
          </div>
        </div>
      </div>
      {/* Blur overlay under nav box */}
      <div
        style={{
          position: "fixed",
          top: scrolled ? 14 : 0,
          left: 0,
          right: 0,
          height: scrolled ? 52 : 75,
          zIndex: 49,
          pointerEvents: "none",
          background: "transparent",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: scrolled ? 656 : 1920,
            margin: "0 auto",
            height: "100%",
            borderRadius: scrolled ? 9999 : 0,
            boxShadow: scrolled ? "0 8px 32px 0 rgba(31, 38, 135, 0.12)" : "none",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            opacity: 0.7,
            transition: [
              `max-width ${TRANSITION}`,
              `border-radius ${TRANSITION}`,
              `height ${TRANSITION}`,
            ].join(", ")
          }}
        />
      </div>
    </>
  );
}
