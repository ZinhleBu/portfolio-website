/** @format */
"use client";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";

export const JobExperienceList = () => {
  const [activeJobId, setActiveJobId] = useState(null);

  const jobExperiences = [
    {
      id: 1,
      company: "Creative Minds",
      location: "New York",
      period: "February 2022 - Present",
    },
    {
      id: 2,
      company: "Innovative Designs Inc",
      location: "USA",
      period: "January 2020 - February 2022",
    },
    {
      id: 3,
      company: "Visionary Ltd",
      location: "London, UK",
      period: "January 2020 - September 2021",
    },
    {
      id: 4,
      company: "FutureTech",
      location: "Berlin, Germany",
      period: "January 2020 - August 2021",
    },
  ];

  return (
    <div className="job-experience-list w-full">
      {jobExperiences.map((job, index) => (
        <div
          key={job.id}
          onMouseEnter={() => setActiveJobId(job.id)}
          onMouseLeave={() => setActiveJobId(null)}
          className={`flex items-center p-4 my-2 rounded-lg cursor-pointer transition-colors duration-300 ${
            activeJobId === job.id ? "bg-blue-500 text-white" : "bg-white text-gray-800"
          }`}
        >
          <div className="flex items-center w-full justify-between">
            <div
              className={`text-3xl mr-4 ${
                activeJobId === job.id ? "text-white" : "text-gray-500"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <div className="font-semibold text-2xl">
                {job.company}, {job.location}
              </div>
              <div className="text-sm">{job.period}</div>
            </div>
            <div className="text-2xl">
              <ArrowRight
                className={`transition-transform duration-300 ${
                  activeJobId === job.id ? "text-white -rotate-45" : "text-gray-500"
                }`}
                size={34}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
