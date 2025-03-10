import Image from "next/image";
import Link from "next/link";
import {
  getKindeServerSession,
  LogoutLink,
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Header() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  const user = await getUser();

  return (
    <header className="flex items-center justify-between p-4 bg-green-100">
      <div className="flex items-center gap-2">
        {user?.picture ? (
          <Image
            src={user.picture}
            alt={user.given_name || "User"}
            className="rounded-full"
            width={32}
            height={32}
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
        )}
        <span className="font-medium">{user?.email || "Expenses App"}</span>
      </div>

      <nav>
        {isLoggedIn ? (
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
        )}
      </nav>
    </header>
  );
}
