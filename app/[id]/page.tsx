import { Metadata } from "next";
import { ClientPage } from "./ClientPage";
import { Task } from "@prisma/client";
import { db } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

interface TaskPageProps {
	params: {
		id: string;
	};
}

export const generateMetadata = async ({
	params,
}: TaskPageProps): Promise<Metadata> => {
	return {
		title: `42 Scan - Task ${params.id}`,
		description: "This page contains data about specific incident",
	};
};

export default async function TaskPage({ params }: TaskPageProps) {
	const taskRes = await fetch(`${process.env.HOST}/api/tasks/${params.id}`, {
		next: { tags: ["Task", params.id] },
	});

	const { task }: { task: Task } = await taskRes.json();

	async function deleteTask() {
		"use server";
		const res = await db.task.delete({ where: { id: params.id } });
		console.log("task was deleted");
		revalidatePath("/");
		redirect("/");
	}

	async function updateTask(form: FormData) {
		"use server";
		let { thiefAmount, incidentsAmount, progress, hasVideo, ...data } =
			Object.fromEntries(form.entries());
		thiefAmount = JSON.parse(thiefAmount.toString());
		incidentsAmount = JSON.parse(incidentsAmount.toString());
		progress = JSON.parse(progress.toString());
		hasVideo = JSON.parse(hasVideo.toString());

		console.log(data);

		const res = await fetch(`${process.env.HOST}/api/tasks/${params.id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...data,
				thiefAmount,
				incidentsAmount,
				progress,
				hasVideo,
			}),
		});
		if (res.ok) {
			const result = await res.json();
			console.log(result);
			revalidateTag(params.id);
		}
	}

	return (
		<ClientPage
			task={task}
			id={params.id}
			deleteTask={deleteTask}
			updateTask={updateTask}
		/>
	);
}
