"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MusicIcon } from "@/components/soundcloud-icons"

const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Footer() {
  return (
    <motion.footer
      className="bg-background/20 backdrop-blur-md border-t border-border py-12 px-8 text-foreground"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <motion.div variants={itemVariants}>
          <Link
            href="/"
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-200 mb-4"
          >
            <MusicIcon className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">Rhythm Machine Pro</span>
          </Link>
          <p className="text-muted-foreground text-sm">AI-powered beat generation for creators worldwide.</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link href="/generator" className="hover:text-primary transition-colors duration-200">
                AI Generator
              </Link>
            </li>
            <li>
              <Link href="/library" className="hover:text-primary transition-colors duration-200">
                Beat Library
              </Link>
            </li>
            <li>
              <Link href="/collaborate" className="hover:text-primary transition-colors duration-200">
                Collaboration
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-primary transition-colors duration-200">
                Pricing
              </Link>
            </li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link href="/about" className="hover:text-primary transition-colors duration-200">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-primary transition-colors duration-200">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-primary transition-colors duration-200">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary transition-colors duration-200">
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link href="/privacy" className="hover:text-primary transition-colors duration-200">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-primary transition-colors duration-200">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-primary transition-colors duration-200">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        className="mt-12 pt-8 border-t border-border text-center text-muted-foreground text-sm"
        variants={itemVariants}
      >
        &copy; {new Date().getFullYear()} Rhythm Machine Pro. All rights reserved.
      </motion.div>
    </motion.footer>
  )
}
