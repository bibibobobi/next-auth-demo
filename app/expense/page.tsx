import Header from "../components/header";
import { getUserExpensesAction, deleteExpenseAction } from "../lib/action";

export default async function ExpensePage() {
  // Get expenses using our action
  const expenses = await getUserExpensesAction();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">All Expenses</h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {expenses.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Description</th>
                    <th className="text-right py-2">Amount</th>
                    <th className="text-right py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense.id} className="border-b">
                      <td className="py-4">{expense.description}</td>
                      <td className="py-4 text-right">
                        ${expense.amount.toFixed(2)}
                      </td>
                      <td className="py-4 text-right">
                        <form action={deleteExpenseAction}>
                          <input type="hidden" name="id" value={expense.id} />
                          <button
                            type="submit"
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center py-4 text-gray-500">
                No expenses yet. Add your first expense on the dashboard.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
