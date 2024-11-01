"use client";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";

import { HeroSection } from "@/components/landing";
import { useRef } from "react";

export default function HomePage() {
  const containerRef = useRef(null);

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
      }}
      watch={[]}
      containerRef={containerRef}>
      <div data-scroll-container ref={containerRef}>
        <HeroSection />
      </div>
    </LocomotiveScrollProvider>
  );
}
