import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Header from "./components/header";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-col items-center justify-center flex-1 p-4 text-center bg-green-100">
        <h1 className="text-4xl font-bold mb-6">Expenses App</h1>
        <p className="text-xl mb-8 max-w-2xl">
          Track your expenses easily. Log in to manage your spending and stay on
          top of your budget.
        </p>

        <div className="mb-12 flex gap-4">
          <LoginLink className="px-6 py-3 bg-black text-white rounded-md">
            Sign in
          </LoginLink>
          <RegisterLink className="px-6 py-3 border border-black rounded-md">
            Sign up
          </RegisterLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Easy Tracking</h2>
            <p className="text-gray-600">
              Quickly add and categorize your expenses with our simple
              interface.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Secure Storage</h2>
            <p className="text-gray-600">
              Your financial data is securely stored and protected with
              authentication.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Expense Insights</h2>
            <p className="text-gray-600">
              View summaries and insights about your spending habits.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
