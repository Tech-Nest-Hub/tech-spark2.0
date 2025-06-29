import { SignUp } from "@clerk/nextjs";

export default function Page() {
  //sd
  return (
    <div className="flex h-screen items-center justify-center">
      <SignUp signInUrl="/sign-in" redirectUrl={"/admin"} />
    </div>
  );
}
