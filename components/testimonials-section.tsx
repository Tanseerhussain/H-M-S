"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Zara",
    role: "Computer Science Student",
    content:
      "HMS made hostel booking so simple! I can file complaints and get help instantly. The app is intuitive and saves so much time.",
    rating: 5,
    avatar: "/young-pak-female-student-smiling.jpg",
  },
  {
    name: "Haider",
    role: "Hostel Warden",
    content:
      "Managing student requests has never been easier. The notification system keeps me updated, and I can approve requests on the go.",
    rating: 5,
    avatar: "/middle-aged-pak-male-professional.jpg",
  },
  {
    name: "Dr.Ayesha Khan",
    role: "Hostel Administrator",
    content:
      "The analytics dashboard gives me complete oversight of all hostel operations. User management is seamless and efficient.",
    rating: 5,
    avatar: "/professional-pak-female-administrator.jpg",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black text-balance mb-4">
            Trusted by Students & Staff
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            See what our users say about their experience with HMS.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
              }}
              whileTap={{ scale: 0.97 }}
              className="h-full"
            >
              <Card className="border-0 shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-6">
                  {/* Stars */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-card-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold text-card-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
