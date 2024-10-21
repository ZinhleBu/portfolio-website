/** @format */

import H1 from "@/components/ui/h1";
import React from "react";
import Image from "next/image";
import image1 from "@/assets/image1.jpg";
import image2 from "@/assets/image2.jpg";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

export default function ServicesPage() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        {" "}
        <div className="flex flex-col m-auto items-center justify-center gap-5 pt-9">
        <H1 className=" text-5xl md:text-6xl  font-medium text-center max-w-[64rem]">
            <span>Explore</span>{" "}
            <span className="text-gray-400">My Offerings</span>{" "}
            <span>for You.</span>
          </H1>
          <p className="font-light text-center">
            Embark on a Design Journey: Discover Tailored SolutionsInfused with
            Passion,Precition and <br /> Purpose to Shape Tommorrows
            Experiences.
          </p>
          <div className="flex flex-col md:flex-row gap-5 mt-4 pt-4 md:items-start items-center justify-center mb-7">
            <Image
              src={image1}
              alt="about image"
              width={500}
              height={500}
              className="aspect-square h-fit flex-none rounded-xl bg-secondary object-cover"
            />
            <div className="flex flex-col gap-6 ml-5 justify-start ">
              <H1 className="text-3xl font-light tracking-tight top-0">
                Clear and Simple.
              </H1>
              <div className="font-extralight text-md text-gray-600">
                {" "}
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Dolores maiores veritatis dolorum alias amet ab soluta,
                consequuntur eius ex exercitationem, provident quisquam qui
                tempore. Eaque dolorem facilis asperiores quas totam!
                <br />
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Dolores maiores veritatis dolorum alias amet ab soluta,
                consequuntur eius ex exercitationem, provident quisquam qui
                tempore. Eaque dolorem facilis asperiores quas totam!
                <div className="flex flex-row gap-5 mt-4 pt-4">
                  <Button
                    variant="default"
                    className="text-white hover:text-muted-foreground text-sm font-normal bg-blue-600 rounded-3xl px-5 py-5"
                  >
                    <Link href="/contact" className="flex">
                      Let&apos;s Talk
                      <ArrowRightIcon size={16} className="ms-2" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="text-sm font-normal rounded-3xl px-5 py-5 border-gray-400"
                  >
                    <Link href="/contact" className="flex">
                      Learn more
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-5 mt-4 pt-4 md:items-start items-center justify-center">
          
            <div className="flex flex-col gap-6 ml-5 justify-start ">
              <H1 className="text-3xl font-light tracking-tight top-0">
               Responsive <br />
               Web Design
              </H1>
              <div className="font-extralight text-md text-gray-600">
                {" "}
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Dolores maiores veritatis dolorum alias amet ab soluta,
                consequuntur eius ex exercitationem, provident quisquam qui
                tempore. Eaque dolorem facilis asperiores quas totam!
                <br />
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Dolores maiores veritatis dolorum alias amet ab soluta,
                consequuntur eius ex exercitationem, provident quisquam qui
                tempore. Eaque dolorem facilis asperiores quas totam!
                <div className="flex flex-row gap-5 mt-4 pt-4">
                  <Button
                    variant="default"
                    className="text-white hover:text-muted-foreground text-sm font-normal bg-blue-600 rounded-3xl px-5 py-5"
                  >
                    <Link href="/portfolio" className="flex">
                      My Portfolio
                      <ArrowRightIcon size={16} className="ms-2" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="text-sm font-normal rounded-3xl px-5 py-5 border-gray-400"
                  >
                    <Link href="/contact" className="flex">
                      Learn more
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <Image
              src={image2}
              alt="about image"
              width={500}
              height={500}
              className="aspect-square h-fit flex-none rounded-xl bg-secondary object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
