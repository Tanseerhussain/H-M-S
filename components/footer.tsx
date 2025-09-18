import { Building2, Mail, Phone, Facebook, Twitter, Instagram, Linkedin, MapPin, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="border-b border-primary-foreground/10">
        <div className="container py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-primary-foreground/80 max-w-md">
                Get the latest updates about HMS features and hostel management tips delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:min-w-[400px]">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-secondary"
              />
              <Button variant="secondary" className="whitespace-nowrap">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-secondary p-2 rounded-lg">
                <Building2 className="h-8 w-8 text-secondary-foreground" />
              </div>
              <span className="text-3xl font-bold">HMS</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed text-lg">
              Revolutionizing hostel management with cutting-edge technology. Making hostel life seamless for students,
              efficient for wardens, and comprehensive for administrators.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-primary-foreground/80">
                <Clock className="h-5 w-5 text-secondary" />
                <span>24/7 Support Available</span>
              </div>
              <div className="flex items-center space-x-3 text-primary-foreground/80">
                <MapPin className="h-5 w-5 text-secondary" />
                <span>Serving hostels nationwide</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3 text-primary-foreground/90">Follow Us</p>
              <div className="flex space-x-3">
                <div className="bg-primary-foreground/10 hover:bg-secondary p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">
                  <Facebook className="h-5 w-5" />
                </div>
                <div className="bg-primary-foreground/10 hover:bg-secondary p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">
                  <Twitter className="h-5 w-5" />
                </div>
                <div className="bg-primary-foreground/10 hover:bg-secondary p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">
                  <Instagram className="h-5 w-5" />
                </div>
                <div className="bg-primary-foreground/10 hover:bg-secondary p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">
                  <Linkedin className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-6 text-secondary">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors duration-300 flex items-center group"
                >
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors duration-300 flex items-center group"
                >
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/student"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors duration-300 flex items-center group"
                >
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Student Portal
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/warden"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors duration-300 flex items-center group"
                >
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Warden Portal
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/admin"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors duration-300 flex items-center group"
                >
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Admin Portal
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-6 text-secondary">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-primary-foreground/80">
                <div className="bg-secondary/20 p-2 rounded-lg mt-1">
                  <Mail className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <p className="font-medium text-primary-foreground">Email Support</p>
                  <p className="text-sm">support@hms.com</p>
                  <p className="text-sm">admin@hms.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-primary-foreground/80">
                <div className="bg-secondary/20 p-2 rounded-lg mt-1">
                  <Phone className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <p className="font-medium text-primary-foreground">Phone Support</p>
                  <p className="text-sm">+91 98765 43210</p>
                  <p className="text-sm">+91 98765 43211</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary-foreground/5 rounded-lg border border-secondary/20">
              <p className="text-sm font-medium text-secondary mb-1">Support Hours</p>
              <p className="text-xs text-primary-foreground/80">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-xs text-primary-foreground/80">Emergency: 24/7 Available</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-primary-foreground/60">
              <p>&copy; 2024 HMS - Hostel Management System. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-secondary transition-colors">
                  Privacy Policy
                </a>
                <span>•</span>
                <a href="#" className="hover:text-secondary transition-colors">
                  Terms of Service
                </a>
                <span>•</span>
                <a href="#" className="hover:text-secondary transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
            <div className="text-sm text-primary-foreground/60">Made with ❤️ for better hostel management</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
