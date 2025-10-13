"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsVisible(scrollPos > 300);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-24 px-6 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            variants={{
              show: { y: 0, opacity: 1 },
              hide: { y: -100, opacity: 0 },
            }}
            animate={isVisible ? "show" : "hide"}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="stat-item shadow-xl"
          >
            <div className="stat-number">100%</div>
            <span className="text-stone-500 text-sm tracking-wider mt-2">
              ORGANIC
            </span>
          </motion.div>
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            variants={{
              show: { y: 0, opacity: 1 },
              hide: { y: -100, opacity: 0 },
            }}
            animate={isVisible ? "show" : "hide"}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
            className="stat-item shadow-xl"
          >
            <div className="stat-number">50K+</div>
            <span className="text-stone-500 text-sm tracking-wider mt-2">
              Customers
            </span>
          </motion.div>
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            variants={{
              show: { y: 0, opacity: 1 },
              hide: { y: -100, opacity: 0 },
            }}
            animate={isVisible ? "show" : "hide"}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.8 }}
            className="stat-item shadow-xl"
          >
            <div className="stat-number">15+</div>
            <span className="text-stone-500 text-sm tracking-wider mt-2">
              Flavors
            </span>
          </motion.div>
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            variants={{
              show: { y: 0, opacity: 1 },
              hide: { y: -100, opacity: 0 },
            }}
            animate={isVisible ? "show" : "hide"}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 1.2 }}
            className="stat-item shadow-xl"
          >
            <div className="stat-number">4.9★</div>
            <span className="text-stone-500 text-sm tracking-wider mt-2">
              Rating
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
