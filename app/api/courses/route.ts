import db from "@/db/drizzle";
import { NextResponse } from "next/server";
import { courses } from "@/db/schema";
import { isAdmin } from "@/lib/admin";

export const GET = async () => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const data = await db.query.courses.findMany();
  return NextResponse.json(data);
};
