import { db } from "@/lib/db";
import { CreateTaskClient } from "./ClientPage";
import { fakerRU as faker } from "@faker-js/faker";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function CreatePage() {
	async function handleSendFiles(formData: FormData) {
		"use server";

		const data = formData.getAll("fileInput");
		const comment = formData.get("comment")?.toString();
		console.log(data);
		const res = await db.task.create({
			data: {
				date: "24 авг 2023",
				time: "12:00",
				status: "paused",
				progress: 0,
				comment: comment || faker.commerce.productDescription(),
				thiefAmount: 3,
				incidentsAmount: 1,
				hasVideo: true,
			},
		});

		console.log(res);
		revalidatePath("/");

		redirect("/");
	}

	return <CreateTaskClient sendFiles={handleSendFiles} />;
}
