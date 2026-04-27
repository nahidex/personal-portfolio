"use server";

import { Resend } from "resend";
import { ContactEmail } from "@/emails/contact-email";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailData {
  name: string;
  email: string;
  message: string;
}

export async function sendEmail(data: SendEmailData) {
  try {
    const { name, email, message } = data;

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Replace with your verified domain
      to: ["hi@nahid.design"], // Replace with your email
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      react: ContactEmail({ name, email, message }),
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Server error:", error);
    return { success: false, error: "Failed to send email" };
  }
}
