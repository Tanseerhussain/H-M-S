import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-balance mb-4">Trusted by Students & Staff</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            See what our users say about their experience with HMS.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-card-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-card-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
