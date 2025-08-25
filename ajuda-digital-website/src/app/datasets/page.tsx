"use client";
import { motion } from "framer-motion";
import { Database, Clock } from "lucide-react";

export default function DatasetsPage() {
  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-8">
              <Database className="text-white" size={40} />
            </div>

            <h1 className="text-5xl font-bold text-gray-900 mb-8">
              Dataset for RAG for{" "}
              <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                Ajuda Digital
              </span>
            </h1>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-12 border border-yellow-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6">
                <Clock className="text-white animate-pulse" size={32} />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Dataset Collection in Progress
              </h2>

              <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
                Our team is still collecting datasets. After we finish
                collecting all the necessary data, we will put it here.
              </p>

              <div className="mt-8 inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-lg font-medium">
                <Clock size={20} />
                <span>Coming Soon</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
