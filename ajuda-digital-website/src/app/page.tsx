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
  {
    name: "AWS S3",
    description: "Scalable cloud storage for datasets and documents",
    url: "https://aws.amazon.com/s3/",
    logo: "/images/tech/aws-s3.webp",
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
                {[
                  {
                    image: "/images/ps/Scattered_Information.png",
                    title: t("challenges.scatteredInfo.title"),
                    description: t("challenges.scatteredInfo.description"),
                    color: "red",
                    emoji: "🌐",
                  },
                  {
                    image: "/images/ps/Office_Visits_Required.png",
                    title: t("challenges.officeVisits.title"),
                    description: t("challenges.officeVisits.description"),
                    color: "yellow",
                    emoji: "🏢",
                  },
                  {
                    image: "/images/ps/Document_Rejections.png",
                    title: t("challenges.documentRejections.title"),
                    description: t("challenges.documentRejections.description"),
                    color: "red",
                    emoji: "❌",
                  },
                ].map((challenge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                      transition: { duration: 0.3 },
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className={`bg-gradient-to-br from-${challenge.color}-50 to-${challenge.color}-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-${challenge.color}-200 group overflow-hidden relative`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-900" />
                    </div>

                    {/* Image Container */}
                    <motion.div
                      className="relative mb-6 rounded-lg overflow-hidden shadow-md"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="aspect-video relative bg-white p-4">
                        <Image
                          src={challenge.image}
                          alt={challenge.title}
                          fill
                          className="object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="relative z-10">
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.2 + 0.3 }}
                        className="flex items-center mb-3"
                      >
                        <span className="text-2xl mr-3 animate-pulse">
                          {challenge.emoji}
                        </span>
                        <h3
                          className={`text-xl font-bold text-${challenge.color}-700 group-hover:text-${challenge.color}-800 transition-colors`}
                        >
                          {challenge.title}
                        </h3>
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.2 + 0.4 }}
                        className="text-gray-700 leading-relaxed"
                      >
                        {challenge.description}
                      </motion.p>
                    </div>

                    {/* Hover Glow Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-${challenge.color}-400/0 to-${challenge.color}-600/0 group-hover:from-${challenge.color}-400/5 group-hover:to-${challenge.color}-600/10 transition-all duration-300 rounded-xl`}
                    />
                  </motion.div>
                ))}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {technologies.map((tech, index) => (
              <motion.a
                key={index}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.08, y: -8 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border-0 transition-all duration-500 cursor-pointer block overflow-hidden"
              >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Logo container with enhanced styling */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                        <Image
                          src={tech.logo}
                          alt={`${tech.name} logo`}
                          width={40}
                          height={40}
                          className="object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      {/* Glow ring */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 rounded-xl opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-3 group-hover:text-gray-800 transition-colors">
                    {tech.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm text-center leading-relaxed group-hover:text-gray-700 transition-colors">
                    {tech.description}
                  </p>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
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
