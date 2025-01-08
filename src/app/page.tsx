'use client'
import Greeting from "@/components/greeting/Greeting";
import Aboutme from "./pages/hero/Aboutme";
import Hero from "./pages/hero/Hero";
import Sidebar from "@/components/sidebar/Sidebar";
export default function Home() {
  return (
    <>
    <Greeting/>
    {/* <Sidebar/> */}
    <Hero/>
    <Aboutme/>
    </>
  );
}
