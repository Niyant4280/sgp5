import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Bus,
  MessageCircle,
  HeadphonesIcon,
  Globe,
  Heart,
} from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setLoading(false);

    alert("Thank you! Your message has been sent successfully.");
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "contact@busनियोजक.com",
      description: "Get in touch via email",
      color: "text-primary",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+91-9876-543-210",
      description: "24/7 customer support",
      color: "text-accent",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "New Delhi, India",
      description: "Our headquarters",
      color: "text-primary",
    },
    {
      icon: Clock,
      title: "Office Hours",
      value: "Mon-Fri 9AM-6PM",
      description: "Business hours",
      color: "text-accent",
    },
  ];

  const supportTypes = [
    {
      icon: Bus,
      title: "Bus Operations",
      description: "Route queries, schedule information, and bus tracking",
      email: "operations@busनियोजक.com",
    },
    {
      icon: HeadphonesIcon,
      title: "Technical Support",
      description: "App issues, website problems, and technical assistance",
      email: "support@busनियोजक.com",
    },
    {
      icon: MessageCircle,
      title: "General Inquiries",
      description: "General questions, feedback, and suggestions",
      email: "hello@busनियोजक.com",
    },
    {
      icon: Globe,
      title: "Partnership",
      description: "Business partnerships and collaboration opportunities",
      email: "partnership@busनियोजक.com",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-gray-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
              Get in <span className="text-primary wavy-underline">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Have questions about <span className="text-black dark:text-white font-semibold">Bus</span><span className="text-red-600 dark:text-red-400 font-semibold">नियोजक</span>? Need support? Want to partner with us? We're here to help and excited to connect with you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-background dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center border-0 shadow-lg bg-white/90 dark:bg-gray-900/80 transition-shadow hover:shadow-2xl rounded-2xl">
                <CardContent className="pt-10 pb-8">
                  <div className={`bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-full p-5 w-20 h-20 mx-auto mb-5 flex items-center justify-center shadow-md`}>
                    <info.icon className={`h-9 w-9 ${info.color}`} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground dark:text-white">{info.title}</h3>
                  <p className="text-foreground font-medium mb-1 dark:text-gray-200">
                    {info.value}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {info.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-primary/10 dark:from-gray-900 dark:to-primary/10 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center space-x-3">
                    <div className="bg-primary text-primary-foreground p-3 rounded-lg shadow-md">
                      <Send className="h-6 w-6" />
                    </div>
                    <span>Send us a Message</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="What's this about?"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        disabled={loading}
                        rows={6}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full shadow-md hover:shadow-xl transition-all duration-200 rounded-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Support Types */}
            <div className="space-y-6">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground dark:text-white mb-4">
                  Choose Your Support Type
                </h2>
                <p className="text-muted-foreground">
                  Select the most appropriate category for faster assistance
                </p>
              </div>

              {supportTypes.map((type, index) => (
                <Card
                  key={index}
                  className="shadow-lg border-0 bg-white/90 dark:bg-gray-900/80 hover:shadow-2xl transition-all duration-300 rounded-2xl"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-br from-primary to-accent text-white p-4 rounded-xl shadow-md flex-shrink-0">
                        <type.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-2 text-foreground dark:text-white">{type.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          {type.description}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-primary">
                            {type.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How accurate is the real-time bus tracking?",
                answer:
                  "Our GPS tracking system provides location updates every 30 seconds with an accuracy of ±10 meters, ensuring you get the most reliable arrival predictions.",
              },
              {
                question: "Is the Bus नियोजक service free to use?",
                answer:
                  "Yes! Our basic bus tracking and route finding services are completely free for all passengers. We also offer premium features for enhanced experience.",
              },
              {
                question: "How can I report a bus delay or issue?",
                answer:
                  "You can report issues directly through our app, website contact form, or by calling our support line. We respond to all reports within 2 hours.",
              },
              {
                question: "Do you cover all bus routes in the city?",
                answer:
                  "We're constantly expanding our coverage. Currently, we track 50+ major routes and are adding new routes every month based on user demand.",
              },
            ].map((faq, index) => (
              <Card key={index} className="shadow-lg border-0 bg-white/90 dark:bg-gray-900/80 rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3 text-primary">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Immediate Help?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            For urgent issues or emergencies, contact us directly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="shadow-md hover:shadow-xl transition-all duration-200 rounded-lg"
              asChild
            >
              <a href="tel:+919876543210">
                <Phone className="h-5 w-5 mr-2" />
                Emergency Helpline
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary shadow-md hover:shadow-xl transition-all duration-200 rounded-lg"
              asChild
            >
              <a href="mailto:emergency@busनियोजक.com">
                <Mail className="h-5 w-5 mr-2" />
                Emergency Email
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
