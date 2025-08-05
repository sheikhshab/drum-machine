"use client"

import { motion } from "framer-motion"
import { SparklesIcon, MusicIcon } from "@/components/soundcloud-icons" // Using Sparkles as Star placeholder

const testimonials = [
  {
    name: "Marcus Johnson",
    role: "Hip-Hop Producer",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Rhythm Machine Pro changed my workflow completely. I can create professional beats in minutes that used to take me hours. The AI understands exactly what I'm looking for.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Electronic Music Artist",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "The collaboration features are incredible. My team can work on beats together in real-time from different cities. It's like having a virtual studio.",
    rating: 5,
  },
  {
    name: "DJ Mike Rodriguez",
    role: "Club DJ & Producer",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "I've tried every beat maker out there. Nothing comes close to the quality and speed of Rhythm Machine Pro. My sets have never sounded better.",
    rating: 5,
  },
]

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger delay for each testimonial card
      delayChildren: 0.2, // Delay before children start animating
    },
  },
}

const cardVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.5,
    },
  },
}

const textVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function Testimonials() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Loved by
          <span className="bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
            {" "}
            Creators Worldwide
          </span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Join thousands of producers, DJs, and artists who are creating amazing music with Rhythm Machine Pro.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-card rounded-2xl p-8 border border-border hover:bg-card/90 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-foreground/5"
            variants={cardVariants}
          >
            <motion.div className="flex items-center mb-6" variants={textVariants}>
              {Array.from({ length: testimonial.rating }, (_, i) => (
                <SparklesIcon key={i} className="w-5 h-5 text-primary fill-current" /> // Using Sparkles as star
              ))}
            </motion.div>
            <motion.div variants={textVariants}>
              <MusicIcon className="w-8 h-8 text-primary mb-4" /> {/* Using MusicIcon as Quote placeholder */}
              <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
            </motion.div>
            <motion.div className="flex items-center" variants={textVariants}>
              <img
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4 transition-transform duration-300 group-hover:scale-105"
              />
              <div>
                <div className="text-foreground font-semibold">{testimonial.name}</div>
                <div className="text-muted-foreground text-sm">{testimonial.role}</div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
