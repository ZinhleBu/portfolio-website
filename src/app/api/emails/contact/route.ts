"use server";

import { Resend } from "resend";
import UserEmailTemplate from "@/components/email/UserEmail";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

  export const POST = async (req: Request) => {

    const { email } = await req.json();
    if (!email) return new NextResponse("Missing email", { status: 401 });

    try {
      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["delivered@resend.dev"],
        subject: "User Email address",
        react: UserEmailTemplate({
          email: email,
        }),
      });
  
      if (error) {
        return NextResponse.json(email), { status: error.message};
      }
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  };

