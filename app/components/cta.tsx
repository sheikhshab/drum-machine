"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SparklesIcon, MusicIcon } from "@/components/soundcloud-icons"
import Link from "next/link"

const ctaVariants = {
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

export default function CTA() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        className="bg-gradient-to-r from-gradient-start/20 to-gradient-end/20 rounded-3xl p-12 border border-border transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20"
        variants={ctaVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" variants={itemVariants}>
          Ready to Create Your
          <span className="bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
            {" "}
            Next Hit?
          </span>
        </motion.h2>
        <motion.p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" variants={itemVariants}>
          Join thousands of creators who are already making professional beats with AI. Start your free trial today – no
          credit card required.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" variants={itemVariants}>
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-gradient-start to-gradient-end hover:from-gradient-start/80 hover:to-gradient-end/80 text-primary-foreground px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
              <SparklesIcon className="w-5 h-5 mr-2" />
              Start Creating Free
              <MusicIcon className="w-5 h-5 ml-2" /> {/* Using MusicIcon as ArrowRight */}
            </Button>
          </Link>
        </motion.div>

        <motion.div className="mt-8 text-muted-foreground text-sm" variants={itemVariants}>
          <span className="transition-all duration-200 hover:text-foreground">Free forever plan available</span> •{" "}
          <span className="transition-all duration-200 hover:text-foreground">Upgrade anytime</span> •{" "}
          <span className="transition-all duration-200 hover:text-foreground">Cancel anytime</span>
        </motion.div>
      </motion.div>
    </div>
  )
}
