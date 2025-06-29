"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EsewaSuccessPage() {
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

      router.push("/payment-success");
    };

    verify();
  }, [searchParams, router]);

  return <p>Verifying payment...</p>;
}
