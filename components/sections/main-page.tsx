"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const IMG_PROFILE =
  "https://www.figma.com/api/mcp/asset/78ab0dff-90d5-475e-a4ca-8395dc701556";
const IMG_ELLIPSE1 =
  "https://www.figma.com/api/mcp/asset/4e323506-7af9-402f-a3b9-dd58a4bf7d52";
const IMG_ELLIPSE2 =
  "https://www.figma.com/api/mcp/asset/f06c32b4-7212-47ad-971f-8e12322f4de6";
const IMG_LINE6 =
  "https://www.figma.com/api/mcp/asset/e77cba9f-fee2-4608-90cb-10a20ee37ab7";
const IMG_FRAME =
  "https://www.figma.com/api/mcp/asset/b9778947-4061-4404-b65f-3600247853bb";

const WORKS = [
  {
    id: "01",
    client: "Dong Fong",
    title: "Systemizing Growth through Design",
    year: "2024",
  },
  {
    id: "02",
    client: "Dong Fong",
    title: "Systemizing Growth through Design",
    year: "2024",
  },
  {
    id: "03",
    client: "Creative Studio",
    title: "E-commerce UX Overhaul",
    year: "2023",
  },
  {
    id: "04",
    client: "TechStart",
    title: "SaaS Product UI from Scratch",
    year: "2023",
  },
  {
    id: "05",
    client: "NovaPay",
    title: "Payment Flow Simplification",
    year: "2022",
  },
];

const DW = 1920;
const DH = 6300;
// canvas-Y where works section sticks flush below the nav
const LOCK_CANVAS_Y = 2003.53; // works divider (2078.53) – nav height (75)
const LOCK2_CANVAS_Y = 3900;   // canvas Y to pin for testimonials
const PER_CARD_SCROLL = 320;   // screen-px per testimonial card advance
const TESTIMONIALS_EXTRA = 4 * PER_CARD_SCROLL; // n cards → n steps so last card stays visible

const TESTIMONIALS_DATA = [
  {
    name: "Habibullah Nahid",
    role: "Founder and CEO",
    company: "CraftedAI",
    quote:
      "Nahid has both the vision and the talent of a topnotch UI/UX designer. I provided him with the objective of my project, and I was given a final product that far exceeded my expectations. He understands complex design principles and understands how to get from ideation to implementation fairly quickly. Book a gig with this Seller and you will be impressed as well.",
  },
  {
    name: "Pike Wrang",
    role: "Founder and CEO",
    company: "CraftedAI",
    quote:
      "Nahid has both the vision and the talent of a topnotch UI/UX designer. I provided him with the objective of my project, and I was given a final product that far exceeded my expectations. He understands complex design principles and understands how to get from ideation to implementation fairly quickly.",
  },
  {
    name: "Rose Jonson",
    role: "Product Manager",
    company: "DesignCo",
    quote:
      "Working with Nahid was a fantastic experience. His ability to transform complex ideas into beautiful, functional interfaces is truly remarkable. Every detail was crafted with purpose, and the final delivery was ahead of schedule.",
  },
  {
    name: "ADM Absc Louis",
    role: "CTO",
    company: "TechVentures",
    quote:
      "Nahid's technical depth combined with his design sensibility makes him uniquely effective. The product was pixel-perfect, intuitive, and built with real users in mind. I'd recommend him without hesitation.",
  },
];

