import { AuthNavbar } from "@/components/auth-navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { DownloadSection } from "@/components/download-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <AuthNavbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <DownloadSection />
      <Footer />
    </main>
  )
}
