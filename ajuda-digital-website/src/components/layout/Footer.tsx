"use client";
import Image from "next/image";
import Link from "next/link";
import { Github, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/tais_timor.jpg"
          alt="Tais Timor Traditional Pattern"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gray-900/10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/logo.png"
                alt="Ajuda Digital"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold">Ajuda Digital</span>
            </div>
            <p className="text-gray-400 max-w-md">
              {t("footer.description")}
            </p>
            <div className="flex items-center space-x-2 mt-4 text-sm text-gray-500">
              <MapPin size={16} />
              <span>{t("footer.madeInTimorLeste")} 🇹🇱</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("header.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("header.team")}
                </Link>
              </li>
              <li>
                <Link
                  href="/datasets"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("header.datasets")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.connect")}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:cs.ajuda.digital@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <Mail size={16} />
                  <span>{t("footer.contactUs")}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ajitonelsonn/ajuda_digital"
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <Github size={16} />
                  <span>{t("footer.github")}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            {t("footer.copyright")}
          </p>
          <p className="text-gray-400 text-sm mt-2 sm:mt-0">
            {t("footer.poweredBy")}
          </p>
        </div>
      </div>
    </footer>
  );
}
