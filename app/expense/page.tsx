// import { redirect } from "next/navigation";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Header from "../components/header";

export default async function ExpensePage() {
  //   //   const { isAuthenticated } = getKindeServerSession();
  //   const isAuth = await isAuthenticated();

  //   if (!isAuth) {
  //     redirect("/api/auth/login");
  //   }

  // Mock expense data - in a real app, this would come from a database
  const expenses = [
    { id: 1, description: "group dinner", amount: 500 },
    { id: 2, description: "new bike", amount: 250 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Expenses</h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Description</th>
                  <th className="text-right py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id} className="border-b">
                    <td className="py-4">{expense.description}</td>
                    <td className="py-4 text-right">${expense.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Amount"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full p-2 border rounded"
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
