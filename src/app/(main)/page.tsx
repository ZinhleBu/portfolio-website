/** @format */

import { Button } from "@/components/ui/button";
import H1 from "@/components/ui/h1";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import heroImageLeft from "@/assets/1.jpg";
import heroImageRight from "@/assets/2.jpg";
import { designServices } from "../../lib/data";
import WorkBanner from "./WorkBanner";
import Link from "next/link";
import { JobExperienceList } from "./JobExperienceList";
export default function Home() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="flex flex-col m-auto items-center justify-center gap-5">
          <H1 className=" text-5xl md:text-6xl  font-medium text-center max-w-[64rem]">
            <span className="text-gray-400">I&apos;m Zinhle,</span>{" "}
            <span>
              A Full Stack Developer
              <br /> who loves perfect design and unique user experiences.
            </span>
          </H1>
          <div className="flex flex-row gap-5 mt-4 pt-4">
            <Button
              variant="default"
              className="text-white text-sm font-normal bg-blue-600 rounded-3xl px-5 py-5"
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
              My Services
            </Button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-4 pt-11 items-center justify-center gap-5">
          <Image
            src={heroImageLeft}
            alt="zinhle"
            width={400}
            height={700}
            className="aspect-auto h-fit flex-none rounded-xl bg-secondary object-cover"
          />
          <Image
            src={heroImageRight}
            alt="zinhle"
            width={900}
            height={700}
            className="aspect-auto h-fit flex-none rounded-xl bg-secondary object-cover"
          />
        </div>
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designServices.map((service, index) => (
            <div
              key={index}
              className="p-6 border border-gray-200 rounded-lg text-left"
            >
              <div className="flex flex-col items-start">
                <div className="mr-4">
                  <span>{service.icon}</span>
                </div>
                <h3 className="text-lg text-left font-semibold">
                  {service.title}
                </h3>
              </div>
              <p className="mt-2 text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row m-auto justify-between w-full gap-5 pt-9">
          <H1 className=" text-5xl md:text-6xl  font-medium text-center max-w-[64rem]">
            <span className="text-gray-400">Experiences</span>{" "}
            <span>
              with <br /> Passion, Precision <br /> and Purpose.
            </span>
          </H1>
          <div className="flex flex-col gap-5 mt-4 pt-4">
            <p className="font-light text-start max-w-[500px]">
              When Every Pixel Tells a Story: Crafting Tailored Solutions with
              Expertise in User Experience Design, Interface Design and
              Prototyping to Elevate Your Digital Presence And Creating Lasting
              Impressions.
            </p>
            <Button
              variant="default"
              className="text-white text-sm font-normal max-w-[150px] bg-blue-600 rounded-3xl px-5 py-5"
            >
              <Link href="/contact" className="flex">
                Let&apos;s Talk
                <ArrowRightIcon size={16} className="ms-2" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-4 pt-4">
          <WorkBanner />
        </div>
        <div className="flex flex-col m-auto items-center justify-center gap-5 pt-9">
          <H1 className=" text-5xl md:text-6xl  font-medium text-center max-w-[64rem]">
            <span>My Work</span>{" "}
            <span className="text-gray-400">Experience</span>{" "}
          </H1>
          <p className="font-light text-center">
            Unveiling My Work Experience. A Comprehensive Exploration of My
            Software Journey and Professional Evolution
          </p>
          <JobExperienceList />
          <div className="flex flex-col md:flex-row m-auto justify-between w-full gap-5 pt-9">
            <H1 className=" text-5xl md:text-6xl  font-medium text-left max-w-[64rem]">
              <span>Latest <br/></span>
              <span className="text-gray-400">Blog Posts</span>{" "}
            </H1>
            <div className="flex flex-col gap-5 mt-4 pt-4">
              <p className="font-light text-start max-w-[500px]">
                Fresh Insights, Dive into My Latest Blog Posts and Insights for Innovative Ideas and Inspiration.
              </p>
              <Button
                variant="default"
                className="text-white text-sm font-normal max-w-[150px] bg-blue-600 rounded-3xl px-5 py-5"
              >
                <Link href="/contact" className="flex">
                  See More
                  <ArrowRightIcon size={16} className="ms-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
