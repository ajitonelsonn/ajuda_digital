"use client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Users,
  Database,
  Globe,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import TextReveal from "@/components/animations/TextReveal";
import LoadingScreen from "@/components/animations/LoadingScreen";
import { useLanguage } from "@/contexts/LanguageContext";

const getFeatures = (t: (key: string) => string) => [
  {
    icon: MessageCircle,
    title: t("features.specializedAssistants.title"),
    description: t("features.specializedAssistants.description"),
  },
  {
    icon: Globe,
    title: t("features.multilingualSupport.title"),
    description: t("features.multilingualSupport.description"),
  },
  {
    icon: Zap,
    title: t("features.instantResponses.title"),
    description: t("features.instantResponses.description"),
  },
  {
    icon: Database,
    title: t("features.comprehensiveDatabase.title"),
    description: t("features.comprehensiveDatabase.description"),
  },
];

const technologies = [
  {
    name: "SEA-LION",
    description: "Advanced LLM for Southeast Asian context",
    url: "https://sea-lion.ai/",
    logo: "/images/tech/sealion.webp",
  },
  {
    name: "Amazon Bedrock",
    description:
      "Enterprise AI infrastructure with Amazon Titan Text Embeddings",
    url: "https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html",
    logo: "/images/tech/amazon_titan.png",
  },
  {
    name: "PostgreSQL",
    description: "Reliable data management",
    url: "https://www.postgresql.org/",
    logo: "/images/tech/postgresql.svg",
  },
  {
    name: "Open Web UI",
    description: "User-friendly AI Interface",
    url: "https://openwebui.com/",
    logo: "/images/tech/openwebui.png",
  },
];

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const { t } = useLanguage();
  const features = getFeatures(t);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: showContent ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/tais_timor.jpg"
            alt="Tais Timor Traditional Pattern"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/50 to-yellow-600/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              <TextReveal className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                {t("hero.title")}
              </TextReveal>
            </h1>
            <TextReveal
              className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto block"
              delay={0.2}
            >
              {t("hero.subtitle")}
            </TextReveal>
            <TextReveal
              className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto block"
              delay={0.4}
              staggerChildren={0.05}
            >
              {t("hero.description")}
            </TextReveal>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link
                href="https://chat.ajuda-digital.com"
                className="btn-primary group relative overflow-hidden flex items-center space-x-2"
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <MessageCircle size={20} />
                </motion.div>
                <span>{t("hero.tryAjudaDigital")}</span>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </Link>
              <Link
                href="/team"
                className="btn-secondary group flex items-center space-x-2"
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Users size={20} />
                </motion.div>
                <span>{t("hero.meetTheTeam")}</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <TextReveal className="text-4xl font-bold text-gray-900 mb-6">
              🚧 {t("challenges.title")}
            </TextReveal>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 mb-8">
                {t("challenges.description")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-red-700 mb-3">
                    🌐 {t("challenges.scatteredInfo.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("challenges.scatteredInfo.description")}
                  </p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-yellow-700 mb-3">
                    🏢 {t("challenges.officeVisits.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("challenges.officeVisits.description")}
                  </p>
                </div>
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-red-700 mb-3">
                    ❌ {t("challenges.documentRejections.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("challenges.documentRejections.description")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <TextReveal className="text-4xl font-bold text-gray-900 mb-6">
              {t("features.title")}
            </TextReveal>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("features.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="bg-gradient-to-r from-red-100 to-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="text-red-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <TextReveal className="text-4xl font-bold text-gray-900 mb-6">
              {t("technology.title")}
            </TextReveal>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              {t("technology.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <motion.a
                key={index}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gradient-to-br from-red-50 to-yellow-50 p-6 rounded-lg border border-red-100 hover:border-red-200 hover:shadow-lg transition-all duration-300 cursor-pointer block"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 relative flex-shrink-0">
                    <Image
                      src={tech.logo}
                      alt={`${tech.name} logo`}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {tech.name}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">{tech.description}</p>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              href="/datasets"
              className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
            >
              <Database size={20} />
              <span>{t("technology.exploreDatasets")}</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TextReveal className="text-4xl font-bold text-white mb-6">
              {t("cta.title")}
            </TextReveal>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              {t("cta.description")}
            </p>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href="https://chat.ajuda-digital.com"
                className="bg-white text-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 hover:shadow-lg transition-all duration-300 inline-flex items-center space-x-2"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <MessageCircle size={20} />
                </motion.div>
                <span>{t("cta.startChatting")}</span>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
