import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { string, object, safeParse, enumType, number, boolean } from "valibot";

const UpdateTaskSchema = object({
	id: string(),
	date: string(),
	time: string(),
	status: enumType(["pending", "paused", "fullfilled"]),
	progress: number(),
	comment: string(),
	hasVideo: boolean(),
	thiefAmount: number(),
	incidentsAmount: number(),
});

interface ReqProps {
	params: {
		id: string;
	};
}

export async function GET(req: Request, { params }: ReqProps) {
	const task = await db.task.findFirst({
		where: {
			id: params.id,
		},
	});
	return NextResponse.json({ task });
}

export async function POST(req: Request, { params }: ReqProps) {
	const body = await req.json();
	console.log(body, "body");
	const data = safeParse(UpdateTaskSchema, body);
	console.log(data, "in post method");
	if (!data.success) {
		return NextResponse.json({ success: false });
	}

	await db.task.update({
		where: {
			id: params.id,
		},
		data: { ...data.output },
	});

	return NextResponse.json({ success: true });
}
