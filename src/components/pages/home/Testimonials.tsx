"use client";
import { Skeleton } from "@/components/ui/skeleton";
import ResponseError from "@/error/ResponseError";
import { DataAllReview, ResponsePayload } from "@/types";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Testimonials() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const [dataReview, setDataReview] = useState<DataAllReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/reviews");
        const dataRes = (await res.json()) as ResponsePayload<DataAllReview[]>;
        if (dataRes.status === "failed") {
          throw new ResponseError(dataRes.code, dataRes.message);
        }

        setDataReview(dataRes.data);
      } catch (error) {
        if (error instanceof ResponseError) {
          toast.error(error.message);
        } else {
          toast.error("An error occured!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
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
            className="text-5xl md:text-7xl font-bold text-stone-900 mt-6"
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
            {loading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="flex gap-8">
                    <Skeleton className="w-[30rem] h-[5rem] bg-gray-500"></Skeleton>
                  </div>
                ))
              : dataReview.map((review, i) => (
                  <div key={i + (review.name || "-")} className="flex gap-8">
                    <div className="inline-block px-6 py-4 bg-white rounded-lg shadow-md border w-[30rem] border-orange-100 hover:shadow-lg transition-shadow duration-300 flex-shrink-0">
                      <p className="text-stone-600 truncate font-medium text-sm mb-4">
                        &quot;{review.comment}&quot;
                      </p>
                      <div className="flex items-center gap-2 justify-between">
                        <span className="text-orange-500 font-semibold text-xs">
                          {review.name}
                        </span>
                        <span className="text-yellow-400 text-xs">★★★★★</span>
                      </div>
                    </div>
                  </div>
                ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
