"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const DW = 1920;

export function Navigation() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => setScale(Math.min(1, window.innerWidth / DW));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <nav
      style={{
        height: 75 * scale,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
      className="bg-white/80 dark:bg-[#0d0d0d]/80 backdrop-blur-xl"
    >
      {/* Inner 1920px container scaled to viewport */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: DW,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        }}
      >
        {/* Logo — left: 316px, top: 24.25px */}
        <p
          style={{
            position: "absolute",
            left: 316,
            top: 24.25,
            fontSize: 18,
            margin: 0,
            whiteSpace: "nowrap",
          }}
          className="text-black dark:text-white"
        >
          <span style={{ fontWeight: 500 }} className="uppercase">
            H. Nahid
          </span>
          <span style={{ fontWeight: 500 }}>™</span>
        </p>

        {/* Available badge — left: 1129.5px, top: 27px */}
        <p
          style={{
            position: "absolute",
            left: 1129.5,
            top: 27,
            fontSize: 18,
            margin: 0,
            whiteSpace: "nowrap",
          }}
          className="text-black dark:text-white"
        >
          <span style={{ fontWeight: 500, color: "#32ff32" }}>✺</span>
          <span style={{ fontWeight: 500, color: "#01c45e" }}> </span>
          <span style={{ fontWeight: 500 }}>Available for work</span>
        </p>

        {/* Cases — left: 1365px */}
        <Link
          href="#work"
          style={{
            position: "absolute",
            left: 1365,
            top: 27,
            fontSize: 18,
            fontWeight: 500,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
          className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
        >
          Cases
        </Link>

        {/* About — left: 1453px */}
        <Link
          href="#about"
          style={{
            position: "absolute",
            left: 1453,
            top: 27,
            fontSize: 18,
            fontWeight: 500,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
          className="text-black dark:text-white hover:text-black/70 dark:hover:text-white/70 transition-colors"
        >
          About
        </Link>

        {/* Contact — left: 1541px */}
        <Link
          href="#contact"
          style={{
            position: "absolute",
            left: 1541,
            top: 27,
            fontSize: 18,
            fontWeight: 500,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
          className="text-black dark:text-white hover:text-black/70 dark:hover:text-white/70 transition-colors"
        >
          Contact
        </Link>

        {/* Dark mode toggle — positioned after Contact */}
        {mounted && (
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle dark mode"
            style={{
              position: "absolute",
              left: 1680,
              top: 23,
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              cursor: "pointer",
              background: "transparent",
            }}
            className="border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            {isDark ? (
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black dark:text-white"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </nav>
  );
}
