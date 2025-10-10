"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, Trophy, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

interface WinnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WinnerModal({ isOpen, onClose }: WinnerModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-all duration-200 hover:scale-110"
            >
              <X size={20} className="text-gray-700" />
            </button>

            {/* Header with gradient */}
            <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-yellow-500 p-6 sm:p-8 pb-10 sm:pb-12">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_50%)]" />
              </div>

              <div className="relative text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                  transition={{
                    scale: { delay: 0.2, type: "spring", stiffness: 200 },
                    rotate: { delay: 0.5, duration: 0.5 },
                  }}
                  className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4 bg-white rounded-full shadow-lg"
                >
                  <Trophy className="text-yellow-500" size={32} />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2"
                >
                  Winner Announcement
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-center gap-2 text-white/95 text-base sm:text-lg flex-wrap px-2"
                >
                  <Award size={20} className="sm:w-6 sm:h-6" />
                  <span className="font-semibold text-center">Pan-SEA AI Developer Challenge 2025</span>
                </motion.div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center mb-4 sm:mb-6"
              >
                <div className="inline-block bg-gradient-to-r from-red-50 to-yellow-50 border-2 border-red-200 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 mb-4 sm:mb-6">
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                    Most Innovative Use of SEA-LION
                  </p>
                </div>

                <p className="text-gray-700 text-base sm:text-lg mb-3 sm:mb-4 leading-relaxed px-2">
                  We are proud to announce that <span className="font-bold text-red-600">Ajuda Digital</span> has
                  won the <span className="font-semibold">Most Innovative Use of SEA-LION</span> award in the
                  Pan-SEA AI Developer Challenge 2025!
                </p>

                <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 px-2">
                  Our homegrown government chatbot by Timorese youth has been recognized for its
                  innovative approach to making government services accessible to all citizens.
                </p>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                  <p className="text-xs sm:text-sm text-gray-700 mb-2">
                    <span className="font-semibold">Prize:</span> US$700
                  </p>
                  <p className="text-xs text-gray-600">
                    Winners will be officially announced during AIMX on 28 November 2025.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <a
                  href="https://seadeveloperchallenge.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-red-600 to-yellow-500 text-white px-4 sm:px-6 py-3 rounded-xl text-sm sm:text-base font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                >
                  <span>Learn More About Challenge</span>
                  <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" />
                </a>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 sm:px-6 py-3 rounded-xl text-sm sm:text-base font-semibold hover:bg-gray-200 transition-all duration-300 active:scale-95"
                >
                  Continue to Website
                </button>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 animate-pulse" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
