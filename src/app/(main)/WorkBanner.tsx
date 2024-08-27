/** @format */

import heroBanner from "@/assets/mondia.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { jobExperiences } from "../../lib/data";

export default function WorkBanner() {
  return (
    <div className="flex flex-col space-y-3 mt-4 mb-4">
      <div className="mx-auto flex flex-wrap w-full justify-between gap-5 px-5 py-3">
        <div className="flex flex-col h-15 items-start justify-center top-0">
          <p className="font-medium text-xl tracking-tight ">
            <span className="text-blue-600">Mondia Digital,</span> Johannesburg,
            SA
          </p>
          <p className="font-light text-muted-foreground text-md">
            &#8226; May 2022 - present
          </p>
        </div>
        <div className="flex flex-col h-15 items-start justify-center top-0">
          <p className="font-light text-xl tracking-tight text-muted-foreground">
            Web development, Johannesburg,
            <br /> Front-end Developer
          </p>
        </div>
        <div className="flex h-15 items-start justify-center top-0 gap-3">
          <Button
            variant="outline"
            className="border border-gray-400 rounded-full"
          >
            <p className="font-light text-xl tracking-tight text-muted-foreground">
              Gaming
            </p>
          </Button>
          <Button
            variant="outline"
            className="border border-gray-400 rounded-full"
          >
            <p className="font-light text-xl tracking-tight text-muted-foreground">
              Cloud
            </p>
          </Button>
        </div>
      </div>
      <Image
        src={heroBanner}
        alt="mondia"
        width={1280}
        height={700}
        className="aspect-auto h-fit flex-none rounded-xl bg-secondary object-cover"
      />
      <div className="space-y-4 mt-8">
        {jobExperiences.map((job, index) => (
          <div
            key={index}
            className="flex w-full text-start justify-between p-4 border-b border-gray-200"
          >
            <div className="flex flex-col">
              <h3 className="text-lg font-medium text-blue-600">
                {job.company},{" "}
                <span className="text-black">{job.location}</span>
              </h3>
              <p className="font-light text-gray-500">{job.period}</p>
            </div>
            <p className="font-light mt-1 text-gray-700">{job.description}</p>
            <div className="flex space-x-2 mt-2">
              {job.tags.map((Tag, i) => (
                <span
                  className="font-light text-xl tracking-tight text-muted-foreground"
                  key={i}
                >
                  <Button
                    variant="outline"
                    className="border border-gray-400 rounded-full"
                  >
                    {Tag}
                  </Button>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
