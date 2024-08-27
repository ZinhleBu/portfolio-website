import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";


interface NavItemsProps {
  className?: string;
}

export default async function NavItems({ className }: NavItemsProps) {
  const { user } = await validateRequest();

  if (!user) return null;


  return (
    <div className={className}>
     <Button
        variant="ghost"
        className="flex items-center justify-start gap-3 md:mt-3"
        title="Home"
        asChild
      >
        <Link href="/">
          <span className="hidden md:inline">Home</span>
        </Link>
      </Button>

      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="About"
        asChild
      >
        <Link href="/about">
          <span className="hidden md:inline">About</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Services"
        asChild
      >
        <Link href="/services">
          <span className="hidden md:inline">Services</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Portfolio"
        asChild
      >
        <Link href="/portfolio">
          <span className="hidden md:inline">Portfolio</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Resources"
        asChild
      >
        <Link href="/resources">
          <span className="hidden md:inline">Resources</span>
        </Link>
      </Button>
    </div>
  );
}
