// import { redirect } from "next/navigation";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Header from "../components/header";
import Link from "next/link";

export default async function Dashboard() {
  //   const { getUser, isAuthenticated } = getKindeServerSession();
  //   const isAuth = await isAuthenticated();

  //   if (!isAuth) {
  //     redirect("/api/auth/login");
  //   }

  //   const user = await getUser();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Expenses Dashboard</h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Welcome
              {/* Welcome, {user?.given_name || user?.email} */}
            </h2>
            <p className="mb-4">
              This is your expenses dashboard where you can track and manage all
              your expenses.
            </p>
            <Link
              href="/expense"
              className="inline-block px-4 py-2 bg-black text-white rounded"
            >
              View Expenses
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Recent Expenses</h3>
              <p className="text-gray-600">View your most recent expenses</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Total Spent</h3>
              <p className="text-gray-600">Track your total spending</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Categories</h3>
              <p className="text-gray-600">View expenses by category</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
