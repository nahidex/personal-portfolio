"use client";

import Link from "next/link";

const projects = [
  {
    id: "01",
    title: "Dong Fong",
    subtitle: "Systemizing Growth through Design",
    year: "2024",
    thumbnail: "#d9d9d9",
  },
  {
    id: "02",
    title: "Dong Fong",
    subtitle: "Systemizing Growth through Design",
    year: "2024",
    thumbnail: "#d9d9d9",
  },
];

export function SelectedWorks() {
  return (
    <section id="work" className="bg-white py-24">
      <div className="container mx-auto px-8">
        {/* Section Title */}
        <div className="mb-20">
          <h2 className="text-[clamp(64px,8vw,112px)] font-medium tracking-[-0.03em] leading-[1]">
            <span>Selected Works</span>
            <span className="text-black/20"> </span>
            <span className="text-[clamp(28px,2.5vw,36px)] text-black/50">
              (5)
            </span>
          </h2>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-black/10 mb-16" />

        {/* Projects Grid */}
        <div className="flex overflow-x-auto gap-1 pb-8 scrollbar-hide">
          {projects.map((project, index) => (
            <div key={index} className="flex gap-4 items-end flex-shrink-0">
              {/* Main Project Card */}
              <div className="w-[1052px] flex flex-col gap-5">
                {/* Project Info */}
                <div className="w-[609px] space-y-2">
                  <p className="text-lg font-semibold">{project.title}</p>
                  <p className="text-4xl leading-[1.36]">{project.subtitle}</p>
                </div>

                {/* Project Image with Number */}
                <div className="flex gap-4 items-start w-full">
                  <p className="text-[150px] font-medium tracking-[-0.03em] leading-[0.85] text-black/8">
                    {project.id}.
                  </p>
                  <div
                    className="w-[832px] h-[670px] rounded-2xl"
                    style={{ backgroundColor: project.thumbnail }}
                  />
                </div>
              </div>

              {/* Side Image */}
              <div className="w-[451px] flex flex-col gap-5">
                {/* Year and Link */}
                <div className="flex items-center justify-between text-lg w-full">
                  <p>{project.year}</p>
                  <Link
                    href={`/projects/${project.id}`}
                    className="underline hover:text-primary transition-colors"
                  >
                    View Project
                  </Link>
                </div>

                {/* Side Image */}
                <div
                  className="w-[441px] h-[670px] rounded-2xl"
                  style={{ backgroundColor: project.thumbnail }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
