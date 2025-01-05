"use client";
import { HeroFigure, HeroFigureDark } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative -z-10" data-scroll data-scroll-speed="-9">
      <div className="-mt-16">
        <div
          className="wrapper relative h-screen flex items-center"
          data-scroll
          data-scroll-speed="1">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 max-w-xl tracking-tight leading-tight md:leading-[3.5rem]">
              Tryout Online Mudah&nbsp;dan&nbsp;Efektif bersama Kalkulus
            </h1>
            <p className="text-sm max-w-xl leading-relaxed text-muted-foreground">
              Uji kemampuan Anda dengan tryout online yang dirancang untuk
              mempersiapkan Anda menghadapi ujian. Dilengkapi soal beragam dan
              analisis hasil, aplikasi ini membantu Anda mengukur pemahaman dan
              melacak perkembangan secara mudah—kapan saja, di mana saja!
            </p>
            <div className="mt-6 flex gap-x-1.5">
              <Link href="/tryout">
                <Button>Mulai Tryout</Button>
              </Link>
            </div>
          </div>
        </div>
        {/* desktop & mobile */}
        <div
          className={`pointer-events-none -z-10 -top-[20%] left-[60%] -translate-x-1/2 w-[80%] md:w-[70%] lg:w-[60%] lg:left-[70.25%] lg:-top-[4.7%] xl:left-[73%] 2xl:left-[70%] xl:top-[5%] 2xl:-top-[5%] xl:w-[58%] transition-all duration-500 ease-out ${
            mounted
              ? "scale-100 absolute opacity-100"
              : "scale-110 fixed opacity-0"
          }`}>
          <Image
            src={HeroFigureDark}
            width={1440}
            height={1800}
            priority
            alt="hero"
            className="hidden dark:block w-full"
          />
        </div>
        <div
          className={`pointer-events-none -z-10 -top-[20%] left-[60%] -translate-x-1/2 w-[80%] md:w-[70%] lg:w-[60%] lg:left-[70.25%] lg:-top-[4.7%] xl:left-[73%] 2xl:left-[70%] xl:top-[5%] 2xl:-top-[5%] xl:w-[58%] transition-all duration-500 ease-out ${
            mounted
              ? "scale-100 absolute opacity-100"
              : "scale-110 fixed opacity-0"
          }`}>
          <Image
            src={HeroFigure}
            width={1440}
            height={1800}
            priority
            alt="hero"
            className="mt-1 ml-1 scale-[99%] block dark:hidden w-full"
          />
        </div>
        {/* mobile */}
        <div
          className={`lg:hidden pointer-events-none -z-10 -bottom-[20%] left-[40%] rotate-180 -translate-x-1/2 w-[80%] transition-all duration-500 ease-out ${
            mounted
              ? "scale-100 absolute opacity-100"
              : "scale-110 fixed opacity-0"
          }`}>
          <Image
            src={HeroFigureDark}
            width={1440}
            height={1800}
            alt="hero"
            priority
            className="hidden dark:block w-full"
          />
        </div>
        <div
          className={`lg:hidden pointer-events-none -z-10 -bottom-[20%] left-[40%] rotate-180 -translate-x-1/2 w-[80%] transition-all duration-500 ease-out ${
            mounted
              ? "scale-100 absolute opacity-100"
              : "scale-110 fixed opacity-0"
          }`}>
          <Image
            src={HeroFigure}
            width={1440}
            height={1800}
            alt="hero"
            priority
            className="block dark:hidden w-full mb-1 mr-1 scale-[99%]"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
