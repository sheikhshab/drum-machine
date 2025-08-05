"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SparklesIcon, MusicIcon, HeadphonesIcon } from "@/components/soundcloud-icons"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: ["5 beats per month", "Basic drum kits", "MP3 export only", "Community support", "Watermarked exports"],
    cta: "Start Free",
    popular: false,
    icon: MusicIcon,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "per month",
    description: "For serious beat makers",
    features: [
      "Unlimited beats",
      "Premium drum kits",
      "All export formats (WAV, MP3, MIDI)",
      "No watermarks",
      "Cloud storage",
      "Priority support",
      "Advanced AI features",
    ],
    cta: "Start Pro Trial",
    popular: true,
    icon: SparklesIcon,
  },
  {
    name: "Studio",
    price: "$24.99",
    period: "per month",
    description: "For professional producers",
    features: [
      "Everything in Pro",
      "Real-time collaboration",
      "Commercial license",
      "Advanced editor tools",
      "Custom drum kit uploads",
      "API access",
      "White-label options",
      "Dedicated support",
    ],
    cta: "Start Studio Trial",
    popular: false,
    icon: HeadphonesIcon,
  },
]

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger delay for each plan card
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
  hidden: { scale: 0, rotate: 0, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 360,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
      duration: 0.4,
    },
  },
  hover: {
    scale: 1.1,
    rotate: 15,
    filter: "brightness(1.2)",
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

export default function Pricing() {
  return (
    <div className="max-w-7xl mx-auto star-background">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Choose Your
          <span className="bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
            {" "}
            Creative Plan
          </span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Start free and upgrade as your beat-making journey grows. All plans include our core AI technology.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className={`relative bg-card rounded-2xl p-8 border transition-all duration-300 hover:scale-[1.02] ${
              plan.popular
                ? "border-primary bg-card/90 shadow-2xl shadow-primary/20"
                : "border-border hover:border-border/30 hover:shadow-xl hover:shadow-foreground/5"
            }`}
            variants={cardVariants}
          >
            {plan.popular && (
              <motion.div
                className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="bg-gradient-to-r from-gradient-start to-gradient-end text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                  Most Popular
                </div>
              </motion.div>
            )}

            <div className="text-center mb-8">
              {plan.icon && (
                <motion.div
                  className="bg-gradient-to-r from-gradient-start to-gradient-end w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <plan.icon className="w-6 h-6 text-foreground" />
                </motion.div>
              )}
              <motion.h3 className="text-2xl font-bold text-foreground mb-2" variants={textVariants}>
                {plan.name}
              </motion.h3>
              <motion.div className="mb-2" variants={textVariants}>
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground ml-2">{plan.period}</span>
              </motion.div>
              <motion.p className="text-muted-foreground" variants={textVariants}>
                {plan.description}
              </motion.p>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <motion.li
                  key={featureIndex}
                  className="flex items-center text-muted-foreground"
                  variants={textVariants}
                >
                  <SparklesIcon className="w-5 h-5 text-primary mr-3 flex-shrink-0" />{" "}
                  {/* Using Sparkles as checkmark */}
                  {feature}
                </motion.li>
              ))}
            </ul>

            <Link href="/signup">
              <Button
                className={`w-full py-3 rounded-md font-semibold transition-all duration-300 transform hover:scale-[1.01] active:scale-99 ${
                  plan.popular
                    ? "bg-gradient-to-r from-gradient-start to-gradient-end hover:from-gradient-start/80 hover:to-gradient-end/80 text-primary-foreground shadow-lg"
                    : "bg-secondary hover:bg-secondary/80 text-foreground border border-border shadow-md"
                }`}
              >
                {plan.cta}
              </Button>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center mt-12">
        <p className="text-muted-foreground mb-4">All plans include 14-day free trial • No credit card required</p>
        <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <span className="transition-all duration-200 hover:text-foreground">✓ Cancel anytime</span>
          <span className="transition-all duration-200 hover:text-foreground">✓ 30-day money back guarantee</span>
          <span className="transition-all duration-200 hover:text-foreground">✓ Secure payments</span>
        </div>
      </div>
    </div>
  )
}
