"use client";
import Image from "next/image";
import Link from "next/link";
import { Github, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import VisitorCounter from "@/components/VisitorCounter";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Background Image with enhanced overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/tais_timor.jpg"
          alt="Tais Timor Traditional Pattern"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/80 to-black/90"></div>
        {/* Modern geometric overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-red-500/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-0 w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-full blur-2xl"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="Ajuda Digital"
                  width={48}
                  height={48}
                  className="h-12 w-auto drop-shadow-lg"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full opacity-20 blur"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Ajuda Digital
                </span>
                <div className="h-0.5 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full mt-1"></div>
              </div>
            </div>
            <p className="text-gray-300 max-w-md leading-relaxed mb-6">
              {t("footer.description")}
            </p>
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700/50 w-fit">
              <MapPin size={16} className="text-red-400" />
              <span className="text-gray-300 text-sm font-medium">
                {t("footer.madeInTimorLeste")} 🇹🇱
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-all duration-300 flex items-center space-x-2 group hover:translate-x-1"
                >
                  <div className="w-1 h-1 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span>{t("header.home")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="text-gray-300 hover:text-white transition-all duration-300 flex items-center space-x-2 group hover:translate-x-1"
                >
                  <div className="w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span>{t("header.team")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/datasets"
                  className="text-gray-300 hover:text-white transition-all duration-300 flex items-center space-x-2 group hover:translate-x-1"
                >
                  <div className="w-1 h-1 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span>{t("header.datasets")}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              {t("footer.connect")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:cs.ajuda.digital@gmail.com"
                  className="text-gray-300 hover:text-white transition-all duration-300 flex items-center space-x-3 group p-2 rounded-lg hover:bg-gray-800/30"
                >
                  <div className="p-2 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg group-hover:scale-110 transition-transform">
                    <Mail size={14} className="text-white" />
                  </div>
                  <span>{t("footer.contactUs")}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ajitonelsonn/ajuda_digital"
                  className="text-gray-300 hover:text-white transition-all duration-300 flex items-center space-x-3 group p-2 rounded-lg hover:bg-gray-800/30"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="p-2 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg group-hover:scale-110 transition-transform">
                    <Github size={14} className="text-white" />
                  </div>
                  <span>{t("footer.github")}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Visitor Counter */}
          <div>
            <VisitorCounter />
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">{t("footer.copyright")}</p>
          <p className="text-gray-400 text-sm mt-2 sm:mt-0">
            {t("footer.poweredBy")}
          </p>
        </div>
      </div>
    </footer>
  );
}
