"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { LandingNavbar } from "@/components/LandingNavBar";
import { LandingHero } from "@/components/LandingHero";
import { LandingContent } from "@/components/LandingContent";

const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
};

export default LandingPage;
