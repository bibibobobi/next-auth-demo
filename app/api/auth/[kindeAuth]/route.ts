import { NextRequest } from "next/server";
import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET(
  request: NextRequest,
  context: { params: { kindeAuth: string } }
) {
  const { kindeAuth } = context.params;
  return handleAuth(request, kindeAuth);
}

export async function POST(
  request: NextRequest,
  context: { params: { kindeAuth: string } }
) {
  const { kindeAuth } = context.params;
  return handleAuth(request, kindeAuth);
}
