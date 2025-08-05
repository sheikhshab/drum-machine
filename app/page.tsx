"use client" // This page needs to be a client component to use Framer Motion

import Hero from "./components/hero"
import Features from "./components/features"
import Demo from "./components/demo"
import Pricing from "./components/pricing"
import Testimonials from "./components/testimonials"
import CTA from "./components/cta"
import Navbar from "./components/navbar"
import Footer from "./components/footer" // Import Footer here
import SectionWrapper from "@/app/components/section-wrapper"
import HeroContentSection from "./components/hero-content-section" // Import the new component
import { motion } from "framer-motion"

// Variants for section entrance animation
const sectionVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 10,
      duration: 0.8,
      when: "beforeChildren", // Animate container before children
      staggerChildren: 0.1, // Stagger children within the section
    },
  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero section - now just the main headline and Spline background */}
      <Hero />

      {/* New section for the moved hero content */}
      <SectionWrapper id="hero-content">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <HeroContentSection />
        </motion.div>
      </SectionWrapper>

      {/* Features Section */}
      <SectionWrapper id="features">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of section is in view
        >
          <Features />
        </motion.div>
      </SectionWrapper>

      {/* Demo Section */}
      <SectionWrapper id="demo">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Demo />
        </motion.div>
      </SectionWrapper>

      {/* Pricing Section */}
      <SectionWrapper id="pricing">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Pricing />
        </motion.div>
      </SectionWrapper>

      {/* Testimonials Section */}
      <SectionWrapper>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Testimonials />
        </motion.div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <CTA />
        </motion.div>
      </SectionWrapper>

      {/* Footer Section */}
      <SectionWrapper className="py-0 px-0">
        {" "}
        {/* Remove default padding for footer */}
        <Footer />
      </SectionWrapper>
    </div>
  )
}
