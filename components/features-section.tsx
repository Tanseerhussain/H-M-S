"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Shield, Settings } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const features = [
  {
    icon: GraduationCap,
    title: "For Students",
    description: "Easy hostel booking, food complaints, help center, and leaving requests.",
    items: ["📌 Hostel Booking", "🍽️ Food Complaints", "🆘 Help Center", "🚪 Leaving Request"],
    link: "/dashboard/student",
  },
  {
    icon: Shield,
    title: "For Wardens",
    description: "Efficient management tools with approval workflows and real-time notifications.",
    items: ["✅ Approve/Reject Requests", "📢 Notifications", "📋 Complaints Management", "👥 Student Oversight"],
    link: "/dashboard/warden",
  },
  {
    icon: Settings,
    title: "For Administrators",
    description: "Comprehensive oversight with user management and hostel listings control.",
    items: ["🌐 Web Landing Page", "🏠 Manage Hostels", "👥 User Role Management", "📊 Analytics Dashboard"],
    link: "/dashboard/admin",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-12 sm:py-16 md:py-20 bg-muted/30">
      <div className="container-responsive">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-responsive-lg font-black text-balance mb-4">
            Powerful Features for Everyone
          </h2>
          <p className="text-responsive-base text-muted-foreground text-pretty max-w-2xl mx-auto">
            Role-based access ensures each user gets exactly what they need for efficient hostel management.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid-responsive-cards">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                rotate: -1,
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.25)",
              }}
              whileTap={{ scale: 0.98, rotate: 0 }}
              className="h-full"
            >
              <Card className="border-0 shadow-lg transition-all duration-300 h-full">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-accent/10">
                    <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold">{feature.title}</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2 mb-6 flex-1">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-xs sm:text-sm text-card-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={feature.link}>
                    <Button variant="outline" className="w-full bg-transparent text-sm">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
