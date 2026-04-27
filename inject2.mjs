import { readFileSync, writeFileSync } from "fs";

const file =
  "C:/laragon/www/portfolio-future/components/sections/main-page.tsx";
let c = readFileSync(file, "utf8");

// Unique anchor right after the about body </p> and before Selected Works
const SELECTED_WORKS_CHAR = "\u2550"; // ═
const anchor =
  "</p>\n\n          {/* " +
  SELECTED_WORKS_CHAR +
  SELECTED_WORKS_CHAR +
  SELECTED_WORKS_CHAR +
  " SELECTED WORKS";
const pos = c.indexOf(anchor);
if (pos === -1) {
  // Try alternate
  const alt = "</p>\n\n          {/*";
  const occurrences = [];
  let i = 0;
  while ((i = c.indexOf(alt, i)) !== -1) {
    occurrences.push(i);
    i++;
  }
  console.log(
    "Occurrences of alt anchor:",
    occurrences.length,
    "at positions:",
    occurrences,
  );
  // Find the one near SELECTED WORKS
  for (const o of occurrences) {
    console.log("At", o, ":", JSON.stringify(c.slice(o, o + 60)));
  }
  process.exit(1);
}

const insertAfterBody = pos + 4; // right after </p>

const overlayDiv = `

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
              {
                "My diverse journey began in Dhaka, where I mastered English, Bangla, and excelled in math and sciences. With a Post Grad in Electrical and Electronic Engineering, I transitioned to design in 2014. My unique blend of technical expertise and design skills enables me to create seamless digital experiences. I specialize in "
              }
              <strong style={{ fontWeight: 500, color: "white" }}>human-centered design</strong>
              {", "}
              <strong style={{ fontWeight: 500, color: "white" }}>UX problem solving</strong>
              {", and UI design, leveraging "}
              <strong style={{ fontWeight: 500, color: "white" }}>front-end technologies</strong>
              {
                ". Collaborating with professionals, I\u2019ve crafted impactful digital solutions."
              }
            </p>
          </div>`;

c = c.slice(0, insertAfterBody) + overlayDiv + c.slice(insertAfterBody);
writeFileSync(file, c, "utf8");
console.log("Overlay injected at position", insertAfterBody);
