"use client";
import { productsHighlight } from "@/utils/products-highlight";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Collection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      id="collection"
      ref={sectionRef}
      style={{ opacity, y }}
      className="py-32 px-6 bg-[#033d23] min-h-screen relative overflow-hidden"
    >
      {/* Premium Background Orbs */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 right-20 w-80 h-80 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full blur-3xl opacity-12 pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -bottom-40 left-20 w-96 h-96 bg-gradient-to-tr from-orange-500 to-orange-400 rounded-full blur-3xl opacity-8 pointer-events-none"
      />

      {/* Center Glow */}
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-orange-500 to-transparent rounded-full blur-3xl opacity-5 pointer-events-none"
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
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-orange-300 to-orange-400 bg-clip-text text-transparent mt-6 mb-6"
          >
            Signature Blends
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-orange-100/70 text-lg max-w-2xl mx-auto font-light"
          >
            Each bottle is a masterpiece of taste, crafted with passion and
            precision
          </motion.p>
        </motion.div>

        {/* Product Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {productsHighlight.map((p, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -15 }}
              className="group relative"
            >
              {/* Card Glow Background */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10"
              />

              {/* Card Container */}
              <div className="relative bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl overflow-hidden border border-orange-400 border-opacity-30 backdrop-blur-sm h-full flex flex-col shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                {/* Image Section */}
                <motion.div className="relative h-96 overflow-hidden bg-gradient-to-br from-orange-900/50 to-orange-800/50">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      className="w-full h-full object-cover object-left"
                    />
                  </motion.div>

                  {/* Premium Shine */}
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileHover={{ opacity: 1, x: 100 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 pointer-events-none"
                  />

                  {/* Corner Accent */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-300 to-transparent rounded-bl-2xl"
                  />
                </motion.div>

                {/* Content Section */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  {/* Top Content */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 + 0.4 }}
                        className="uppercase text-orange-100 text-xs tracking-widest font-semibold"
                      >
                        {p.category}
                      </motion.span>

                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                        className="cursor-pointer"
                      >
                        <span className="text-yellow-200 text-sm font-semibold drop-shadow-lg">
                          ★★★★★
                        </span>
                      </motion.div>
                    </div>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1 + 0.5 }}
                      className="text-3xl font-bold text-white mb-4"
                    >
                      {p.title}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1 + 0.6 }}
                      className="text-orange-50/80 leading-relaxed text-sm font-light"
                    >
                      {p.desc}
                    </motion.p>
                  </div>

                  {/* Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 + 0.7 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 py-3 bg-white text-orange-600 rounded-lg font-semibold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:bg-orange-50 transition-all duration-300"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
