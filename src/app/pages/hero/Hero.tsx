
// page.tsx
'use client'
import RetroGrid from "@/components/ui/retro-grid";
import DockBar from "@/components/ui/ui/DockBar"
import TypingAnimation from "@/components/ui/typing-animation";
import HyperText from "@/components/ui/hyper-text";
import Cursor from "../../../components/cursor/Cursor";
import { CheckIcon, Download } from "lucide-react";
import { AnimatedSubscribeButton } from "@/components/ui/animated-subscribe-button";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
import { useEffect, useState } from "react";

const textVariants = {
    initial: {
        x: -500,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
            staggerChildren: 0.1,
        },
    }
}

const titles = [
    "Fullstack Engineer",
    "Frontend Developer",
    "Freelancer",
    "UI/UX Designer"
  ];
  

const Hero = () => {
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
      }, 3000);
      return () => clearInterval(interval);
    }, [titles.length]);
  
    return (
      <>
        <Cursor />
        <div className="flex h-screen overflow-hidden">
          <div className="fixed bottom-12 flex h-16 w-full items-center justify-center">
            <DockBar />
          </div>
          <RetroGrid />
          <div className="flex items-center flex-col justify-center gap-4 w-full">
            <div className="h-12">
              <TypingAnimation delay={5500}>
                Hi, I'm Fahad!
              </TypingAnimation>
            </div>
            <HyperText
              key={currentTitleIndex}
              className="text-[32px]"
            >
              {titles[currentTitleIndex]}
            </HyperText>
            <div className="flex items-center justify-center gap-4">
              <InteractiveHoverButton text="Contact" />
              <AnimatedSubscribeButton
                buttonColor="#000000"
                buttonTextColor="#ffffff"
                subscribeStatus={false}
                initialText={
                  <span className="group inline-flex items-center">
                    Download Resume
                    <Download className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                }
                changeText={
                  <span className="group inline-flex items-center">
                    <CheckIcon className="mr-2 size-4" />
                    Downloaded
                  </span>
                }
              />
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Hero;