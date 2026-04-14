"use client";

import LandingHero from "@/components/Hero/LandingHero";
import ThemePreview from "@/components/Hero/ThemePreview";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      {/* <main>
        <div className="bg-blue-600 text-white text-center py-2 text-sm font-mono">
          {status}
        </div>
      </main> */}
      <Navbar />

      <LandingHero />
      <ThemePreview />
    </>
  );
}
