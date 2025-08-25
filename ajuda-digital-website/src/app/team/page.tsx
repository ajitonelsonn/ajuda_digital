"use client";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Code,
  Brain,
  Palette,
} from "lucide-react";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
  social: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Ajito Nelson Lucio da Costa",
    role: "Team Leader",
    bio: "Big Data Engineer at Viettel Timor and passionate about Artificial Intelligence and Machine Learning.",
    image: "/images/team-member-1.jpg",
    skills: ["Check : www.ajitonelson.com"],
    social: {
      github: "https://github.com/ajitonelsonn",
      linkedin: "https://linkedin.com/in/ajitonelson",
    },
  },
  {
    name: "Jedinilda S. Seixas dos Reis",
    role: "Team Member",
    bio: "Fresh graduate from Universidade Nacional Timor Lorosa’e (UNTL) with a Licenciatura em Engenharia Informática (L.Eng.Inf). Passionate about using new technologies like AI and others to solve real problems.",
    image: "/images/team-member-2.jpg",
    skills: ["UI/UX", "Networking"],
    social: {
      github: "https://github.com/Jedinilda20",
      linkedin: "https://linkedin.com/in/jedinildadosreis",
    },
  },
  {
    name: "Abrao Glorito DC",
    role: "Team Member",
    bio: "Second-year Bachelor student in Computer Science at Dili Institute of Technology (DIT), with a strong interest in learning new technologies.",
    image: "/images/team-member-3.jpg",
    skills: ["Python", "Java", "MySQL"],
    social: {
      github: "https://github.com/abraog",
      linkedin: "https://linkedin.com/in/abraoglorito",
    },
  },
];

const values = [
  {
    icon: Code,
    title: "Innovation First",
    description:
      "We believe technology should serve people, especially in underrepresented communities.",
  },
  {
    icon: Brain,
    title: "Local Solutions",
    description:
      "Built by Timorese youth who understand the real challenges citizens face daily.",
  },
  {
    icon: Palette,
    title: "Cultural Respect",
    description:
      "Our solutions honor Timorese culture while embracing modern technology.",
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                Team
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              From Timor-Leste youth, for Timor-Leste — turning ideas into
              reality.
            </p>
            <div className="flex items-center justify-center space-x-2 text-red-600">
              <MapPin size={20} />
              <span className="text-lg font-medium">
                Made in Timor-Leste 🇹🇱
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100"
              >
                {/* Profile Image */}
                <div className="relative h-64 bg-gradient-to-br from-red-100 to-yellow-100 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                    priority={index === 0}
                    loading={index < 3 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      e.currentTarget.style.display = "none";
                      const fallback =
                        e.currentTarget.parentElement?.querySelector(
                          ".image-fallback"
                        ) as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  {/* Fallback initials (hidden by default) */}
                  <div
                    className="image-fallback absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-400 to-yellow-400"
                    style={{ display: "none" }}
                  >
                    <span className="text-4xl font-bold text-white">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-red-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.skills.map((skill, skillIndex) => {
                      // Check if skill is a website link
                      if (skill.includes("www.") || skill.includes("http")) {
                        const url = skill.includes("Check : ")
                          ? skill.replace("Check : ", "")
                          : skill;
                        const displayText = skill.includes("Check : ")
                          ? skill
                          : `Visit ${url}`;
                        return (
                          <a
                            key={skillIndex}
                            href={
                              url.startsWith("http") ? url : `https://${url}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-full hover:bg-red-100 transition-colors cursor-pointer"
                          >
                            {displayText}
                          </a>
                        );
                      }
                      // Regular skill
                      return (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      );
                    })}
                  </div>

                  {/* Social Links */}
                  <div className="flex space-x-3">
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin size={20} />
                      </a>
                    )}
                    {member.social.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Mail size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our work and drive our mission to
              democratize access to government services in Timor-Leste.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-md text-center"
              >
                <div className="bg-gradient-to-r from-red-100 to-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="text-red-600" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Our Mission
            </h2>
            <blockquote className="text-2xl text-gray-700 font-light leading-relaxed mb-8">
              &ldquo;We believe that every Timorese citizen deserves easy access
              to government services in their own language. Technology should
              bridge gaps, not create them.&rdquo;
            </blockquote>
            <div className="bg-gradient-to-r from-red-50 to-yellow-50 p-8 rounded-xl border border-red-100">
              <p className="text-lg text-gray-700 leading-relaxed">
                As young developers from Timor-Leste, we&apos;ve experienced
                firsthand the challenges of navigating government services. Our
                goal is to use cutting-edge AI technology, specifically the
                SEA-LION model designed for Southeast Asia, to create solutions
                that truly serve our people and prepare our nation for digital
                transformation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Want to Collaborate?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              We&apos;re always open to collaboration, feedback, and
              partnerships that can help improve government services in
              Timor-Leste.
            </p>
            <a
              href="mailto:cs.ajuda.digital@gmail.com"
              className="bg-white text-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center space-x-2"
            >
              <Mail size={20} />
              <span>Get in Touch</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
