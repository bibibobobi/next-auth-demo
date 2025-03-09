"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "./db";

// Authentication helper
async function authenticate() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isAuth = await isAuthenticated();

  if (!isAuth) {
    redirect("/api/auth/login");
  }

  const user = await getUser();

  if (!user?.id) {
    throw new Error("User not found");
  }

  return user;
}

// Check if user is admin
export async function isUserAdmin(): Promise<boolean> {
  const { getRoles } = getKindeServerSession();
  const roles = await getRoles();

  // Check if user has admin role (assumes 'admin_user' is the role key in Kinde)
  return roles?.some((role) => role.key === "admin_user") ?? false;
}

// Add a new expense
export async function createExpenseAction(formData: FormData): Promise<void> {
  const user = await authenticate();

  const amount = formData.get("amount")?.toString();
  const description = formData.get("description")?.toString();

  if (!amount || !description) {
    // For server actions in forms, we can use this pattern
    // to show errors on the client side
    throw new Error("Amount and description are required");
  }

  try {
    await prisma.expense.create({
      data: {
        description,
        amount: parseFloat(amount),
        userId: user.id,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/expense");
  } catch (error) {
    console.error("Error creating expense:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
}

// Get the current user's expenses
export async function getUserExpensesAction() {
  const user = await authenticate();

  try {
    return await prisma.expense.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw new Error("Failed to fetch expenses");
  }
}

// Delete an expense
export async function deleteExpenseAction(formData: FormData): Promise<void> {
  const user = await authenticate();
  const expenseId = formData.get("id")?.toString();

  if (!expenseId) {
    throw new Error("No expense ID provided");
  }

  try {
    // Authorization check - verify this expense belongs to the user
    const expense = await prisma.expense.findUnique({
      where: { id: expenseId },
    });

    if (!expense) {
      throw new Error("Expense not found");
    }

    if (expense.userId !== user.id) {
      // Check if user is admin as a fallback
      const isAdmin = await isUserAdmin();

      if (!isAdmin) {
        throw new Error("Not authorized to delete this expense");
      }
    }

    await prisma.expense.delete({
      where: { id: expenseId },
    });

    revalidatePath("/dashboard");
    revalidatePath("/expense");
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
}

// Get all expenses (admin only)
export async function getAllExpensesAction() {
  const isAdmin = await isUserAdmin();

  if (!isAdmin) {
    throw new Error("Admin access required");
  }

  try {
    return await prisma.expense.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching all expenses:", error);
    throw new Error("Failed to fetch all expenses");
  }
}

// Get expense stats by user (admin only)
export async function getExpenseStatsByUserAction() {
  const isAdmin = await isUserAdmin();

  if (!isAdmin) {
    throw new Error("Admin access required");
  }

  try {
    const stats = await prisma.expense.groupBy({
      by: ["userId"],
      _count: {
        id: true,
      },
      _sum: {
        amount: true,
      },
    });

    return stats.map((stat) => ({
      userId: stat.userId,
      count: stat._count.id,
      total: stat._sum.amount || 0,
    }));
  } catch (error) {
    console.error("Error generating expense stats:", error);
    throw new Error("Failed to generate expense statistics");
  }
}
