import { Task } from "@/components/Task";
import { db } from "@/lib/db";
import { Task as TaskType } from "@prisma/client";

export default async function Home() {
	const tasksRes = await fetch(`http://localhost:3000/api/tasks`);

	const { tasks }: { tasks: TaskType[] } = await tasksRes.json();

	return (
		<div className="w-full flex flex-col items-center gap-4">
			{tasks.length ? (
				tasks.map((task) => <Task key={task.id} task={task} />)
			) : (
				<h1 className="w-full h-full text-3xl flex items-center justify-center font-semibold text-white/60">
					Нет информации
				</h1>
			)}
		</div>
	);
}
