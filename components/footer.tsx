import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative bg-black text-primary-foreground shadow-inner"
    >
      {/* ---------------- Footer Grid ---------------- */}
<section className="container py-10 md:py-12 px-4 md:px-6 lg:px-8">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-center lg:text-left">
    
    {/* Brand + Description */}
    <div className="lg:col-span-2">
      <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
        <div className="bg-secondary p-2 rounded-lg shadow-md">
          <span className="text-2xl">🏢</span>
        </div>
        <span className="text-2xl font-bold">HMS</span>
      </div>
      <p className="text-primary-foreground/80 mb-4 leading-relaxed text-base">
        Revolutionizing hostel management with cutting-edge technology. Making hostel life seamless for students,
        efficient for wardens, and comprehensive for administrators.
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-center lg:justify-start space-x-2 text-primary-foreground/80 text-sm">
          <span className="text-secondary">🕒</span>
          <span>24/7 Support Available</span>
        </div>
        <div className="flex items-center justify-center lg:justify-start space-x-2 text-primary-foreground/80 text-sm">
          <span className="text-secondary">📍</span>
          <span>Serving hostels nationwide</span>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold mb-2 text-primary-foreground/90">Follow Us</p>
        <div className="flex justify-center lg:justify-start space-x-2">
          {["📘", "🐦", "📷", "💼"].map((icon, i) => (
            <div
              key={i}
              className="bg-primary-foreground/10 hover:bg-secondary p-2 rounded-md cursor-pointer transition-all duration-300 hover:scale-105 shadow-sm"
            >
              <span>{icon}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="font-bold text-lg mb-4 text-secondary">Quick Links</h3>
      <ul className="space-y-2">
        {[
          { label: "Features", href: "#features" },
          { label: "About Us", href: "#about" },
          { label: "Student Portal", href: "/dashboard/student" },
          { label: "Warden Portal", href: "/dashboard/warden" },
          { label: "Admin Portal", href: "/dashboard/admin" },
        ].map((link, i) => (
          <li key={i}>
            <a
              href={link.href}
              className="text-primary-foreground/80 hover:text-secondary transition-colors duration-300 flex items-center justify-center lg:justify-start group text-sm"
            >
              <span className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <h3 className="font-bold text-lg mb-4 text-secondary">Contact Info</h3>
      <div className="space-y-3">
        <div className="flex items-start justify-center lg:justify-start space-x-2 text-primary-foreground/80 text-sm">
          <div className="bg-secondary/20 p-2 rounded-md shadow-sm">
            <span className="text-secondary">✉️</span>
          </div>
          <div className="text-left">
            <p className="font-medium text-primary-foreground">Email Support</p>
            <p>support@hms.com</p>
            <p>admin@hms.com</p>
          </div>
        </div>
        <div className="flex items-start justify-center lg:justify-start space-x-2 text-primary-foreground/80 text-sm">
          <div className="bg-secondary/20 p-2 rounded-md shadow-sm">
            <span className="text-secondary">📞</span>
          </div>
          <div className="text-left">
            <p className="font-medium text-primary-foreground">Phone Support</p>
            <p>+91 98765 43210</p>
            <p>+91 98765 43211</p>
          </div>
        </div>
      </div>

      <div className="mt-3 p-4 w-full bg-primary-foreground/5 rounded-lg border border-secondary/20 shadow-md text-sm">
        <p className="font-medium text-secondary mb-1">Support Hours</p>
        <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
        <p>Emergency: 24/7 Available</p>
      </div>
    </div>
  </div>
</section>


      {/* ---------------- Bottom Bar ---------------- */}
<section className="border-t border-primary-foreground/10 bg-zinc-900 backdrop-blur-sm shadow-inner">
  <div className="container py-8 px-4">
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6">
      
      {/* Left Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-primary-foreground/60 text-center md:text-left">
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

      {/* Right Section */}
      <div className="text-sm text-primary-foreground/60 text-center md:text-right">
        Made with ❤️ for better hostel management
      </div>
    </div>
  </div>
</section>

    </footer>
  )
}
