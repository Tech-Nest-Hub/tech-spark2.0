"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function EsewaSuccessPage() {
 return <>
 <Suspense>
  <Sus />
  </Suspense></>
}
function Sus() {
   const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      const oid = searchParams.get("oid");
      const amt = searchParams.get("amt");
      const refId = searchParams.get("refId");

      if (oid && amt && refId) {
        await fetch("/api/esewa/verify", {
          method: "POST",
          body: JSON.stringify({ oid, amt, refId }),
        });
      }

      router.push("/user");
    };

    verify();
  }, [searchParams, router]);

  return <p>Verifying payment...</p>;
}