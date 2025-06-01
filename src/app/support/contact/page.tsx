"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "sonner";
import Link from "next/link";

const initialFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData(initialFormData);
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-accent/10 to-transparent py-20" role="main">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Have a question or need help? We're here to assist you. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                  placeholder="Your name"
                  className="w-full"
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                  placeholder="your.email@example.com"
                  className="w-full"
                  aria-required="true"
                  aria-describedby="email-format"
                />
                <p id="email-format" className="sr-only">
                  Please enter a valid email address
                </p>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  required
                  placeholder="What is this regarding?"
                  className="w-full"
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  required
                  placeholder="How can we help you?"
                  className="w-full min-h-[150px]"
                  aria-required="true"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading} aria-busy={isLoading}>
                {isLoading ? (
                  <>
                    <Icon icon="eos-icons:loading" className="mr-2 h-6 w-6 animate-spin" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4"
            role="complementary"
            aria-label="Contact information"
          >
            <section className="space-y-8">
              <div>
                <h4 className="text-lg font-semibold">Chat with us</h4>
                <p className="text-slate-600">Speak to our team via Email or Whatsapp</p>
                <ul>
                  <li className="mt-2 font-semibold flex items-center gap-3 underline">
                    <Icon icon="ph:telegram-logo-thin" className="size-4" />
                    <Link href="mailto:info.jedvotes@gmail.com">Shoot us an email</Link>
                  </li>
                  <li className="mt-2 font-semibold flex items-center gap-3 underline">
                    <Icon icon="ic:baseline-whatsapp" width={16} />
                    <a href="https://wa.me/+233599774425">+233 (599) 774-425</a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold">Call us</h4>
                <p className="text-slate-600">Call our team Sun-Sat from 8am to 5pm</p>
                <ul>
                  <li className="mt-2 font-semibold flex items-center gap-3 underline">
                    <Icon icon="ph:phone-call" className="size-5" />
                    <Link href="tel:+233599774425">+233 (599) 774-425</Link>
                  </li>
                  <li className="mt-2 font-semibold flex items-center gap-3 underline">
                    <Icon icon="ph:phone-call" className="size-5" />
                    <Link href="tel:+233538122885">+233 (538) 122-885</Link>
                  </li>
                  <li className="mt-2 font-semibold flex items-center gap-3 underline">
                    <Icon icon="ph:phone-call" className="size-5" />
                    <Link href="tel:+233559237619">+233 (559) 237-619</Link>
                  </li>
                  <li className="mt-2 font-semibold flex items-center gap-3 underline">
                    <Icon icon="ph:phone-call" className="size-5" />
                    <Link href="tel:+233594054494">+233 (594) 054-494</Link>
                  </li>
                </ul>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
