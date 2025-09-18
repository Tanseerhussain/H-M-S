"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, MessageCircle, Phone, Mail } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "How do I book a hostel room?",
    answer:
      "Go to the Hostel Booking section, browse available hostels, select your preferred option, fill in the booking details, and submit your request. You'll receive a confirmation email once approved.",
  },
  {
    id: 2,
    question: "What documents are required for hostel admission?",
    answer:
      "You need to provide: Student ID card, Admission letter, Identity proof (Aadhar/Passport), Address proof, Medical certificate, and passport-size photographs.",
  },
  {
    id: 3,
    question: "How can I submit a food complaint?",
    answer:
      "Visit the Food Complaints section, click 'New Complaint', select the appropriate category, provide a detailed description, and submit. You can track the status of your complaint in the same section.",
  },
  {
    id: 4,
    question: "What are the hostel timings and rules?",
    answer:
      "General timings: Entry until 10 PM, Mess timings: Breakfast 7-9 AM, Lunch 12-2 PM, Dinner 7-9 PM. Visitors allowed until 8 PM. No loud music after 10 PM.",
  },
  {
    id: 5,
    question: "How do I request to leave the hostel?",
    answer:
      "Go to Leaving Request section, fill out the form with your reason and preferred date, submit required documents, and wait for warden approval. Notice period is typically 30 days.",
  },
]

const supportTickets = [
  {
    id: 1,
    title: "WiFi Connection Issues",
    status: "open",
    priority: "medium",
    date: "2024-01-15",
    lastUpdate: "2024-01-16",
  },
  {
    id: 2,
    title: "Room Key Replacement",
    status: "resolved",
    priority: "high",
    date: "2024-01-10",
    lastUpdate: "2024-01-12",
  },
]

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showTicketForm, setShowTicketForm] = useState(false)
  const [newTicket, setNewTicket] = useState({
    title: "",
    category: "",
    priority: "",
    description: "",
  })

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleTicketSubmit = () => {
    if (newTicket.title && newTicket.category && newTicket.description) {
      alert("Support ticket submitted successfully! You'll receive updates via email.")
      setNewTicket({ title: "", category: "", priority: "", description: "" })
      setShowTicketForm(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Help Center</h1>
          <p className="text-gray-600">Find answers to common questions or get personalized support</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search */}
            <Card>
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search for help articles..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* FAQs */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs.map((faq) => (
                    <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Support Ticket Form */}
            {showTicketForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Create Support Ticket</CardTitle>
                  <CardDescription>Can't find what you're looking for? Create a support ticket</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="ticket-title">Issue Title</Label>
                    <Input
                      id="ticket-title"
                      placeholder="Brief description of your issue"
                      value={newTicket.title}
                      onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={newTicket.category}
                        onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                      >
                        <option value="">Select category</option>
                        <option value="technical">Technical Issues</option>
                        <option value="booking">Booking Problems</option>
                        <option value="payment">Payment Issues</option>
                        <option value="facilities">Facility Problems</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={newTicket.priority}
                        onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                      >
                        <option value="">Select priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide detailed description of your issue..."
                      rows={4}
                      value={newTicket.description}
                      onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleTicketSubmit}>Submit Ticket</Button>
                    <Button variant="outline" onClick={() => setShowTicketForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* My Support Tickets */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>My Support Tickets</CardTitle>
                    <CardDescription>Track your submitted support requests</CardDescription>
                  </div>
                  <Button onClick={() => setShowTicketForm(!showTicketForm)}>
                    {showTicketForm ? "Cancel" : "New Ticket"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <div key={ticket.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{ticket.title}</h3>
                        <Badge variant={ticket.status === "resolved" ? "default" : "secondary"}>{ticket.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Priority: {ticket.priority}</span>
                        <span>Created: {ticket.date}</span>
                        <span>Last Update: {ticket.lastUpdate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Get in touch with our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-indigo-600" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-gray-600">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-indigo-600" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-gray-600">support@hms.edu</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-indigo-600" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-gray-600">Available 24/7</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Hours */}
            <Card>
              <CardHeader>
                <CardTitle>Support Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Emergency Only</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
