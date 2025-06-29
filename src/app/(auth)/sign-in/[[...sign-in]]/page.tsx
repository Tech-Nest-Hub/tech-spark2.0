import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function Page() {
  // const searchParams = useSearchParams();
  // const role = searchParams.get("role");
  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn signUpUrl="/sign-up" redirectUrl={`/admin`} />
    </div>
  );
}
