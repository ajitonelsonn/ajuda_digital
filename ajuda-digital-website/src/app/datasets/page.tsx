"use client";
import { motion } from "framer-motion";
import { Video } from "lucide-react";

export default function DatasetsPage() {
  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full mb-8">
              <Video className="text-white" size={40} />
            </div>

            <h1 className="text-5xl font-bold text-gray-900 mb-8">
              <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                Ajuda Digital
              </span>{" "}
              Demo Video
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Watch how Ajuda Digital is transforming government service access for Timor-Leste citizens
            </p>

            {/* Video Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl"
                  src="https://www.youtube.com/embed/77iIx03NiSs?si=CZINtFyW6rzgEDrA"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 bg-gradient-to-r from-red-50 to-yellow-50 rounded-xl p-8 max-w-3xl mx-auto border border-red-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About This Project
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ajuda Digital is a homegrown government chatbot developed by Timorese youth,
                designed to make government services accessible to all citizens. Winner of the
                <span className="font-semibold text-red-600"> Most Innovative Use of SEA-LION</span> award
                in the Pan-SEA AI Developer Challenge 2025.
              </p>
              <p className="text-gray-600 text-sm">
                Winners will be officially announced during AIMX on 28 November 2025.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
