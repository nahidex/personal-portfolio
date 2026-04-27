"use client";

import Image from "next/image";

const testimonials = [
  {
    name: "Habibullah Nahid",
    role: "Founder and CEO",
    company: "CraftedAI",
    quote:
      "Nahid has both the vision and the talent of a topnotch UI/UX designer. I provided him with the objective of my project, and I was given a final product that far exceeded my expectations. He understands complex design principles and understands how to get from ideation to implementation fairly quickly. Book a gig with this Seller and you will be impressed as well.",
    avatar:
      "https://www.figma.com/api/mcp/asset/2cfd30a3-1cf0-47a1-9b0d-c8793807e2e1",
  },
  {
    name: "Pike Wrang",
    role: "Founder and CEO",
    company: "CraftedAI",
    avatar:
      "https://www.figma.com/api/mcp/asset/2cfd30a3-1cf0-47a1-9b0d-c8793807e2e1",
  },
  {
    name: "Rose Jonson",
    role: "Founder and CEO",
    company: "CraftedAI",
    avatar:
      "https://www.figma.com/api/mcp/asset/2cfd30a3-1cf0-47a1-9b0d-c8793807e2e1",
  },
  {
    name: "ADM Absc Louis",
    role: "Founder and CEO",
    company: "CraftedAI",
    avatar:
      "https://www.figma.com/api/mcp/asset/2cfd30a3-1cf0-47a1-9b0d-c8793807e2e1",
  },
];

export function Testimonials() {
  return (
    <section className="bg-black py-32 overflow-hidden">
      {/* Scrolling Banner */}
      <div className="mb-32 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee-slow">
          <p className="text-[clamp(60px,8vw,115px)] font-medium text-white tracking-[-0.03em] leading-[1]">
            <span>Your product can look something like this too </span>
            <span className="text-accent">→</span>
            <span> Your product can look something like this too </span>
            <span className="text-accent">→</span>
            <span> Your product can look something like this too </span>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-8">
        {/* Showcase Image */}
        <div className="bg-gray-medium rounded-2xl h-[762px] mb-32 flex items-center justify-center">
          <p className="text-black/20 text-2xl">Design Showcase</p>
        </div>

        {/* Testimonials Container */}
        <div className="max-w-4xl mx-auto bg-black rounded-2xl p-12 space-y-8">
          {/* Featured Testimonial */}
          <div className="bg-white/5 rounded-2xl p-12 relative">
            <div className="flex items-start gap-8">
              <div className="relative w-[90px] h-[90px] rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={testimonials[0].avatar}
                  alt={testimonials[0].name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="mb-6">
                  <h4 className="text-4xl text-white mb-2">
                    {testimonials[0].name}
                  </h4>
                  <p className="text-lg text-white/50">
                    {testimonials[0].role}
                    <span>, </span>
                    <span className="text-white">
                      {testimonials[0].company}
                    </span>
                  </p>
                </div>

                <p className="text-[22px] leading-[1.5] text-white/65">
                  {testimonials[0].quote}
                </p>

                <div className="absolute top-8 right-12">
                  <p className="text-[134px] font-['Arial'] text-accent leading-none">
                    &quot;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Other Testimonials */}
          {testimonials.slice(1).map((testimonial, index) => (
            <div key={index}>
              <div className="h-[1px] bg-white/10" />
              <div className="py-8 flex items-center justify-between">
                <p className="text-4xl text-white">{testimonial.name}</p>
                <p className="text-lg text-white/50 text-right">
                  {testimonial.role}
                  <span>, </span>
                  <span className="text-white">{testimonial.company}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
