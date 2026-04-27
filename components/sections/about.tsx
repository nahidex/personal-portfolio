import Image from "next/image";

export function About() {
  const ellipseImage =
    "https://www.figma.com/api/mcp/asset/f93168d6-1711-49c1-9946-5122ea54c14c";

  return (
    <section id="about" className="bg-white py-24">
      <div className="container mx-auto px-8">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-lg text-black/50">
            <span>[ About Me </span>
            <span>→ ]</span>
          </p>
          <div className="w-full h-px bg-black/10 mt-8" />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-[200px_1fr] gap-12 items-start">
          {/* About Me Circle */}
          <div className="relative w-44 h-44 mx-auto lg:mx-0">
            <Image
              src={ellipseImage}
              alt="About Me"
              fill
              className="object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-lg font-medium text-center">ABOUT ME</p>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-8 max-w-3xl">
            <h2 className="text-[clamp(32px,4vw,38px)] font-medium leading-[1.29]">
              I am a Human Interface Designer and Developer, driven by a passion
              for crafting pixel-perfect, minimal, and user-friendly interfaces.
            </h2>

            <div className="text-lg text-black/70 leading-[1.83] space-y-4">
              <p>
                My diverse journey began in Dhaka, where I mastered English,
                Bangla, and excelled in math and sciences. With a Post Grad in
                Electrical and Electronic Engineering, I transitioned to design
                in 2014. My unique blend of technical expertise and design
                skills enables me to create seamless digital experiences. I
                specialize in{" "}
                <span className="font-medium text-black">
                  human-centered design
                </span>
                ,{" "}
                <span className="font-medium text-black">
                  UX problem solving
                </span>
                , and UI design, leveraging{" "}
                <span className="font-medium text-black">
                  front-end technologies
                </span>
                . Collaborating with professionals, I&apos;ve crafted impactful
                digital solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <div className="mt-32 space-y-4 text-[clamp(28px,3vw,36px)] text-black/40 leading-[1.36]">
          <p>Embracing iteration over perfection.</p>
          <p>Agility over process.</p>
          <p>People over users.</p>
        </div>
      </div>
    </section>
  );
}
