// app/sign-in/page.tsx
"use client";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "USER";
  //ask
  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn
        signUpUrl={`/sign-up?role=${role}`}
        redirectUrl={`/${role.toLowerCase()}`}
      />
    </div>
  );
}