export function MainPage() {
  const [scale, setScale] = useState(1);
  const scaleRef = useRef(1);
  const canvasRef = useRef<HTMLDivElement>(null);
  const marqWrapRef = useRef<HTMLDivElement>(null);
  const marqFirstRef = useRef<HTMLSpanElement>(null);
  const marqCw = useRef(0);
  const marqPos = useRef(0);
  const marqDir = useRef<1 | -1>(1);
  const marqSpd = useRef(2);
  const MBASE = 2;
  const worksRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ on: false, sx: 0, sl: 0 });
  const aboutBadgeRef = useRef<HTMLDivElement>(null);
  const aboutZoneRef = useRef<HTMLDivElement>(null);
  const aboutOverlayRef = useRef<HTMLDivElement>(null);
  const [aboutHovered, setAboutHovered] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);
  const [worksExtraScroll, setWorksExtraScroll] = useState(0);
  const worksExtraScrollRef = useRef(0);
  const [time, setTime] = useState("");
  const frameIconRef = useRef<HTMLDivElement>(null);

  // ── pulse glow on frame icon ─────────────────────────────────────────────
  useEffect(() => {
    const el = frameIconRef.current;
    if (!el) return;
    gsap.to(el, {
      opacity: 0.15,
      scale: 0.85,
      duration: 0.9,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    return () => { gsap.killTweensOf(el); };
  }, []);

  // ── viewport scale ──────────────────────────────────────────────────────────
  useEffect(() => {
    const update = () => {
      const s = window.innerWidth / DW;
      scaleRef.current = s;
      setScale(s);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ── sync canvas transform when scale changes ────────────────────────────────
  useEffect(() => {
    if (!canvasRef.current) return;
    const s = scale;
    const sy = window.scrollY;
    const maxH = worksExtraScrollRef.current;
    const lockAt = LOCK_CANVAS_Y * s;
    const worksEndAt = lockAt + maxH * s;
    const lock2At = worksEndAt + (LOCK2_CANVAS_Y - LOCK_CANVAS_Y) * s;
    const end2At = lock2At + TESTIMONIALS_EXTRA;
    let cy: number;
    if (sy <= lockAt) cy = -sy / s;
    else if (sy <= worksEndAt) cy = -LOCK_CANVAS_Y;
    else if (sy <= lock2At) cy = -(LOCK_CANVAS_Y + (sy - worksEndAt) / s);
    else if (sy <= end2At) cy = -LOCK2_CANVAS_Y;
    else cy = -(LOCK2_CANVAS_Y + (sy - end2At) / s);
    canvasRef.current.style.transform = `scale(${s}) translateY(${cy}px)`;
  }, [scale]);

  // ── clock ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    const t = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    t();
    const id = setInterval(t, 1000);
    return () => clearInterval(id);
  }, []);

  // ── GSAP marquee ────────────────────────────────────────────────────────────
  useEffect(() => {
    const wrap = marqWrapRef.current,
      first = marqFirstRef.current;
    if (!wrap || !first) return;
    const init = () => {
      const cw = first.offsetWidth;
      if (!cw) return;
      marqCw.current = cw;
      marqPos.current = 0;
      gsap.set(wrap, { x: 0 });
    };
    document.fonts.ready.then(init);
    requestAnimationFrame(init);
    const tick = () => {
      const cw = marqCw.current;
      if (!cw) return;
      marqPos.current +=
        marqDir.current === 1 ? -marqSpd.current : marqSpd.current;
      if (marqPos.current <= -cw) marqPos.current += cw;
      if (marqPos.current > 0) marqPos.current -= cw;
      gsap.set(wrap, { x: marqPos.current });
      marqSpd.current += (MBASE - marqSpd.current) * 0.05;
    };
    gsap.ticker.add(tick);
    gsap.ticker.fps(60);
    const onWheel = (e: WheelEvent) => {
      marqDir.current = e.deltaY > 0 ? 1 : -1;
      marqSpd.current = MBASE * 5;
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  // ── works drag ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = worksRef.current;
    if (!el) return;
    const dn = (e: MouseEvent) => {
      drag.current = { on: true, sx: e.pageX, sl: el.scrollLeft };
      el.style.cursor = "grabbing";
    };
    const mv = (e: MouseEvent) => {
      if (!drag.current.on) return;
      e.preventDefault();
      const deltaX = (e.pageX - drag.current.sx) * 1.5;
      const s = scaleRef.current;
      const lockAt = LOCK_CANVAS_Y * s;
      const maxH = worksExtraScrollRef.current;
      const newLeft = Math.max(0, Math.min(maxH, drag.current.sl - deltaX));
      window.scrollTo({ top: lockAt + newLeft * s, behavior: "instant" });
    };
    const up = () => {
      drag.current.on = false;
      el.style.cursor = "grab";
    };
    el.addEventListener("mousedown", dn);
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseup", up);
    return () => {
      el.removeEventListener("mousedown", dn);
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  // ── About badge follows cursor ────────────────────────────────────────────
  useEffect(() => {
    const zone = aboutZoneRef.current;
    const badge = aboutBadgeRef.current;
    const overlay = aboutOverlayRef.current;
    if (!zone || !badge || !overlay) return;

    const moveX = gsap.quickTo(badge, "x", {
      duration: 0.55,
      ease: "power3.out",
    });
    const moveY = gsap.quickTo(badge, "y", {
      duration: 0.55,
      ease: "power3.out",
    });
    // ensure scale origin is badge center
    gsap.set(badge, { transformOrigin: "center center" });

    let punchActive = false;
    const doPunch = (vel: number) => {
      if (punchActive) return;
      punchActive = true;
      const punch = Math.min(1.5, 1.15 + vel / 120);
      gsap.to(badge, {
        scale: punch,
        duration: 0.12,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(badge, {
            scale: 1,
            duration: 0.7,
            ease: "elastic.out(1, 0.35)",
            onComplete: () => {
              punchActive = false;
            },
          });
        },
      });
    };

    // Sync overlay clip-path via CSS custom properties (React won't reset them on re-render)
    const syncOverlay = () => {
      const bx = gsap.getProperty(badge, "x") as number;
      const by = gsap.getProperty(badge, "y") as number;
      overlay.style.setProperty("--bcx", `${374 + bx + 88}px`);
      overlay.style.setProperty("--bcy", `${1070.85 + 315 + by + 88}px`);
    };
    gsap.ticker.add(syncOverlay);
    // set initial values
    overlay.style.setProperty("--bcx", "462px");
    overlay.style.setProperty("--bcy", "1473.85px");

    let lastMX = 0,
      lastMY = 0;

    const onMove = (e: MouseEvent) => {
      const rect = zone.getBoundingClientRect();
      const s = scaleRef.current;
      const cx = (e.clientX - rect.left) / s;
      const cy = (e.clientY - rect.top) / s;
      moveX(cx - 374 - 88);
      moveY(cy - 315 - 88);

      // velocity → scale punch
      const vx = e.clientX - lastMX;
      const vy = e.clientY - lastMY;
      lastMX = e.clientX;
      lastMY = e.clientY;
      const vel = Math.sqrt(vx * vx + vy * vy);
      if (vel > 8) doPunch(vel);
    };

    const onEnter = () => setAboutHovered(true);
    const onLeave = () => {
      setAboutHovered(false);
      moveX(0);
      moveY(0);
      gsap.to(badge, { scale: 1, duration: 0.4, ease: "power3.out" });
    };

    zone.addEventListener("mousemove", onMove);
    zone.addEventListener("mouseenter", onEnter);
    zone.addEventListener("mouseleave", onLeave);
    return () => {
      gsap.ticker.remove(syncOverlay);
      zone.removeEventListener("mousemove", onMove);
      zone.removeEventListener("mouseenter", onEnter);
      zone.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  useEffect(() => {
    const el = worksRef.current;
    if (!el) return;
    const measure = () => {
      const max = Math.max(0, el.scrollWidth - el.clientWidth);
      worksExtraScrollRef.current = max;
      setWorksExtraScroll(max);
    };
    const t = setTimeout(measure, 300);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // ── Scroll-driven canvas translate + horizontal sync (GSAP smooth) ─────────
  useEffect(() => {
    const el = worksRef.current;
    if (!el) return;

    // quickTo smoothly drives scrollLeft without creating a new tween each frame
    const smoothH = gsap.quickTo(el, "scrollLeft", {
      duration: 0.6,
      ease: "power3.out",
    });

    const applyScroll = () => {
      const sy = window.scrollY;
      const s = scaleRef.current;
      const maxH = worksExtraScrollRef.current;
      const lockAt = LOCK_CANVAS_Y * s;
      const endAt = lockAt + maxH;

      // 1) canvas vertical offset (instant — drives page position)
      let cy: number;
      if (sy <= lockAt) {
        cy = -sy / s;
      } else if (sy <= endAt) {
        cy = -LOCK_CANVAS_Y;
      } else {
        const lock2At = endAt + (LOCK2_CANVAS_Y - LOCK_CANVAS_Y) * s;
        const end2At = lock2At + TESTIMONIALS_EXTRA;
        if (sy <= lock2At) {
          cy = -(LOCK_CANVAS_Y + (sy - endAt) / s);
        } else if (sy <= end2At) {
          cy = -LOCK2_CANVAS_Y;
        } else {
          cy = -(LOCK2_CANVAS_Y + (sy - end2At) / s);
        }
      }

      if (canvasRef.current) {
        canvasRef.current.style.transform = `scale(${s}) translateY(${cy}px)`;
      }

      // second lock: testimonials pin
      const lock2At = endAt + (LOCK2_CANVAS_Y - LOCK_CANVAS_Y) * s;
      const end2At = lock2At + TESTIMONIALS_EXTRA;
      if (sy >= lock2At && sy <= end2At) {
        const offset = sy - lock2At;
        const idx = Math.min(
          TESTIMONIALS_DATA.length - 1,
          Math.floor(offset / PER_CARD_SCROLL)
        );
        if (idx !== activeIdxRef.current) {
          activeIdxRef.current = idx;
          setActiveIdx(idx);
        }
      }

      // 2) smooth horizontal scroll via GSAP
      const targetLeft = sy <= lockAt ? 0 : Math.min(sy - lockAt, maxH);
      smoothH(targetLeft);
    };

    // run once on mount to position canvas correctly
    applyScroll();

    window.addEventListener("scroll", applyScroll, { passive: true });
    return () => window.removeEventListener("scroll", applyScroll);
  }, []);

  return (
    <>
      {/* Scroll spacer — total page height inc. works horizontal zone */}
      <div style={{ height: (DH + worksExtraScroll) * scale + TESTIMONIALS_EXTRA }} />
      {/* Fixed canvas viewport */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        {/* 1920-px Figma canvas – transform driven by scroll listener */}
        <div
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: DW,
            height: DH,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
            background: "white",
          }}
          className="dark:bg-[#0d0d0d]!"
        >
          {/* ═══ HERO HEADLINE ═══════════════════════════════════════════════════ */}
          <div style={{ position: "absolute", left: 316, top: 237 }}>
            <div
              style={{
                fontSize: 74,
                fontWeight: 500,
                lineHeight: "87px",
                letterSpacing: "-2.22px",
              }}
              className="text-black dark:text-white"
            >
              <p style={{ margin: 0 }}>Turning Bold</p>
              <p style={{ margin: 0 }}>Concepts into</p>
              <p style={{ margin: 0 }}>Digital Masterpieces.</p>
            </div>
          </div>

          {/* Profile image */}
          <div
            style={{
              position: "absolute",
              left: 1225,
              top: 274.88,
              width: 322.781,
              height: 322.781,
              borderRadius: 320,
              overflow: "hidden",
              zIndex: 2,
            }}
          >
            <Image
              src={IMG_PROFILE}
              alt="Habibullah Nahid"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Frame icon */}
          <div
            ref={frameIconRef}
            style={{
              position: "absolute",
              left: 1201,
              top: 222,
              width: 24,
              height: 24,
            }}
          >
            <Image src={IMG_FRAME} alt="" fill className="object-contain" />
          </div>

          {/* Green divider line */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 569.4,
              height: 1,
              background: "#01c45e",
              zIndex: 1,
            }}
          />

          {/* Start a Project */}
          <p
            style={{
              position: "absolute",
              left: 316.6,
              top: 580.27,
              fontSize: 18,
              margin: 0,
            }}
            className="text-black dark:text-white"
          >
            <span style={{ color: "#01c45e" }}>→</span>
            {"  Start a Project"}
          </p>

          {/* Go to Work */}
          <p
            style={{
              position: "absolute",
              left: 600.5,
              top: 580.27,
              fontSize: 18,
              margin: 0,
            }}
            className="text-black dark:text-white"
          >
            <span style={{ color: "#01c45e" }}>↓</span>
            {"  Go to Work"}
          </p>

          {/* Stats */}
          <div
            style={{
              position: "absolute",
              left: 876.27,
              top: 580.27,
              fontSize: 18,
              lineHeight: "29px",
            }}
            className="text-black dark:text-white"
          >
            <p style={{ margin: 0 }}>▪ 6 Years of Experiences</p>
            <p style={{ margin: 0 }}>▪ 30+ Clients</p>
            <p style={{ margin: 0 }}>▪ 50+ Projects</p>
          </div>

          {/* Freelance */}
          <div
            style={{
              position: "absolute",
              left: 1225,
              top: 598.27,
              fontSize: 24,
              lineHeight: "32px",
            }}
          >
            <p style={{ margin: 0, color: "#8b8b8b" }}>Freelance</p>
            <p style={{ margin: 0 }} className="text-black dark:text-white">
              {"Designer & Developer "}
            </p>
          </div>

          {/* LOCAL TIME */}
          <p
            style={{
              position: "absolute",
              left: 1616.35,
              top: 543.4,
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "25px",
              whiteSpace: "nowrap",
              margin: 0,
            }}
            className="text-black dark:text-white"
          >
            LOCAL TIME
          </p>
          <p
            style={{
              position: "absolute",
              left: 1616.35,
              top: 569.4,
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "25px",
              whiteSpace: "nowrap",
              margin: 0,
            }}
            className="text-black dark:text-white"
          >
            {time}
          </p>

          {/* Location */}
          <div
            style={{
              position: "absolute",
              left: 1719.58,
              top: 543.4,
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "25px",
              whiteSpace: "nowrap",
            }}
            className="text-black dark:text-white"
          >
            <p style={{ margin: 0 }}>DHAKA, BANGLADESH</p>
            <p style={{ margin: 0 }}>23.8041° N, 90.4152° E</p>
          </div>

          {/* ═══ MARQUEE ══════════════════════════════════════════════════════════ */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 823.53,
              width: "100%",
              height: 170,
              overflow: "hidden",
            }}
          >
            <div
              ref={marqWrapRef}
              style={{
                position: "absolute",
                display: "flex",
                whiteSpace: "nowrap",
                willChange: "transform",
              }}
            >
              <span
                ref={marqFirstRef}
                style={{
                  fontSize: 150,
                  fontWeight: 500,
                  lineHeight: "100px",
                  userSelect: "none",
                }}
                className="text-black dark:text-white"
              >
                {"Habibullah Nahid "}
                <span style={{ color: "#32ff32" }}>✺</span>{" "}
              </span>
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 150,
                    fontWeight: 500,
                    lineHeight: "100px",
                    userSelect: "none",
                  }}
                  className="text-black dark:text-white"
                >
                  {"Habibullah Nahid "}
                  <span style={{ color: "#32ff32" }}>✺</span>{" "}
                </span>
              ))}
            </div>
          </div>

          {/* ═══ ABOUT ════════════════════════════════════════════════════════════ */}
          <p
            style={{
              position: "absolute",
              left: 316,
              top: 1023.99,
              fontSize: 18,
              margin: 0,
            }}
            className="text-black/50 dark:text-white/50"
          >
            [ About Me → ]
          </p>

          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 1070.85,
              height: 1,
            }}
            className="bg-black/10 dark:bg-white/10"
          />

          {/* About interactive zone — full section width */}
          <div
            ref={aboutZoneRef}
            style={{
              position: "absolute",
              left: 0,
              top: 1070.85,
              width: DW,
              height: 677,
              cursor: "default",
              zIndex: 10,
            }}
          >
            {/* Badge (oval + label) — GSAP-driven, starts at Figma position */}
            <div
              ref={aboutBadgeRef}
              style={{
                position: "absolute",
                left: 374,
                top: 315 /* 1386.03 - 1070.85 */,
                width: 176,
                height: 176,
                pointerEvents: "none",
                willChange: "transform",
              }}
            >
              <Image
                src={IMG_ELLIPSE1}
                alt=""
                fill
                className="object-contain"
              />
              <p
                style={{
                  position: "absolute",
                  left: 43.63 /* 417.63 - 374 */,
                  top: 72.13 /* 1458.16 - 1386.03 */,
                  fontSize: 18,
                  fontWeight: 500,
                  lineHeight: "32px",
                  whiteSpace: "nowrap",
                  margin: 0,
                }}
                className="text-black dark:text-white"
              >
                ABOUT ME
              </p>
            </div>
          </div>

          {/* About heading */}
          <p
            style={{
              position: "absolute",
              left: 619.27,
              top: 1149.53,
              fontSize: 38,
              fontWeight: 500,
              lineHeight: "49px",
              width: 703,
              margin: 0,
              transition: "opacity 0.4s ease",
              opacity: aboutHovered ? 1 : 0.85,
            }}
            className="text-black dark:text-white"
          >
            I am a Human Interface Designer and Developer, driven by a passion
            for crafting pixel-perfect, minimal, and user-friendly interfaces.
          </p>

          {/* About body */}
          <p
            style={{
              position: "absolute",
              left: 619.27,
              top: 1375.16,
              fontSize: 18,
              lineHeight: "33px",
              width: 692.773,
              margin: 0,
              transition: "opacity 0.4s ease",
              opacity: aboutHovered ? 0.9 : 0.5,
            }}
            className="text-black dark:text-white"
          >
            {
              "My diverse journey began in Dhaka, where I mastered English, Bangla, and excelled in math and sciences. With a Post Grad in Electrical and Electronic Engineering, I transitioned to design in 2014. My unique blend of technical expertise and design skills enables me to create seamless digital experiences. I specialize in "
            }
            <strong
              style={{ fontWeight: 500 }}
              className="text-black dark:text-white"
            >
              human-centered design
            </strong>
            {", "}
            <strong
              style={{ fontWeight: 500 }}
              className="text-black dark:text-white"
            >
              UX problem solving
            </strong>
            {", and UI design, leveraging "}
            <strong
              style={{ fontWeight: 500 }}
              className="text-black dark:text-white"
            >
              front-end technologies
            </strong>
            {
              ". Collaborating with professionals, I’ve crafted impactful digital solutions."
            }
          </p>

          {/* White-text overlay - circle-clipped following badge */}
          <div
            ref={aboutOverlayRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: DW,
              height: DH,
              pointerEvents: "none",
              zIndex: 15,
              clipPath: "circle(88px at var(--bcx) var(--bcy))",
              opacity: aboutHovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <p
              style={{
                position: "absolute",
                left: 619.27,
                top: 1149.53,
                fontSize: 38,
                fontWeight: 500,
                lineHeight: "49px",
                width: 703,
                margin: 0,
                color: "white",
              }}
            >
              I am a Human Interface Designer and Developer, driven by a passion
              for crafting pixel-perfect, minimal, and user-friendly interfaces.
            </p>
            <p
              style={{
                position: "absolute",
                left: 619.27,
                top: 1375.16,
                fontSize: 18,
                lineHeight: "33px",
                width: 692.773,
                margin: 0,
                color: "white",
              }}
            >
              {
                "My diverse journey began in Dhaka, where I mastered English, Bangla, and excelled in math and sciences. With a Post Grad in Electrical and Electronic Engineering, I transitioned to design in 2014. My unique blend of technical expertise and design skills enables me to create seamless digital experiences. I specialize in "
              }
              <strong style={{ fontWeight: 500, color: "white" }}>
                human-centered design
              </strong>
              {", "}
              <strong style={{ fontWeight: 500, color: "white" }}>
                UX problem solving
              </strong>
              {", and UI design, leveraging "}
              <strong style={{ fontWeight: 500, color: "white" }}>
                front-end technologies
              </strong>
              {
                ". Collaborating with professionals, I’ve crafted impactful digital solutions."
              }
            </p>
          </div>

          {/* ═══ SELECTED WORKS ═══════════════════════════════════════════════════ */}
          <p
            style={{
              position: "absolute",
              left: 310,
              top: 1748.5,
              letterSpacing: "-3.36px",
              lineHeight: "112px",
              whiteSpace: "nowrap",
              margin: 0,
              fontWeight: 500,
            }}
            className="text-black dark:text-white"
          >
            <span style={{ fontSize: 112 }}>Selected Works</span>
            <span style={{ fontSize: 36, color: "rgba(0,0,0,0.5)" }}>
              {" (5)"}
            </span>
          </p>

          {/* Philosophy */}
          <div
            style={{
              position: "absolute",
              left: 316.44,
              top: 1888.93,
              fontSize: 36,
              lineHeight: "49px",
              whiteSpace: "nowrap",
            }}
            className="text-black/40 dark:text-white/40"
          >
            <p style={{ margin: 0 }}>Embracing iteration over perfection.</p>
            <p style={{ margin: 0 }}>Agility over process.</p>
            <p style={{ margin: 0 }}>People over users.</p>
          </div>

          {/* Works divider */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 2078.53,
              height: 1,
            }}
            className="bg-black/10 dark:bg-white/10"
          />

          {/* Works horizontal scroll */}
          <div
            ref={worksRef}
            style={{
              position: "absolute",
              left: 0,
              top: 2123,
              right: 0,
              overflowX: "auto",
              overflowY: "hidden",
            }}
            className="scrollbar-hide cursor-grab"
          >
            <div
              style={{
                display: "flex",
                gap: 64,
                alignItems: "flex-end",
                width: "max-content",
                paddingLeft: 95.73,
                paddingRight: 95.73,
              }}
            >
              {WORKS.map((work, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-end",
                    flexShrink: 0,
                  }}
                >
                  {/* Main card */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 19,
                      width: 1052.731,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 9,
                        width: 609,
                      }}
                      className="text-black dark:text-white"
                    >
                      <p
                        style={{
                          fontWeight: 600,
                          fontSize: 18,
                          lineHeight: "18px",
                          margin: 0,
                        }}
                      >
                        {work.client}
                      </p>
                      <p
                        style={{ fontSize: 36, lineHeight: "49px", margin: 0 }}
                      >
                        {work.title}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 15,
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                    >
                      <p
                        style={{
                          fontWeight: 500,
                          fontSize: 150,
                          lineHeight: "128px",
                          letterSpacing: "-4.5px",
                          flexShrink: 0,
                          margin: 0,
                        }}
                        className="text-black/8 dark:text-white/8"
                      >
                        {work.id}.
                      </p>
                      <div
                        style={{
                          borderRadius: 16,
                          flex: 1,
                          overflow: "hidden",
                          height: 670,
                        }}
                      >
                        <div
                          style={{
                            background: "#d9d9d9",
                            height: "100%",
                            width: "100%",
                            borderRadius: 16,
                            transition:
                              "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
                          }}
                          className="dark:bg-white/10 hover:scale-[1.03]"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Side card */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 18,
                      width: 450.971,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: 18,
                        width: "100%",
                      }}
                      className="text-black dark:text-white"
                    >
                      <p style={{ margin: 0 }}>{work.year}</p>
                      <a
                        href="#"
                        style={{ textDecoration: "underline" }}
                        className="hover:text-[#01c45e] transition-colors"
                      >
                        View Project
                      </a>
                    </div>
                    <div
                      style={{
                        borderRadius: 16,
                        width: 440.971,
                        overflow: "hidden",
                        height: 670,
                      }}
                    >
                      <div
                        style={{
                          background: "#d9d9d9",
                          height: "100%",
                          width: "100%",
                          borderRadius: 16,
                          transition:
                            "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
                        }}
                        className="dark:bg-white/10 hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ TESTIMONIALS ════════════════════════════════════════════════════ */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 2980,
              height: 1144.604,
              background: "#000",
            }}
          />

          {/* Marquee row 1 */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 2980,
              overflow: "hidden",
              height: 160,
              background: "#000",
            }}
          >
            <div
              className="animate-marquee-slow"
              style={{ display: "flex", whiteSpace: "nowrap" }}
            >
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 115,
                    fontWeight: 500,
                    letterSpacing: "-3.45px",
                    color: "white",
                    flexShrink: 0,
                    paddingRight: 60,
                  }}
                >
                  {"Your product can look something like this too "}
                </span>
              ))}
            </div>
          </div>

          {/* Marquee row 2 (reversed / offset) */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 3110.56,
              overflow: "hidden",
              height: 160,
              background: "#000",
            }}
          >
            <div
              className="animate-marquee-slow-rev"
              style={{ display: "flex", whiteSpace: "nowrap" }}
            >
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 115,
                    fontWeight: 500,
                    letterSpacing: "-3.45px",
                    color: "white",
                    flexShrink: 0,
                    paddingRight: 60,
                  }}
                >
                  {"Your product can look something like this too "}
                </span>
              ))}
            </div>
          </div>

          {/* Gray showcase box */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: 3282.84,
              width: 1287.06,
              height: 761.905,
              background: "#d9d9d9",
              borderRadius: 16,
            }}
          />

          {/* ── Testimonials accordion ────────────────────────────────── */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: 4192.74,
              width: 1037.718,
              background: "#000",
              borderRadius: 16,
              padding: "49px 63px 48px",
              boxSizing: "border-box",
            }}
          >
            {TESTIMONIALS_DATA.map((t, i) => {
              const isActive = activeIdx === i;
              return (
                <div key={t.name}>
                  {/* Divider between items */}
                  {i > 0 && (
                    <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.15)" }} />
                  )}

                  {/* Name row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "20px 0",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 40,
                        fontWeight: 400,
                        color: isActive ? "white" : "rgba(255,255,255,0.35)",
                        lineHeight: "normal",
                        margin: 0,
                        transition: "color 0.4s ease",
                      }}
                    >
                      {t.name}
                    </p>
                    <p
                      style={{
                        fontSize: 18,
                        lineHeight: "normal",
                        whiteSpace: "nowrap",
                        margin: 0,
                        opacity: isActive ? 1 : 0.35,
                        transition: "opacity 0.4s ease",
                      }}
                    >
                      <span style={{ color: "rgba(255,255,255,0.5)" }}>
                        {t.role},{" "}
                      </span>
                      <span style={{ color: "white" }}>
                        {t.company}
                      </span>
                    </p>
                  </div>

                  {/* Expandable card */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateRows: isActive ? "1fr" : "0fr",
                      opacity: isActive ? 1 : 0,
                      transition:
                        "grid-template-rows 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease",
                    }}
                  >
                    <div style={{ overflow: "hidden" }}>
                      <div
                        style={{
                          background: "rgba(217,217,217,0.2)",
                          borderRadius: 16,
                          padding: "30px 32px",
                          marginBottom: 20,
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 28,
                        }}
                      >
                        {/* Avatar */}
                        <div
                          style={{
                            width: 90,
                            height: 90,
                            borderRadius: "50%",
                            overflow: "hidden",
                            position: "relative",
                            flexShrink: 0,
                            marginTop: 4,
                          }}
                        >
                          <Image
                            src={IMG_ELLIPSE2}
                            alt={t.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Quote mark LEFT of text */}
                        <p
                          style={{
                            fontSize: 134,
                            fontFamily: "Arial, sans-serif",
                            color: "#32ff32",
                            lineHeight: "80px",
                            margin: 0,
                            flexShrink: 0,
                          }}
                        >
                          &ldquo;
                        </p>

                        {/* Quote text */}
                        <p
                          style={{
                            fontSize: 22,
                            fontWeight: 500,
                            lineHeight: "33px",
                            color: "rgba(255,255,255,0.65)",
                            margin: 0,
                            paddingTop: 24,
                          }}
                        >
                          {t.quote}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>



          {/* ═══ CONTACT ══════════════════════════════════════════════════════════ */}
          {/* Eggshell bg */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: 5091.24,
              width: 1760.163,
              height: 1190.017,
              background: "#eef1ea",
              borderRadius: "16px 16px 0 0",
            }}
            className="dark:bg-neutral-900!"
          />

          {/* Got a Project / Let's Jam */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-663.18px)",
              top: 5233.14,
              letterSpacing: "-2.7px",
              fontWeight: 500,
            }}
            className="text-black dark:text-white"
          >
            <p style={{ margin: 0, fontSize: 90, lineHeight: "90px" }}>
              <span style={{ color: "rgba(0,0,0,0.2)" }}>
                Got a Project?
              </span>{" "}
            </p>
            <p style={{ margin: 0, fontSize: 90, lineHeight: "90px" }}>
              {"Let’s Jam"}
            </p>
          </div>

          {/* Email */}
          <a
            href="mailto:hi@nahid.design"
            style={{
              position: "absolute",
              left: 296.82,
              top: 5478.56,
              fontSize: 173,
              fontWeight: 500,
              lineHeight: "128px",
              letterSpacing: "-5.19px",
              whiteSpace: "nowrap",
              textDecoration: "none",
            }}
            className="text-black dark:text-white hover:text-[#01c45e] transition-colors"
          >
            hi@nahid.design
          </a>

          {/* Availability */}
          <div
            style={{
              position: "absolute",
              left: 296.68,
              top: 5679.96,
              width: 885.131,
              height: 34.151,
              display: "flex",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: 24,
                lineHeight: "normal",
                whiteSpace: "nowrap",
                margin: 0,
              }}
              className="text-black/20 dark:text-white/20"
            >
              <span style={{ color: "#32ff32" }}>✺</span>
              {
                " I am available for freelance projects / contractual or full-time job opportunity"
              }
            </p>
          </div>

          {/* ═══ FOOTER ═══════════════════════════════════════════════════════════ */}
          <p
            style={{
              position: "absolute",
              left: 314.21,
              top: 6163.97,
              fontSize: 16,
              fontWeight: 500,
              lineHeight: "normal",
              whiteSpace: "nowrap",
              margin: 0,
            }}
            className="text-black/40 dark:text-white/40"
          >
            ©2023 Portfolio by Habibullah Nahid
          </p>
        </div>
      </div>
    </>
  );
}
