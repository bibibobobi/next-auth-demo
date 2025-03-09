import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { createExpenseAction, getUserExpensesAction } from "../lib/action";
import Header from "../components/header";

type Expense = {
  id: string;
  amount: number;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Get expenses using our action
  const expenses = await getUserExpensesAction();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Expenses Dashboard</h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Welcome, {user?.given_name || user?.email}
            </h2>

            {/* Expense Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-lg font-medium">Total Expenses</h3>
                <p className="text-2xl">{expenses.length}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-lg font-medium">Total Amount</h3>
                <p className="text-2xl">
                  $
                  {expenses
                    .reduce(
                      (sum: number, expense: Expense) => sum + expense.amount,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
            </div>

            {/* Expense List */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Recent Expenses</h3>
              {expenses.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Description</th>
                        <th className="text-right py-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses.slice(0, 5).map((expense) => (
                        <tr key={expense.id} className="border-b">
                          <td className="py-4">{expense.description}</td>
                          <td className="py-4 text-right">
                            ${expense.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">
                  No expenses yet. Add your first one below.
                </p>
              )}

              {expenses.length > 5 && (
                <div className="mt-4 text-right">
                  <Link
                    href="/expense"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View all expenses →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Add Expense Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
            <form action={createExpenseAction} className="space-y-4">
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Amount
                </label>
                <input
                  id="amount"
                  type="number"
                  name="amount"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  name="description"
                  placeholder="What was this expense for?"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-black text-white rounded"
              >
                Add Expense
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
