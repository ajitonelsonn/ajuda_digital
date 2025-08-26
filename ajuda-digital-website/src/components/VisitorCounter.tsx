"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { VisitorTracker, type VisitorData } from "@/lib/visitorTracking";

export default function VisitorCounter() {
  const [visitorData, setVisitorData] = useState<VisitorData>({
    totalVisitors: 0,
    countries: [],
    dailyVisits: [],
    lastUpdated: "",
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const countriesPerPage = 4;
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  useEffect(() => {
    const initializeTracking = async () => {
      try {
        const tracker = VisitorTracker.getInstance();

        // Load existing data first (instant display)
        const existingData = tracker.getData();
        setVisitorData(existingData);
        setLoading(false);

        // Try to load from Firebase (if configured)
        await tracker.loadFromFirebase();

        // Try to load from external API (if available)
        await tracker.loadFromExternalAPI();

        // Track current visitor
        const updatedData = await tracker.trackVisitor();
        setVisitorData(updatedData);
      } catch (error) {
        console.error("Failed to initialize visitor tracking:", error);
        setLoading(false);
      }
    };

    initializeTracking();
  }, []);

  const totalPages = Math.ceil(visitorData.countries.length / countriesPerPage);
  const startIndex = currentPage * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  const currentCountries = visitorData.countries.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setIsAutoSliding(false); // Stop auto-slide when user manually navigates
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setIsAutoSliding(false); // Stop auto-slide when user manually navigates
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoSliding || totalPages <= 1) return;

    const autoSlideInterval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 3000); // Change page every 3 seconds

    return () => clearInterval(autoSlideInterval);
  }, [totalPages, isAutoSliding]);

  if (loading) {
    return (
      <div className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-center space-x-2 mb-3">
          <Globe className="text-blue-400 animate-spin" size={18} />
          <h4 className="text-white font-semibold">Loading Visitors...</h4>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 rounded-xl p-5 backdrop-blur-sm border border-gray-600/30 shadow-xl"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
          <Users className="text-white" size={16} />
        </div>
        <h4 className="text-white font-semibold text-lg">Visitors</h4>
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="text-center mb-5 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20"
      >
        <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">
          {visitorData.totalVisitors.toLocaleString()}
        </div>
        <div className="text-xs text-gray-400 font-medium">Total Visits</div>
      </motion.div>

      <div 
        className="space-y-3"
        onMouseEnter={() => setIsAutoSliding(false)}
        onMouseLeave={() => setIsAutoSliding(true)}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-md">
              <Globe size={12} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-white">Countries</span>
          </div>
          
          {/* Carousel Navigation */}
          {totalPages > 1 && (
            <div className="flex items-center space-x-1">
              <button
                onClick={prevPage}
                className="p-1 bg-gray-700/60 hover:bg-gray-600/80 rounded-md transition-all duration-200 hover:scale-110"
                aria-label="Previous countries"
              >
                <ChevronLeft size={14} className="text-gray-300" />
              </button>
              <span className="text-xs text-gray-400 px-2">
                {currentPage + 1}/{totalPages}
              </span>
              <button
                onClick={nextPage}
                className="p-1 bg-gray-700/60 hover:bg-gray-600/80 rounded-md transition-all duration-200 hover:scale-110"
                aria-label="Next countries"
              >
                <ChevronRight size={14} className="text-gray-300" />
              </button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {currentCountries.map((country, index) => (
            <motion.div
              key={`${country.code}-${currentPage}`}
              initial={{ opacity: 0, scale: 0, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{
                delay: 0.1 + index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
              className="group relative"
            >
              <div className="flex flex-col items-center space-y-1 bg-gradient-to-b from-gray-700/60 to-gray-800/60 hover:from-gray-600/80 hover:to-gray-700/80 rounded-lg px-2 py-2.5 text-xs transition-all duration-300 cursor-pointer border border-gray-600/30 hover:border-gray-500/50 hover:scale-105">
                <span className="text-lg filter drop-shadow-sm">
                  {country.flag}
                </span>
                <span className="text-white font-bold text-xs">
                  {country.count}
                </span>
              </div>

              {/* Enhanced Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-gray-900 to-black text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap z-20 shadow-xl border border-gray-700">
                <div className="font-semibold">{country.name}</div>
                <div className="text-gray-300">{country.count} visits</div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {totalPages > 1 && (
          <div className="flex justify-center mt-3">
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentPage(index);
                    setIsAutoSliding(false); // Stop auto-slide when user manually navigates
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentPage
                      ? "bg-gradient-to-r from-green-400 to-emerald-400"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
