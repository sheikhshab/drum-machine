"use client"

import { motion } from "framer-motion"
import { SparklesIcon, DownloadIcon, UserIcon, ZapIcon, MusicIcon, HeadphonesIcon } from "@/components/soundcloud-icons"

const features = [
  {
    icon: SparklesIcon,
    title: "AI-Powered Generation",
    description:
      "Describe your beat in natural language and watch our AI create professional-quality rhythms instantly.",
  },
  {
    icon: MusicIcon,
    title: "15+ Music Genres",
    description: "From trap to jazz fusion, create beats in any style with genre-specific AI models and drum kits.",
  },
  {
    icon: DownloadIcon,
    title: "Professional Export",
    description: "Export your beats in WAV, MP3, or MIDI format. Perfect for DAWs, streaming, or live performance.",
  },
  {
    icon: UserIcon,
    title: "Real-time Collaboration",
    description: "Work with other producers in real-time. Share, remix, and build on each other's creations.",
  },
  {
    icon: ZapIcon,
    title: "Instant Creation",
    description: "Go from idea to finished beat in seconds. No music theory knowledge required.",
  },
  {
    icon: HeadphonesIcon,
    title: "Studio-Quality Sound",
    description: "Premium drum samples and AI mastering ensure your beats sound professional every time.",
  },
]

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger delay for each feature card
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

const iconVariants = {
  hidden: { scale: 0, rotate: 0, opacity: 0, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
  visible: {
    scale: 1,
    rotate: 360, // Full rotation
    opacity: 1,
    boxShadow: [
      "0px 0px 0px rgba(0,0,0,0)",
      "0px 0px 8px rgba(139, 92, 246, 0.7)", // Using gradient-start for glow
      "0px 0px 0px rgba(0,0,0,0)",
    ],
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
      duration: 0.4,
      boxShadow: {
        repeat: 1, // Pulse once
        repeatType: "reverse",
        duration: 0.5,
        ease: "easeOut",
      },
    },
  },
  hover: {
    scale: 1.1,
    rotate: 15, // Slight rotation on hover
    filter: "brightness(1.2)", // Brighter color
    boxShadow: "0px 0px 15px rgba(139, 92, 246, 0.9), 0px 0px 0px 5px rgba(255, 255, 255, 0.2)", // Outer ring
    transition: { duration: 0.3 },
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

export default function Features() {
  return (
    <div className="max-w-7xl mx-auto bg-radial-gradient">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Everything You Need to Create
          <span className="bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
            {" "}
            Amazing Beats
          </span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Powerful AI technology meets intuitive design to give you the ultimate beat creation experience.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of component is in view
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-card rounded-2xl p-8 border border-border hover:bg-card/90 transition-all duration-300 group transform hover:scale-[1.02] hover:shadow-xl hover:shadow-foreground/5"
            variants={cardVariants}
          >
            <motion.div
              className="bg-gradient-to-r from-gradient-start to-gradient-end w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6"
              variants={iconVariants}
              whileHover="hover"
            >
              <feature.icon className="w-6 h-6 text-foreground" />
            </motion.div>
            <motion.h3 className="text-xl font-semibold text-foreground mb-4" variants={textVariants}>
              {feature.title}
            </motion.h3>
            <motion.p
              className="text-muted-foreground leading-relaxed"
              variants={textVariants}
              transition={{ delay: 0.1 }} // Description text follows title
            >
              {feature.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
