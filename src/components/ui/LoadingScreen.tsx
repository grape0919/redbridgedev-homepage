"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Minimum loading time for animation effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
        >
          {/* Background grid */}
          <div className="absolute inset-0 grid-pattern opacity-20" />

          {/* Animated bridge drawing */}
          <div className="relative mb-8">
            <motion.svg
              width="200"
              height="100"
              viewBox="0 0 200 100"
              className="text-red-500"
            >
              {/* Bridge towers */}
              <motion.line
                x1="50"
                y1="80"
                x2="50"
                y2="30"
                stroke="currentColor"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0 }}
              />
              <motion.line
                x1="150"
                y1="80"
                x2="150"
                y2="30"
                stroke="currentColor"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />

              {/* Bridge deck */}
              <motion.line
                x1="10"
                y1="80"
                x2="190"
                y2="80"
                stroke="currentColor"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />

              {/* Main cables */}
              <motion.path
                d="M 10 40 Q 50 20 100 35 Q 150 50 190 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />

              {/* Suspension cables */}
              {[30, 50, 70, 90, 110, 130, 150, 170].map((x, i) => (
                <motion.line
                  key={x}
                  x1={x}
                  y1={35 + Math.abs(x - 100) * 0.1}
                  x2={x}
                  y2="80"
                  stroke="currentColor"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 1 + i * 0.05 }}
                />
              ))}
            </motion.svg>

            {/* Glow effect */}
            <div className="absolute inset-0 blur-xl bg-red-500/20 animate-pulse" />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <Image
              src="/logo_white.png"
              alt="RED BRIDGE DEV"
              width={200}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </motion.div>

          {/* Loading bar */}
          <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 text-gray-500 text-sm tracking-widest uppercase"
          >
            Loading...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
