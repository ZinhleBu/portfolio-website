/** @format */

import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";
import { EmailForm } from "./forms/EmailForm";
const socials = [
  {
    id: 1,
    socialName: "GitHub",
    link: "https://github.com/ZinhleBu",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-github"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    id: 2,
    socialName: "Twitter",
    link: "https://x.com/ZinhleBuhlungu",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-twitter"
      >
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    id: 3,
    socialName: "LinkedIn",
    link: "https://www.linkedin.com/in/zinhle-buhlungu-970010148/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-linkedin"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];
export default function Footer() {
  return (
    <div className="flex flex-col mt-20 p-6 bg-black w-full ">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-3  border-b border-b-gray-300">
        <p className="text-white text-lg font-bold mb-7 ">
          Stay connected w/ me.
        </p>
        <div className="text-white text-lg font-medium mb-7 ">
          <EmailForm/>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-3  border-b border-b-gray-300">
        <div className="flex flex-col gap-5 ">
          <h3 className="text-white text-2xl font-extrabold ">ZB</h3>
          <p className="text-muted-foreground text-md font-extralight mb-7 ">
            Im Zinhle, a Software Developer with 5+ years of experience. <br />I
            love to build and design.
          </p>
        </div>
        <div className="flex px-3 gap-3 items-center justify-between ">
          {socials.map((social, index) => (
            <Link key={index} href={social.link} target="_blank">
              <span className="text-white h-10 w-10 rounded-full bg-background ">
                {social.icon}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-3 ">
        <p className="text-white text-sm font-light ">
          @2024 All Rights Reservedby Zinhle Buhlungu.
        </p>
        <div className="flex gap-5  text-white text-sm font-extralight  ">
            <Link href="#" >Terms of Service</Link> 
            <Link href="#" >Privacy Policy</Link> 
        </div>
      </div>
    </div>
  );
}
