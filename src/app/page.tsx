"use client";

import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import TechspireMarketplace from "./(user)/page";

export default function Home() {
  const { signOut } = useClerk();

  return (
    <TechspireMarketplace />

  );
} 
