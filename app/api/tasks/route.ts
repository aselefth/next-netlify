import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
	const tasks = await db.task.findMany();
	return NextResponse.json({ tasks });
}
