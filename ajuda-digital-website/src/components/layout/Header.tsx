"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Trophy } from "lucide-react";
import LanguageSelector from "../LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navigation = [
    { name: t("header.home"), href: "/" },
    { name: t("header.team"), href: "/team" },
    { name: t("header.datasets"), href: "/datasets" },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-red-100">
      {/* Winner Announcement Scrolling Banner */}
      <div className="bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 text-white overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-2 flex items-center">
          <span className="inline-flex items-center mx-4">
            <Trophy size={16} className="mr-2" />
            <span className="font-semibold">🏆 Winner: Most Innovative Use of SEA-LION - Pan-SEA AI Developer Challenge 2025</span>
          </span>
          <span className="inline-flex items-center mx-4">
            <Trophy size={16} className="mr-2" />
            <span className="font-semibold">🏆 Winner: Most Innovative Use of SEA-LION - Pan-SEA AI Developer Challenge 2025</span>
          </span>
          <span className="inline-flex items-center mx-4">
            <Trophy size={16} className="mr-2" />
            <span className="font-semibold">🏆 Winner: Most Innovative Use of SEA-LION - Pan-SEA AI Developer Challenge 2025</span>
          </span>
          <span className="inline-flex items-center mx-4">
            <Trophy size={16} className="mr-2" />
            <span className="font-semibold">🏆 Winner: Most Innovative Use of SEA-LION - Pan-SEA AI Developer Challenge 2025</span>
          </span>
        </div>
      </div>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="Ajuda Digital"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                Ajuda Digital
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
            <LanguageSelector />
            <Link
              href="https://chat.ajuda-digital.com"
              className="bg-gradient-to-r from-red-600 to-yellow-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-200"
            >
              {t("header.tryDemo")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-red-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-red-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <LanguageSelector />
              </div>
              <Link
                href="https://chat.ajuda-digital.com"
                className="block px-3 py-2 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-md text-center mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("header.tryDemo")}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
