"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    quote:
      "An incredibly talented designer who delivered beyond expectations. The attention to detail and creative approach to problem-solving made the entire process seamless. Would highly recommend to anyone looking for top-quality design work.",
    avatar:
      "https://www.figma.com/api/mcp/asset/2cfd30a3-1cf0-47a1-9b0d-c8793807e2e1",
  },
  {
    name: "Rose Jonson",
    role: "Founder and CEO",
    company: "CraftedAI",
    quote:
      "Outstanding work from start to finish. The designs were not only visually stunning but also extremely user-friendly. The collaboration was smooth, communication was clear, and the results speak for themselves.",
    avatar:
      "https://www.figma.com/api/mcp/asset/2cfd30a3-1cf0-47a1-9b0d-c8793807e2e1",
  },
  {
    name: "ADM Absc Louis",
    role: "Founder and CEO",
    company: "CraftedAI",
    quote:
      "Truly a world-class designer. The creative vision and technical skill brought our product to life in ways we had only imagined. The final result exceeded our expectations in every way.",
    avatar:
      "https://www.figma.com/api/mcp/asset/2cfd30a3-1cf0-47a1-9b0d-c8793807e2e1",
  },
];

export function Testimonials() {
  const pinnedRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length || !pinnedRef.current) return;

    const total = testimonials.length;

    // Hide all cards, then show the first one
    gsap.set(cards, { opacity: 0, y: 60 });
    gsap.set(cards[0], { opacity: 1, y: 0 });

    function showCard(next: number, prev: number) {
      if (next === prev) return;
      activeIndexRef.current = next;

      gsap.to(cards[prev], {
        opacity: 0,
        y: prev < next ? -60 : 60,
        duration: 0.35,
        ease: "power2.in",
      });
      gsap.fromTo(
        cards[next],
        { opacity: 0, y: prev < next ? 60 : -60 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", delay: 0.1 }
      );
    }

    const trigger = ScrollTrigger.create({
      trigger: pinnedRef.current,
      start: "top top",
      end: `+=${(total - 1) * 100}vh`,
      pin: true,
      snap: {
        snapTo: 1 / (total - 1),
        duration: { min: 0.2, max: 0.4 },
        ease: "power1.inOut",
      },
      onUpdate: (self) => {
        const next = Math.min(
          Math.round(self.progress * (total - 1)),
          total - 1
        );
        showCard(next, activeIndexRef.current);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section className="bg-black">
      {/* Scrolling Banner */}
      <div className="py-32 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee-slow">
          <p className="text-[clamp(60px,8vw,115px)] font-medium text-white tracking-[-0.03em] leading-[1]">
            <span>Your product can look something like this too &nbsp;&nbsp;</span>
            <span>Your product can look something like this too &nbsp;&nbsp;</span>
            <span>Your product can look something like this too &nbsp;&nbsp;</span>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-8">
        {/* Showcase Image */}
        <div className="bg-gray-medium rounded-2xl h-[762px] mb-32 flex items-center justify-center">
          <p className="text-black/20 text-2xl">Design Showcase</p>
        </div>
      </div>

      {/* Pinned Testimonials — scroll-stepped */}
      <div ref={pinnedRef} className="h-screen bg-black flex items-center">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative" style={{ height: 520 }}>
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="absolute inset-0"
                >
                  <div className="bg-white/5 rounded-2xl p-12 h-full relative overflow-hidden">
                    <div className="flex items-start gap-8">
                      <div className="relative w-[90px] h-[90px] rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="mb-6">
                          <h4 className="text-4xl text-white mb-2">
                            {testimonial.name}
                          </h4>
                          <p className="text-lg text-white/50">
                            {testimonial.role}
                            <span>, </span>
                            <span className="text-white">
                              {testimonial.company}
                            </span>
                          </p>
                        </div>

                        <p className="text-[22px] leading-[1.5] text-white/65">
                          {testimonial.quote}
                        </p>
                      </div>
                    </div>

                    <div className="absolute top-8 right-12">
                      <p className="text-[134px] font-['Arial'] text-accent leading-none">
                        &quot;
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
