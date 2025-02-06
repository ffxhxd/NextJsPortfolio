import DotPattern from '@/components/ui/dot-pattern'
import IconCloud from '@/components/ui/icon-cloud';
import { cn } from "@/lib/utils";
import React from 'react'

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

const Aboutme = () => {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Left section */}
      <div className="relative flex items-center justify-end overflow-hidden p-8 pb-0 md:p-12 md:pb-0 lg:pb-0 lg:p-16">
        <div className="z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-blue-950 dark:text-white mb-6">
            About Me
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-gray-700 dark:text-gray-300 tracking-tight">
            I am a passionate software engineer with extensive experience in building innovative solutions. My expertise spans across full-stack development, cloud architecture, and mobile applications.
          </p>
        </div>
        <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            gradientDirection="bottom-right" // Change direction as needed
            className="opacity-50"
          />

      </div>

      {/* Right section */}
      <div className="relative flex items-center justify-center h-full w-full overflow-hidden mt-3 p-8 pb-0 md:p-12 md:pb-0 lg:pb-0 lg:p-16">
        <IconCloud backgroundColor="#ffffff" glowIntensity={0} images={images} />
      </div>

      {/* Bottom section */}
      {/* <div className="relative flex flex-col items-center justify-center overflow-hidden md:col-span-2 bg-red-600 h-[500px] w-full"> */}
        {/* Add your content for the bottom section here */}
        
      {/* </div> */}
    </div>
  );
};

export default Aboutme;