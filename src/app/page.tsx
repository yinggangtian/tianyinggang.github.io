"use client";

import Profile from "@/components/Profile";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <div className="text-slate-700 dark:text-zinc-100">
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <Hero />
      </div>
      <div className="bg-white dark:bg-zinc-900">
        <Profile />
      </div>
    </div>
  );
}