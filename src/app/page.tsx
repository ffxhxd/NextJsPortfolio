'use client'
import Greeting from "@/components/greeting/Greeting";
import Aboutme from "./pages/hero/Aboutme";
import Hero from "./pages/hero/Hero";
import Sidebar from "@/components/sidebar/Sidebar";
import SparklesText from "@/components/ui/sparkles-text";
export default function Home() {
  return (
    <>
      <Greeting />
      <Sidebar />
      <Hero />
      <Aboutme />


      <div className=" flex items-start justify-center w-[full] h-[400px] text-center">
        <div className="w-[340px] items-center">
          <SparklesText className="text-2xl font-normal italic" text="Welcome to my half-baked portfolio! 🚧" />
          <SparklesText className="text-2xl font-normal italic" text="Still under construction because perfection takes time (and procrastination is an art)." />
          <SparklesText className="text-2xl font-normal italic" text="Stay tuned for something mind-blowingly average soon! 😎" />
        </div>
      </div>

    </>
  );
}
