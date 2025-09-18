import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

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
          <h1 className="text-responsive-xl font-black text-balance mb-4 sm:mb-6 leading-tight">
            Streamline Your <span className="text-accent">Hostel Experience</span>
          </h1>
          <p className="text-responsive-base text-muted-foreground text-pretty mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto">
            The modern digital platform that simplifies hostel operations for students, wardens, and administrators.
            Real-time communication, secure data handling, and seamless role-based access.
          </p>
          <div className="flex-responsive-center max-w-md mx-auto">
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
          </div>
        </div>
      </div>
    </section>
  )
}
