// import Link from "next/link";
// import {
//   getKindeServerSession,
//   LogoutLink,
//   RegisterLink,
//   LoginLink,
// } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Header() {
  //   const { getUser, isAuthenticated } = getKindeServerSession();
  //   const user = await getUser();
  //   const isAuth = await isAuthenticated();

  return (
    <header className="flex items-center justify-between p-4 bg-green-100">
      <div className="flex items-center gap-2">
        {/* {isAuth && user?.picture ? (
          <img
            src={user.picture}
            alt={user.given_name || "User"}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
        )} */}
        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
        <span className="font-medium">
          {/* {isAuth ? user?.email : "Expenses App"} */}
          Expenses App
        </span>
      </div>

      <nav>
        {/* {isAuth ? (
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-gray-900"
            >
              Dashboard
            </Link>
            <Link href="/expense" className="text-gray-700 hover:text-gray-900">
              Expenses
            </Link>
            <LogoutLink className="px-4 py-2 bg-black text-white rounded">
              Logout
            </LogoutLink>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <LoginLink className="px-4 py-2 bg-black text-white rounded">
              Sign in
            </LoginLink>
            <RegisterLink className="text-gray-700 hover:text-gray-900">
              Sign up
            </RegisterLink>
          </div>
        )} */}
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-black text-white rounded">Sign in</div>
        </div>
      </nav>
    </header>
  );
}
