"use client";

import Image from "next/image";
import Link from "next/link";

const imgImage1 =
  "https://www.figma.com/api/mcp/asset/76c1a183-3a80-4505-b1c1-e4134ae12954";
const imgLine1 =
  "https://www.figma.com/api/mcp/asset/aaf1a498-d6b3-4bf4-a80f-7391de7f7022";

export function Hero() {
  return (
    <section className="relative bg-white w-full min-h-screen pt-[75px]">
      <div className="relative w-full max-w-[1920px] mx-auto h-[1000px]">
        {/* Main Headline */}
        <div className="absolute left-[316px] top-[237px] w-[1288px]">
          <h1 className="font-medium text-[74px] leading-[87px] tracking-[-2.22px] text-black whitespace-nowrap">
            <p className="mb-0">Turning Bold</p>
            <p className="mb-0">Concepts into</p>
            <p>Digital Masterpieces.</p>
          </h1>
        </div>

        {/* Profile Image */}
        <div className="absolute left-[1225px] top-[274.88px] w-[322.781px] h-[322.781px] rounded-[320px] overflow-hidden">
          <Image
            src={imgImage1}
            alt="Habibullah Nahid"
            fill
            sizes="323px"
            className="object-cover"
            priority
          />
        </div>

        {/* Horizontal Line */}
        <div className="absolute left-[-49.03px] top-[569.4px] w-[1993.279px] h-0">
          <div className="absolute inset-[-1px_0_0_0]">
            <Image
              src={imgLine1}
              alt=""
              fill
              sizes="2000px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Start a Project Link */}
        <Link
          href="#contact"
          className="absolute left-[316.6px] top-[580.27px] text-lg font-normal whitespace-pre"
        >
          <span className="text-[#01c45e]">→</span>
          <span> Start a Project</span>
        </Link>

        {/* Go to Work Link */}
        <Link
          href="#work"
          className="absolute left-[600.5px] top-[580.27px] text-lg font-normal whitespace-pre"
        >
          <span className="text-[#01c45e]">↓</span>
          <span> Go to Work</span>
        </Link>

        {/* Stats */}
        <div className="absolute left-[876.27px] top-[580.27px] text-lg font-normal whitespace-nowrap">
          <p className="leading-[29px] mb-0">▪ 6 Years of Experiences</p>
          <p className="leading-[29px] mb-0">▪ 30+ Clients</p>
          <p className="leading-[29px]">▪ 50+ Projects</p>
        </div>

        {/* Freelance Designer & Developer */}
        <div className="absolute left-[1225px] top-[598.27px] text-2xl font-normal whitespace-nowrap">
          <p className="leading-8 mb-0 text-[#8b8b8b]">Freelance</p>
          <p className="leading-8">Designer & Developer</p>
        </div>

        {/* Local Time */}
        <p className="absolute left-[1616.35px] top-[543.4px] text-sm font-medium leading-[25px] whitespace-nowrap">
          LOCAL TIME
        </p>
        <p className="absolute left-[1616.35px] top-[569.4px] text-sm font-medium leading-[25px] whitespace-nowrap">
          {new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>

        {/* Location */}
        <div className="absolute left-[1719.58px] top-[543.4px] text-sm font-medium whitespace-nowrap">
          <p className="leading-[25px] mb-0">DHAKA, BANGLADESH</p>
          <p className="leading-[25px]">23.8041° N, 90.4152° E</p>
        </div>
      </div>

      {/* Scrolling Name Banner */}
      <div className="relative w-full overflow-hidden">
        <p className="absolute left-[-152.01px] top-[823.53px] font-medium text-[150px] leading-[100px] text-black whitespace-nowrap animate-marquee">
          <span>Habibullah Nahid </span>
          <span className="text-[#32ff32]">✺</span>
          <span> Habibullah Nahid </span>
          <span className="text-[#32ff32]">✺</span>
          <span> Habibullah Nahid</span>
        </p>
      </div>
    </section>
  );
}
