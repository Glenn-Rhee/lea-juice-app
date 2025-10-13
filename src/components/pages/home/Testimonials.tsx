"use client";
import { testimonials } from "@/utils/testimonials";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Testimonials() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  return (
    <motion.div
      id="testimonials"
      ref={sectionRef}
      style={{ opacity, y }}
      className="py-32 px-6 relative overflow-hidden bg-white"
    >
      {/* Subtle Animated Background Orbs */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 right-20 w-80 h-80 bg-gradient-to-br from-orange-300 to-orange-200 rounded-full blur-3xl opacity-5 pointer-events-none"
      />

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -bottom-40 left-0 w-96 h-96 bg-gradient-to-tr from-orange-200 to-amber-100 rounded-full blur-3xl opacity-4 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="uppercase text-orange-500 text-sm tracking-widest font-medium inline-block"
          >
            Testimonials
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold text-stone-900 mt-6"
          >
            Loved by Thousands
          </motion.h2>
        </motion.div>

        {/* Running Text Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16 overflow-hidden bg-gradient-to-r from-orange-50 via-white to-orange-50 py-6 rounded-2xl border border-orange-100"
        >
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...Array(3)].map((_, set) => (
              <div key={set} className="flex gap-8">
                {testimonials.map((t, i) => (
                  <div
                    key={`${set}-${i}`}
                    className="inline-block px-6 py-4 bg-white rounded-lg shadow-md border border-orange-100 hover:shadow-lg transition-shadow duration-300 flex-shrink-0"
                  >
                    <p className="text-stone-600 font-medium text-sm mb-4">
                      "{t.comment.substring(0, 50)}..."
                    </p>
                    <div className="flex items-center gap-2 justify-between">
                      <span className="text-orange-500 font-semibold text-xs">
                        {t.name}
                      </span>
                      <span className="text-yellow-400 text-xs">★★★★★</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
