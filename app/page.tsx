// import {
//   LoginLink,
//   RegisterLink,
//   getKindeServerSession,
// } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import Header from "./components/header";

export default async function Home() {
  // const { isAuthenticated } = getKindeServerSession();
  // const isAuth = await isAuthenticated();

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-col items-center justify-center flex-1 p-4 text-center bg-green-100">
        <h1 className="text-4xl font-bold mb-6">Expenses App</h1>
        <p className="text-xl mb-8">
          Go to the{" "}
          <Link href="/dashboard" className="underline">
            dashboard
          </Link>{" "}
          to keep track of your expenses
        </p>

        <div className="flex gap-4">
          {/* {!isAuth ? (
            <>
              <LoginLink className="px-6 py-3 bg-black text-white rounded-md">
                Sign in
              </LoginLink>
              <RegisterLink className="px-6 py-3 border border-black rounded-md">
                Sign up
              </RegisterLink>
            </>
          ) : ( */}
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-black text-white rounded-md"
          >
            Go to Dashboard
          </Link>
          {/* )} */}
        </div>
      </div>
    </main>
  );
}
