import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactFormEmail } from "@/components/emails/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

// const emails = ["addodiabene69@gmail.com", "info.jedvotes@gmail.com", "ellaboevans@gmail.com", "asantekwasi101@gmail.com", "owusujoshua209@gmail.com"];

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "Yaw from JED <contact@info.jed-event.com>",
      to: "owusujoshua209@gmail.com",
      subject: `New Contact Form Submission: ${subject}`,
      react: ContactFormEmail({
        name,
        email,
        subject,
        message,
      }),
    });

    if (error) {
      console.error("Failed to send email:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ message: "Email sent successfully", data }, { status: 200 });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
