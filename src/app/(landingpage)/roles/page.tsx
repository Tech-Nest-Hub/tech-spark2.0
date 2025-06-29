import Link from "next/link";

export default function Page() {
  return (
    <>
      <div></div>
      <div>
        <Link href="/sign-in?role=admin">Admin</Link>
        <Link href="/sign-in?role=user">User</Link>
      </div>
    </>
  );
}
