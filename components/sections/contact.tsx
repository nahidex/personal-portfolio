"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { sendEmail } from "@/app/actions/sendEmail";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const result = await sendEmail(data);

      if (result.success) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-gray-bg rounded-t-2xl py-32">
      <div className="container mx-auto px-8 max-w-4xl">
        {/* Section Title */}
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-[clamp(48px,6vw,90px)] font-medium tracking-[-0.03em] leading-[1]">
            <span className="text-black/20">Got a Project?</span>
            <br />
            <span>Let&apos;s Jam</span>
          </h2>
        </div>

        {/* Email Display */}
        <div className="mb-16 text-center">
          <a
            href="mailto:hi@nahid.design"
            className="text-[clamp(64px,10vw,173px)] font-medium tracking-[-0.03em] leading-[0.74] hover:text-primary transition-colors inline-block"
          >
            hi@nahid.design
          </a>
        </div>

        {/* Availability Badge */}
        <div className="mb-16 flex items-center justify-center gap-2 text-2xl text-black/20">
          <span className="text-accent">✺</span>
          <p>
            I am available for freelance projects / contractual or full-time job
            opportunity
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Input
                {...register("name")}
                placeholder="Your Name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register("email")}
                type="email"
                placeholder="Your Email"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Textarea
              {...register("message")}
              placeholder="Your Message"
              className={errors.message ? "border-red-500" : ""}
            />
            {errors.message && (
              <p className="mt-2 text-sm text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center gap-4">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="min-w-[200px]"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>

            {submitStatus === "success" && (
              <p className="text-primary text-center">
                ✓ Message sent successfully! I&apos;ll get back to you soon.
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-500 text-center">
                ✗ Failed to send message. Please try again or email directly.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
