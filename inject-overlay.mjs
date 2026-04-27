import { readFileSync, writeFileSync } from "fs";

const file = "components/sections/main-page.tsx";
let c = readFileSync(file, "utf8");

const marker =
  `            {\n              ". Collaborating with professionals, I\u2019ve crafted impactful digital solutions."\n            }\n          </p>`.replace(
    /\\n/g,
    "\n",
  );

const overlay = `            {
              ". Collaborating with professionals, I've crafted impactful digital solutions."
            }
          </p>

          {/* White-text overlay - clipped circle following badge */}
          <div
            ref={aboutOverlayRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: DW,
              height: DH,
              pointerEvents: "none",
              zIndex: 5,
              clipPath: "circle(88px at 462px 1473.85px)",
              opacity: 0,
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
              {"My diverse journey began in Dhaka, where I mastered English, Bangla, and excelled in math and sciences. With a Post Grad in Electrical and Electronic Engineering, I transitioned to design in 2014. My unique blend of technical expertise and design skills enables me to create seamless digital experiences. I specialize in "}
              <strong style={{ fontWeight: 500, color: "white" }}>human-centered design</strong>
              {", "}
              <strong style={{ fontWeight: 500, color: "white" }}>UX problem solving</strong>
              {", and UI design, leveraging "}
              <strong style={{ fontWeight: 500, color: "white" }}>front-end technologies</strong>
              {". Collaborating with professionals, I\u2019ve crafted impactful digital solutions."}
            </p>
          </div>`;

if (!c.includes(marker)) {
  console.error("MARKER NOT FOUND");
  process.exit(1);
}

c = c.replace(marker, overlay);
writeFileSync(file, c, "utf8");
console.log("Overlay div injected successfully");
