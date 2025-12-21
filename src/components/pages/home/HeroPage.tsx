"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 700]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="home"
      className="w-screen h-screen relative bg-gradient-to-br from-[#ffecd2] via-[#fcb69f] to-[#ff9a76] overflow-hidden"
    >
      <div className="w-[500px] h-[500px] gradient-orb -top-[10%] -left-[10%] bg-[#ff8c42]" />
      <div className="w-[400px] h-[400px] gradient-orb -top-[10%] -left-[10%] bg-[#ffa726] delay-[-10s]" />
      <div className="particle left-[20%] delay-0" />
      <div className="particle left-[40%] delay-[3s]" />
      <div className="particle left-[80%] delay-[9s]" />
      <div className="particle left-[30%] delay-[12s]" />

      {isMounted && (
        <>
          <motion.div
            initial={{ y: -600, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bottle-container parallax-element left-[15rem] top-[25rem] md:left-[15%] md:top-[20%]"
            data-speed="0.3s"
            style={{ y }}
          >
            <Image
              src="/jus-manggaiy.png"
              width={200}
              height={3500}
              alt="Orange Juice"
              className="bottle-left"
            />
          </motion.div>
          <motion.div
            initial={{ y: -600, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
            style={{ y }}
            className="bottle-container parallax-element -translate-x-1/2 left-[50%] top-[15%]"
            data-speed="0.5s"
          >
            <Image
              src="/jus-nagaiy.png"
              width={200}
              height={3500}
              alt="Orange Juice"
              className="bottle-main"
            />
          </motion.div>
          <motion.div
            initial={{ y: -600, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
            style={{ y }}
            className="bottle-container parallax-element right-[12rem] top-[23rem] md:right-[15%] md:top-[30%]"
            data-speed="0.4s"
          >
            <Image
              src="/jus-pisangiy.png"
              width={200}
              height={3500}
              alt="Orange Juice"
              className="bottle-right"
            />
          </motion.div>
        </>
      )}

      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="text-center px-6 max-w-4xl">
          <div className="mb-6 reveal" />
          {isMounted && (
            <>
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="text-5xl md:text-9xl font-bold text-stone-900 mb-6"
              >
                Pure Taste <br />{" "}
                <span className="text-[#e4842b]">Pure Life</span>
              </motion.h1>
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="text-slate-700 text-xl md:text-2xl mb-12 font-semibold md:font-light"
              >
                Handcrafted wellness in every bottle
              </motion.p>
              <motion.button
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="btn-premium cursor-pointer pointer-events-auto delay-[0.3s]"
              >
                Explore Collection
              </motion.button>
            </>
          )}
        </div>
      </div>

      <motion.div
        initial={{ y: 70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center z-10"
      ></motion.div>
    </section>
  );
}
