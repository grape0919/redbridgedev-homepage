"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme();

  return (
    <motion.button
      onClick={() => setLanguage(language === "ko" ? "en" : "ko")}
      className={`relative flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
        theme === "dark"
          ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${language === "ko" ? "English" : "Korean"}`}
    >
      <span
        className={`transition-colors ${
          language === "ko" ? "text-red-500 font-bold" : ""
        }`}
      >
        KO
      </span>
      <span className={theme === "dark" ? "text-gray-600" : "text-gray-400"}>
        /
      </span>
      <span
        className={`transition-colors ${
          language === "en" ? "text-red-500 font-bold" : ""
        }`}
      >
        EN
      </span>
    </motion.button>
  );
}
