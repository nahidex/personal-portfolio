import { writeFileSync } from "fs";

const code = `"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const IMG_PROFILE  = "https://www.figma.com/api/mcp/asset/78ab0dff-90d5-475e-a4ca-8395dc701556";
const IMG_ELLIPSE1 = "https://www.figma.com/api/mcp/asset/4e323506-7af9-402f-a3b9-dd58a4bf7d52";
const IMG_ELLIPSE2 = "https://www.figma.com/api/mcp/asset/f06c32b4-7212-47ad-971f-8e12322f4de6";
const IMG_LINE6    = "https://www.figma.com/api/mcp/asset/e77cba9f-fee2-4608-90cb-10a20ee37ab7";
const IMG_FRAME    = "https://www.figma.com/api/mcp/asset/b9778947-4061-4404-b65f-3600247853bb";

const WORKS = [
  { id: "01", client: "Dong Fong",       title: "Systemizing Growth through Design", year: "2024" },
  { id: "02", client: "Dong Fong",       title: "Systemizing Growth through Design", year: "2024" },
  { id: "03", client: "Creative Studio", title: "E-commerce UX Overhaul",            year: "2023" },
  { id: "04", client: "TechStart",       title: "SaaS Product UI from Scratch",      year: "2023" },
  { id: "05", client: "NovaPay",         title: "Payment Flow Simplification",       year: "2022" },
];

const DW = 1920;
const DH = 6300;

export function MainPage() {
  const [scale, setScale] = useState(1);
  const marqWrapRef  = useRef<HTMLDivElement>(null);
  const marqFirstRef = useRef<HTMLSpanElement>(null);
  const marqCw  = useRef(0);
  const marqPos = useRef(0);
  const marqDir = useRef<1 | -1>(1);
  const marqSpd = useRef(2);
  const MBASE   = 2;
  const worksRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ on: false, sx: 0, sl: 0 });
  const [time, setTime] = useState("");

  // ── viewport scale ──────────────────────────────────────────────────────────
  useEffect(() => {
    const update = () => setScale(window.innerWidth / DW);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ── clock ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    const t = () => setTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }));
    t(); const id = setInterval(t, 1000); return () => clearInterval(id);
  }, []);

  // ── GSAP marquee ────────────────────────────────────────────────────────────
  useEffect(() => {
    const wrap = marqWrapRef.current, first = marqFirstRef.current;
    if (!wrap || !first) return;
    const init = () => {
      const cw = first.offsetWidth;
      if (!cw) return;
      marqCw.current = cw; marqPos.current = 0;
      gsap.set(wrap, { x: 0 });
    };
    document.fonts.ready.then(init); requestAnimationFrame(init);
    const tick = () => {
      const cw = marqCw.current; if (!cw) return;
      marqPos.current += marqDir.current === 1 ? -marqSpd.current : marqSpd.current;
      if (marqPos.current <= -cw) marqPos.current += cw;
      if (marqPos.current > 0)   marqPos.current -= cw;
      gsap.set(wrap, { x: marqPos.current });
      marqSpd.current += (MBASE - marqSpd.current) * 0.05;
    };
    gsap.ticker.add(tick); gsap.ticker.fps(60);
    const onWheel = (e: WheelEvent) => {
      marqDir.current = e.deltaY > 0 ? 1 : -1;
      marqSpd.current = MBASE * 5;
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => { gsap.ticker.remove(tick); window.removeEventListener("wheel", onWheel); };
  }, []);

  // ── works drag ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = worksRef.current; if (!el) return;
    const dn = (e: MouseEvent) => { drag.current = { on: true, sx: e.pageX, sl: el.scrollLeft }; el.style.cursor = "grabbing"; };
    const mv = (e: MouseEvent) => {
      if (!drag.current.on) return;
      e.preventDefault();
      el.scrollLeft = drag.current.sl - (e.pageX - drag.current.sx) * 1.5;
    };
    const up = () => { drag.current.on = false; el.style.cursor = "grab"; };
    el.addEventListener("mousedown", dn);
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseup", up);
    return () => {
      el.removeEventListener("mousedown", dn);
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  const sc = (v: string | number) => v; // pass-through for clarity

  return (
    <div style={{ height: DH * scale, overflow: "hidden", position: "relative" }}>
      {/* 1920-px Figma canvas scaled to viewport */}
      <div
        style={{
          position: "absolute", top: 0, left: 0,
          width: DW, height: DH,
          transformOrigin: "top left",
          transform: \`scale(\${scale})\`,
          background: "white",
        }}
        className="dark:!bg-[#0d0d0d]"
      >

        {/* ═══ HERO HEADLINE ═══════════════════════════════════════════════════ */}
        <div style={{ position: "absolute", left: 316, top: 237 }}>
          <div
            style={{ fontSize: 74, fontWeight: 500, lineHeight: "87px", letterSpacing: "-2.22px" }}
            className="text-black dark:text-white"
          >
            <p style={{ margin: 0 }}>Turning Bold</p>
            <p style={{ margin: 0 }}>Concepts into</p>
            <p style={{ margin: 0 }}>Digital Masterpieces.</p>
          </div>
        </div>

        {/* Profile image */}
        <div style={{ position: "absolute", left: 1225, top: 274.88, width: 322.781, height: 322.781, borderRadius: 320, overflow: "hidden" }}>
          <Image src={IMG_PROFILE} alt="Habibullah Nahid" fill className="object-cover" priority />
        </div>

        {/* Frame icon */}
        <div style={{ position: "absolute", left: 1201, top: 222, width: 24, height: 24 }}>
          <Image src={IMG_FRAME} alt="" fill className="object-contain" />
        </div>

        {/* Green divider line */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 569.4, height: 1, background: "#01c45e" }} />

        {/* Start a Project */}
        <p
          style={{ position: "absolute", left: 316.6, top: 580.27, fontSize: 18, margin: 0 }}
          className="text-black dark:text-white"
        >
          <span style={{ color: "#01c45e" }}>→</span>{"  Start a Project"}
        </p>

        {/* Go to Work */}
        <p
          style={{ position: "absolute", left: 600.5, top: 580.27, fontSize: 18, margin: 0 }}
          className="text-black dark:text-white"
        >
          <span style={{ color: "#01c45e" }}>↓</span>{"  Go to Work"}
        </p>

        {/* Stats */}
        <div
          style={{ position: "absolute", left: 876.27, top: 580.27, fontSize: 18, lineHeight: "29px" }}
          className="text-black dark:text-white"
        >
          <p style={{ margin: 0 }}>▪ 6 Years of Experiences</p>
          <p style={{ margin: 0 }}>▪ 30+ Clients</p>
          <p style={{ margin: 0 }}>▪ 50+ Projects</p>
        </div>

        {/* Freelance */}
        <div style={{ position: "absolute", left: 1225, top: 598.27, fontSize: 24, lineHeight: "32px" }}>
          <p style={{ margin: 0, color: "#8b8b8b" }}>Freelance</p>
          <p style={{ margin: 0 }} className="text-black dark:text-white">{"Designer & Developer "}</p>
        </div>

        {/* LOCAL TIME */}
        <p
          style={{ position: "absolute", left: 1616.35, top: 543.4, fontSize: 14, fontWeight: 500, lineHeight: "25px", whiteSpace: "nowrap", margin: 0 }}
          className="text-black dark:text-white"
        >LOCAL TIME</p>
        <p
          style={{ position: "absolute", left: 1616.35, top: 569.4, fontSize: 14, fontWeight: 500, lineHeight: "25px", whiteSpace: "nowrap", margin: 0 }}
          className="text-black dark:text-white"
        >{time}</p>

        {/* Location */}
        <div
          style={{ position: "absolute", left: 1719.58, top: 543.4, fontSize: 14, fontWeight: 500, lineHeight: "25px", whiteSpace: "nowrap" }}
          className="text-black dark:text-white"
        >
          <p style={{ margin: 0 }}>DHAKA, BANGLADESH</p>
          <p style={{ margin: 0 }}>23.8041° N, 90.4152° E</p>
        </div>

        {/* ═══ MARQUEE ══════════════════════════════════════════════════════════ */}
        <div style={{ position: "absolute", left: 0, top: 823.53, width: "100%", height: 170, overflow: "hidden" }}>
          <div
            ref={marqWrapRef}
            style={{ position: "absolute", display: "flex", whiteSpace: "nowrap", willChange: "transform" }}
          >
            <span
              ref={marqFirstRef}
              style={{ fontSize: 150, fontWeight: 500, lineHeight: "100px", userSelect: "none" }}
              className="text-black dark:text-white"
            >
              {"Habibullah Nahid "}
              <span style={{ color: "#32ff32" }}>✺</span>
              {" "}
            </span>
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                style={{ fontSize: 150, fontWeight: 500, lineHeight: "100px", userSelect: "none" }}
                className="text-black dark:text-white"
              >
                {"Habibullah Nahid "}
                <span style={{ color: "#32ff32" }}>✺</span>
                {" "}
              </span>
            ))}
          </div>
        </div>

        {/* ═══ ABOUT ════════════════════════════════════════════════════════════ */}
        <p
          style={{ position: "absolute", left: 316, top: 1023.99, fontSize: 18, margin: 0 }}
          className="text-black/50 dark:text-white/50"
        >[ About Me → ]</p>

        <div style={{ position: "absolute", left: 0, right: 0, top: 1070.85, height: 1 }} className="bg-black/10 dark:bg-white/10" />

        {/* About circle */}
        <div style={{ position: "absolute", left: 374, top: 1386.03, width: 176, height: 176 }}>
          <Image src={IMG_ELLIPSE1} alt="" fill className="object-contain" />
        </div>
        <p
          style={{ position: "absolute", left: 417.63, top: 1458.16, fontSize: 18, fontWeight: 500, lineHeight: "32px", whiteSpace: "nowrap", margin: 0 }}
          className="text-black dark:text-white"
        >ABOUT ME</p>

        {/* About heading */}
        <p
          style={{ position: "absolute", left: 619.27, top: 1149.53, fontSize: 38, fontWeight: 500, lineHeight: "49px", width: 703, margin: 0 }}
          className="text-black dark:text-white"
        >
          I am a Human Interface Designer and Developer, driven by a passion for crafting
          pixel-perfect, minimal, and user-friendly interfaces.
        </p>

        {/* About body */}
        <p
          style={{ position: "absolute", left: 619.27, top: 1375.16, fontSize: 18, lineHeight: "33px", width: 692.773, margin: 0 }}
          className="text-black/70 dark:text-white/70"
        >
          {"My diverse journey began in Dhaka, where I mastered English, Bangla, and excelled in math and sciences. With a Post Grad in Electrical and Electronic Engineering, I transitioned to design in 2014. My unique blend of technical expertise and design skills enables me to create seamless digital experiences. I specialize in "}
          <strong style={{ fontWeight: 500 }} className="text-black dark:text-white">human-centered design</strong>
          {", "}
          <strong style={{ fontWeight: 500 }} className="text-black dark:text-white">UX problem solving</strong>
          {", and UI design, leveraging "}
          <strong style={{ fontWeight: 500 }} className="text-black dark:text-white">front-end technologies</strong>
          {". Collaborating with professionals, I\u2019ve crafted impactful digital solutions."}
        </p>

        {/* ═══ SELECTED WORKS ═══════════════════════════════════════════════════ */}
        <p
          style={{ position: "absolute", left: 310, top: 1748.5, letterSpacing: "-3.36px", lineHeight: "112px", whiteSpace: "nowrap", margin: 0, fontWeight: 500 }}
          className="text-black dark:text-white"
        >
          <span style={{ fontSize: 112 }}>Selected Works</span>
          <span style={{ fontSize: 36, color: "rgba(0,0,0,0.5)" }}>{" (5)"}</span>
        </p>

        {/* Philosophy */}
        <div
          style={{ position: "absolute", left: 316.44, top: 1888.93, fontSize: 36, lineHeight: "49px", whiteSpace: "nowrap" }}
          className="text-black/40 dark:text-white/40"
        >
          <p style={{ margin: 0 }}>Embracing iteration over perfection.</p>
          <p style={{ margin: 0 }}>Agility over process.</p>
          <p style={{ margin: 0 }}>People over users.</p>
        </div>

        {/* Works divider */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 2078.53, height: 1 }} className="bg-black/10 dark:bg-white/10" />

        {/* Works horizontal scroll */}
        <div
          ref={worksRef}
          style={{ position: "absolute", left: 95.73, top: 2123, right: 0, overflowX: "auto", overflowY: "hidden" }}
          className="scrollbar-hide cursor-grab"
        >
          <div style={{ display: "flex", gap: 3, alignItems: "flex-end", width: "max-content" }}>
            {WORKS.map((work, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-end", flexShrink: 0 }}>
                {/* Main card */}
                <div style={{ display: "flex", flexDirection: "column", gap: 19, width: 1052.731 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 9, width: 609 }} className="text-black dark:text-white">
                    <p style={{ fontWeight: 600, fontSize: 18, lineHeight: "18px", margin: 0 }}>{work.client}</p>
                    <p style={{ fontSize: 36, lineHeight: "49px", margin: 0 }}>{work.title}</p>
                  </div>
                  <div style={{ display: "flex", gap: 15, alignItems: "flex-start", width: "100%" }}>
                    <p
                      style={{ fontWeight: 500, fontSize: 150, lineHeight: "128px", letterSpacing: "-4.5px", flexShrink: 0, margin: 0 }}
                      className="text-black/[0.08] dark:text-white/[0.08]"
                    >{work.id}.</p>
                    <div style={{ background: "#d9d9d9", height: 670, borderRadius: 16, flex: 1 }} className="dark:bg-white/10" />
                  </div>
                </div>
                {/* Side card */}
                <div style={{ display: "flex", flexDirection: "column", gap: 18, width: 450.971 }}>
                  <div
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 18, width: "100%" }}
                    className="text-black dark:text-white"
                  >
                    <p style={{ margin: 0 }}>{work.year}</p>
                    <a href="#" style={{ textDecoration: "underline" }} className="hover:text-[#01c45e] transition-colors">View Project</a>
                  </div>
                  <div style={{ background: "#d9d9d9", height: 670, width: 440.971, borderRadius: 16 }} className="dark:bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ TESTIMONIALS ════════════════════════════════════════════════════ */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 2980, height: 1144.604, background: "#000" }} />

        {/* Marquee row 1 */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 2980, overflow: "hidden", height: 160 }}>
          <div className="animate-marquee-slow" style={{ display: "flex", whiteSpace: "nowrap" }}>
            {[...Array(4)].map((_, i) => (
              <span key={i} style={{ fontSize: 115, fontWeight: 500, letterSpacing: "-3.45px", color: "white", flexShrink: 0, paddingRight: 60 }}>
                {"Your product can look something like this too "}
                <span style={{ color: "#32ff32", fontWeight: 400 }}>→</span>
              </span>
            ))}
          </div>
        </div>

        {/* Marquee row 2 (reversed / offset) */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 3110.56, overflow: "hidden", height: 160 }}>
          <div className="animate-marquee-slow-rev" style={{ display: "flex", whiteSpace: "nowrap" }}>
            {[...Array(4)].map((_, i) => (
              <span key={i} style={{ fontSize: 115, fontWeight: 500, letterSpacing: "-3.45px", color: "white", flexShrink: 0, paddingRight: 60 }}>
                {"Your product can look something like this too "}
                <span style={{ color: "#32ff32", fontWeight: 400 }}>→</span>
              </span>
            ))}
          </div>
        </div>

        {/* Gray showcase box */}
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 3282.84, width: 1287.06, height: 761.905, background: "#d9d9d9", borderRadius: 16 }} />

        {/* Testimonial card (black rounded) */}
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 4192.74, width: 1037.718, height: 754.908, background: "#000", borderRadius: 16 }} />

        {/* Feature box */}
        <div style={{ position: "absolute", left: 504, top: 4308.9, width: 912, height: 324.54, background: "rgba(217,217,217,0.2)", borderRadius: 16 }} />

        {/* Avatar */}
        <div style={{ position: "absolute", left: 544, top: 4346, width: 90.489, height: 90.489 }}>
          <Image src={IMG_ELLIPSE2} alt="Avatar" fill className="object-cover rounded-full" />
        </div>

        {/* Quote mark */}
        <p style={{ position: "absolute", left: 728.74, top: 4334.28, fontSize: 134, fontFamily: "Arial, sans-serif", color: "#32ff32", margin: 0, whiteSpace: "nowrap", lineHeight: "normal" }}>
          &ldquo;
        </p>

        {/* Author name */}
        <p style={{ position: "absolute", left: 504, top: 4242.11, fontSize: 40, lineHeight: "normal", color: "white", whiteSpace: "nowrap", margin: 0 }}>Habibullah Nahid</p>

        {/* Author role */}
        <p style={{ position: "absolute", left: 1305.5, top: 4255.11, fontSize: 18, lineHeight: "normal", color: "white", whiteSpace: "nowrap", margin: 0, transform: "translateX(-50%)", textAlign: "center" }}>
          <span style={{ color: "rgba(255,255,255,0.5)" }}>Founder and CEO, </span>CraftedAI
        </p>

        {/* Quote text */}
        <p style={{ position: "absolute", left: 786.75, top: 4354, fontSize: 22, fontWeight: 500, lineHeight: "33px", width: 579.93, color: "rgba(255,255,255,0.65)", margin: 0 }}>
          Nahid has both the vision and the talent of a topnotch UI/UX designer. I provided him
          with the objective of my project, and I was given a final product that far exceeded my
          expectations. He understands complex design principles and understands how to get from
          ideation to implementation fairly quickly. Book a gig with this Seller and you will be
          impressed as well.
        </p>

        {/* Pike Wrang */}
        <div style={{ position: "absolute", left: 504, top: 4671.91, width: 912, height: 1 }}>
          <Image src={IMG_LINE6} alt="" fill className="object-contain" />
        </div>
        <div style={{ position: "absolute", left: 504, top: 4687.71, width: 912, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: 40, color: "white", lineHeight: "normal", margin: 0 }}>Pike Wrang</p>
          <p style={{ fontSize: 18, lineHeight: "normal", whiteSpace: "nowrap", margin: 0 }}>
            <span style={{ color: "rgba(255,255,255,0.5)" }}>Founder and CEO, </span>
            <span style={{ color: "white" }}>CraftedAI</span>
          </p>
        </div>

        {/* Rose Jonson */}
        <div style={{ position: "absolute", left: 504, top: 4753.91, width: 912, height: 1 }}>
          <Image src={IMG_LINE6} alt="" fill className="object-contain" />
        </div>
        <div style={{ position: "absolute", left: 504, top: 4767.5, width: 912, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: 40, color: "white", lineHeight: "normal", margin: 0 }}>Rose Jonson</p>
          <p style={{ fontSize: 18, lineHeight: "normal", whiteSpace: "nowrap", margin: 0 }}>
            <span style={{ color: "rgba(255,255,255,0.5)" }}>Founder and CEO, </span>
            <span style={{ color: "white" }}>CraftedAI</span>
          </p>
        </div>

        {/* ADM Absc Louis */}
        <div style={{ position: "absolute", left: 504, top: 4835.91, width: 912, height: 1 }}>
          <Image src={IMG_LINE6} alt="" fill className="object-contain" />
        </div>
        <div style={{ position: "absolute", left: 504, top: 4847.29, width: 912, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: 40, color: "white", lineHeight: "normal", margin: 0 }}>ADM Absc Louis</p>
          <p style={{ fontSize: 18, lineHeight: "normal", whiteSpace: "nowrap", margin: 0 }}>
            <span style={{ color: "rgba(255,255,255,0.5)" }}>Founder and CEO, </span>
            <span style={{ color: "white" }}>CraftedAI</span>
          </p>
        </div>

        {/* ═══ CONTACT ══════════════════════════════════════════════════════════ */}
        {/* Eggshell bg */}
        <div
          style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 5091.24, width: 1760.163, height: 1190.017, background: "#eef1ea", borderRadius: "16px 16px 0 0" }}
          className="dark:!bg-neutral-900"
        />

        {/* Got a Project / Let's Jam */}
        <div
          style={{ position: "absolute", left: "50%", transform: "translateX(-663.18px)", top: 5233.14, letterSpacing: "-2.7px", fontWeight: 500 }}
          className="text-black dark:text-white"
        >
          <p style={{ margin: 0, fontSize: 90, lineHeight: "90px" }}>
            <span style={{ color: "rgba(0,0,0,0.2)" }}>Got a Project?</span>{" "}
          </p>
          <p style={{ margin: 0, fontSize: 90, lineHeight: "90px" }}>{"Let\u2019s Jam"}</p>
        </div>

        {/* Email */}
        <a
          href="mailto:hi@nahid.design"
          style={{ position: "absolute", left: 296.82, top: 5478.56, fontSize: 173, fontWeight: 500, lineHeight: "128px", letterSpacing: "-5.19px", whiteSpace: "nowrap", textDecoration: "none" }}
          className="text-black dark:text-white hover:text-[#01c45e] transition-colors"
        >
          hi@nahid.design
        </a>

        {/* Availability */}
        <div style={{ position: "absolute", left: 296.68, top: 5679.96, width: 885.131, height: 34.151, display: "flex", alignItems: "center" }}>
          <p style={{ fontSize: 24, lineHeight: "normal", whiteSpace: "nowrap", margin: 0 }} className="text-black/20 dark:text-white/20">
            <span style={{ color: "#32ff32" }}>✺</span>
            {" I am available for freelance projects / contractual or full-time job opportunity"}
          </p>
        </div>

        {/* ═══ FOOTER ═══════════════════════════════════════════════════════════ */}
        <p
          style={{ position: "absolute", left: 314.21, top: 6163.97, fontSize: 16, fontWeight: 500, lineHeight: "normal", whiteSpace: "nowrap", margin: 0 }}
          className="text-black/40 dark:text-white/40"
        >
          ©2023 Portfolio by Habibullah Nahid
        </p>

      </div>
    </div>
  );
}
`;

writeFileSync("./components/sections/main-page.tsx", code, "utf8");
console.log("Done! Lines written:", code.split("\n").length);
