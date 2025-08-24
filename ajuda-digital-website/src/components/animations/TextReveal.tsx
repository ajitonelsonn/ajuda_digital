"use client";
import { motion, Variants } from "framer-motion";
import { useRef } from "react";
import React from "react";

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  type?: "words" | "characters";
}

export default function TextReveal({ 
  children, 
  className = "", 
  delay = 0,
  duration = 0.6,
  staggerChildren = 0.1,
  type = "words"
}: TextRevealProps) {
  const text = typeof children === 'string' ? children : 
    React.Children.toArray(children).map(child => 
      typeof child === 'string' ? child : 
      typeof child === 'number' ? String(child) :
      React.isValidElement(child) && (child.props as { children?: React.ReactNode }).children ? 
        String((child.props as { children?: React.ReactNode }).children) : ''
    ).join('');
  const textRef = useRef<HTMLDivElement>(null);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren,
        delayChildren: delay
      }
    }
  };

  const item: Variants = {
    hidden: { 
      y: 30,
      opacity: 0,
      rotateX: -90
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const splitText = (text: string, splitType: "words" | "characters") => {
    if (splitType === "words") {
      return text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          variants={item}
          className="inline-block mr-1"
          style={{ transformOrigin: "50% 100%" }}
        >
          {word}
        </motion.span>
      ));
    } else {
      return text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={item}
          className="inline-block"
          style={{ transformOrigin: "50% 100%" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ));
    }
  };

  return (
    <div ref={textRef} className={`text-reveal ${className}`}>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {splitText(text, type)}
      </motion.div>
    </div>
  );
}