"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/diverse-group-of-students-in-modern-hostel-common-.jpg"
          alt="Students in hostel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="container-responsive relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-responsive-xl font-black text-balance mb-4 sm:mb-6 leading-tight"
          >
            Streamline Your <span className="text-accent">Hostel Experience</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-responsive-base text-muted-foreground text-pretty mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto"
          >
            The modern digital platform that simplifies hostel operations for students, wardens, and administrators.
            Real-time communication, secure data handling, and seamless role-based access.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-responsive-center max-w-md mx-auto"
          >
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent w-full sm:w-auto"
            >
              <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
