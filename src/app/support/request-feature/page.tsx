"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "sonner";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const featureCategories = [
  { id: "ui", label: "User Interface" },
  { id: "functionality", label: "Functionality" },
  { id: "integration", label: "Integration" },
  { id: "performance", label: "Performance" },
  { id: "other", label: "Other" },
];

export default function RequestFeaturePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    featureName: "",
    description: "",
    useCase: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/feature-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feature request");
      }

      toast.success("Feature request submitted successfully! We'll review it and get back to you.");
      setFormData({
        name: "",
        email: "",
        category: "",
        featureName: "",
        description: "",
        useCase: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit feature request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-20" role="main">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Request a Feature</h1>
          <p className="text-lg text-gray-600">
            We're always looking for ways to improve our platform. If you have an idea for a new feature, please let us know.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <form onSubmit={handleSubmit} className="space-y-8" aria-label="Feature request form" noValidate>
            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Your Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name{" "}
                    <span className="text-red-500" aria-hidden="true">
                      *
                    </span>
                  </Label>
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
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email{" "}
                    <span className="text-red-500" aria-hidden="true">
                      *
                    </span>
                  </Label>
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
              </div>
            </div>

            {/* Feature Details */}
            <div>
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Feature Details</h2>
                <div className=" flex flex-col md:flex-row gap-4 my-4">
                  <div className=" w-full">
                    <Label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category{" "}
                      <span className="text-red-500" aria-hidden="true">
                        *
                      </span>
                    </Label>
                    <Select value={formData.category} onValueChange={(value: string) => setFormData((prev) => ({ ...prev, category: value }))} required>
                      <SelectTrigger id="category" className="w-full shadow-none">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {featureCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full">
                    <Label htmlFor="featureName" className="block text-sm font-medium text-gray-700 mb-1">
                      Feature Name{" "}
                      <span className="text-red-500" aria-hidden="true">
                        *
                      </span>
                    </Label>
                    <Input
                      id="featureName"
                      name="featureName"
                      value={formData.featureName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, featureName: e.target.value }))}
                      required
                      placeholder="What would you call this feature?"
                      className="w-full"
                      aria-required="true"
                    />
                  </div>
                </div>
              </div>

              <div className=" mb-4">
                <Label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  required
                  placeholder="Describe the feature in detail..."
                  className="w-full min-h-[120px]"
                  aria-required="true"
                />
              </div>

              <div>
                <Label htmlFor="useCase" className="block text-sm font-medium text-gray-700 mb-1">
                  Use Case{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Textarea
                  id="useCase"
                  name="useCase"
                  value={formData.useCase}
                  onChange={(e) => setFormData((prev) => ({ ...prev, useCase: e.target.value }))}
                  required
                  placeholder="How would you use this feature? What problem would it solve?"
                  className="w-full min-h-[120px]"
                  aria-required="true"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full"
                disabled={
                  isLoading || !formData.name || !formData.email || !formData.category || !formData.featureName || !formData.description || !formData.useCase
                }
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icon icon="eos-icons:loading" className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    <span>Submit Feature Request</span>
                  </>
                )}
              </Button>

              <p className="text-sm text-gray-600 text-center">
                Need help?{" "}
                <Link href="/support/contact" className="text-primary hover:underline">
                  Contact our support team
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
