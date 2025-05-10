import { NextResponse } from "next/server";
import { Resend } from "resend";
import { FeatureRequestEmail } from "@/components/emails/feature-request";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, category, featureName, description, useCase } = await request.json();

    if (!name || !email || !category || !featureName || !description || !useCase) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "Yaw from JED <contact@info.jed-event.com>",
      to: "owusujoshua209@gmail.com",
      subject: `New Feature Request: ${featureName}`,
      react: FeatureRequestEmail({
        name,
        email,
        category,
        featureName,
        description,
        useCase,
      }),
    });

    if (error) {
      console.error("Failed to send email:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ message: "Feature request submitted successfully", data }, { status: 200 });
  } catch (error) {
    console.error("Error processing feature request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
