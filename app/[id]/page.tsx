import { Metadata } from "next";
import { ClientPage } from "./ClientPage";
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
	const task = await db.task.findFirst({ where: { id: params.id } });

	async function deleteTask() {
		"use server";
		const res = await db.task.delete({ where: { id: params.id } });
		console.log("task was deleted");
		revalidatePath("/");
		redirect("/");
	}

	async function updateTask(form: FormData) {
		"use server";

		const comment = form.get("comment")?.toString();

		const res = await db.task.update({
			where: {
				id: params.id,
			},
			data: {
				comment,
			},
		});

		console.log(res);
		if (res) {
			revalidateTag(params.id);
			revalidatePath("/");
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
