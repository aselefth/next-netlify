import { Task } from "@/components/Task";
import { Task as TaskType } from "@prisma/client";
import { tasks as mockTasks } from "@/mockdata";

export default async function Home() {
	// const tasksRes = await fetch(`http://localhost:3001/api/tasks`);

	// if (!tasksRes.ok) {
	// 	return (
	// 		<h1 className="w-full h-full text-3xl flex items-center justify-center font-semibold text-white/60">
	// 			Нет информации
	// 		</h1>
	// 	);
	// }

	// const { tasks }: { tasks: TaskType[] | undefined } = await tasksRes.json();

	return (
		<div className="w-full flex flex-col items-center gap-4">
			{mockTasks?.length ? (
				mockTasks.map((task) => <Task key={task.id} task={task} />)
			) : (
				<h1 className="w-full h-full text-3xl flex items-center justify-center font-semibold text-white/60">
					Нет информации
				</h1>
			)}
		</div>
	);
}
