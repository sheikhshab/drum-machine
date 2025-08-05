"use client"

import { motion } from "framer-motion"

const demoVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.8,
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Demo() {
  return (
    <div className="max-w-7xl mx-auto text-center">
      <motion.h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" variants={itemVariants}>
        See Rhythm Machine Pro in Action
      </motion.h2>
      <motion.p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8" variants={itemVariants}>
        Explore the power of AI-driven beat creation with our interactive demo.
      </motion.p>
      <motion.iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Rhythm Machine Pro Demo"
        className="w-full aspect-video rounded-2xl shadow-2xl transition-all duration-300 hover:scale-[1.01] hover:shadow-foreground/10"
        variants={itemVariants}
      ></motion.iframe>
    </div>
  )
}
