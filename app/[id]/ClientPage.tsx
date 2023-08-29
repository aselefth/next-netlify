"use client";

import styles from "./page.module.scss";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronLeft, PenBox } from "lucide-react";
import * as Card from "@/components/ui/card";
import { Progress } from "@/components/Progress";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";
import { Task } from "@prisma/client";
import Image from "next/image";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const cameras = [
	{ id: 1, cameras: "Камера: 1, 6, 8" },
	{ id: 2, cameras: "Камера: 1, 6, 8" },
	{ id: 4, cameras: "Камера: 1, 6, 8" },
	{ id: 5, cameras: "Камера: 1, 6, 8" },
	{ id: 3, cameras: "Камера: 1, 6, 8" },
];

interface ClientPageProps {
	id: string;
	task: Task;
	deleteTask: () => Promise<void>;
	updateTask: (form: FormData) => Promise<void>;
}

export function ClientPage({
	id,
	task,
	deleteTask,
	updateTask,
}: ClientPageProps) {
	const [currentCamera, setCurrentCamera] = useState("/incident1.jpg");
	const [_isPending, startTransition] = useTransition();
	const [isEditable, setIsEditable] = useState(false);
	const [comment, setComment] = useState(task.comment);

	const onClick = (src: string) => {
		if (src === currentCamera) {
			return;
		}

		setCurrentCamera(src);
	};

	const toggleIsEditable = () => {
		setIsEditable((p) => !p);
	};

	const handleUpdateTask = () => {
		const form = new FormData();
		form.append("comment", comment);
		Object.entries(task).forEach(([key, value]) => {
			form.append(key, key === "comment" ? comment : value.toString());
		});
		startTransition(() => updateTask(form));
	};

	return (
		<div
			className={cn(styles.page, "grid grid-cols-[68px_1fr] gap-1.5 w-full")}
		>
			<Card.Root className="w-full hover:bg-white/20 h-[414px] rounded-[22px] rounded-tr-none rounded-br-none bg-white/10 backdrop-blur-sm border-[#ffffff10] border shadow-md">
				<Card.Content className="flex items-center justify-center h-full w-full p-0 cursor-pointer">
					<Link
						className={cn(
							buttonVariants({ variant: "default" }),
							"w-full h-full bg-transparent hover:bg-transparent"
						)}
						href="/"
					>
						<ChevronLeft />
					</Link>
				</Card.Content>
			</Card.Root>
			<Card.Root className="h-full w-full rounded-[22px] rounded-tl-none rounded-bl-none bg-white/10 backdrop-blur-sm text-white shadow-md border-[#ffffff10] border">
				<Card.Header>
					<Card.Title className="font-bold text-2xl/7 uppercase flex items-center justify-between">
						<span>Задача #{id}</span>
						<span className="text-white/30 text-lg/[22px] capitalize">
							Обработка:
						</span>
					</Card.Title>
				</Card.Header>

				<Card.Content className="w-full flex flex-col items-start gap-6">
					<div className="w-full flex items-center justify-between">
						<div className="w-[570px] flex flex-col items-start gap-2">
							<section className="w-full flex items-center justify-between">
								<h2 className="font-bold text-lg/[22px] text-white/30">
									Комментарий:
								</h2>
								<p className="font-bold text-lg/[22px] text-white/30">
									Дата:{" "}
									<span className="font-normal text-white">
										{[task.date, task.time].join(" ")}
									</span>
								</p>
							</section>
							<section className="flex items-start justify-between bg-black/20 w-full h-[120px] rounded-xl px-4 py-[19px]">
								<textarea
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									className="bg-transparent overflow-auto resize-none w-[540px] h-full outline-none"
									readOnly={!isEditable}
								/>
								<Button
									className="bg-transparent hover:bg-transparent"
									onClick={toggleIsEditable}
								>
									<PenBox color={isEditable ? "white" : "gray"} />
								</Button>
							</section>
						</div>
						<div className="flex flex-col items-end gap-2">
							<Progress progress={task.progress} />
							<p className="text-lg/[22px] font-normal text-black/50">
								Найдено {task.thiefAmount} чел.
							</p>
							<AlertDialog>
								<AlertDialogTrigger
									className={cn(
										buttonVariants({ variant: "default" }),
										"bg-white/20 hover:bg-white/30 mt-5 text-xl/6 font-medium px-6 py-[10px]"
									)}
								>
									Завершить задачу
								</AlertDialogTrigger>
								<AlertDialogContent className="text-black">
									<AlertDialogHeader>
										<AlertDialogTitle>
											Удаление задачи
										</AlertDialogTitle>
										<AlertDialogDescription>
											Вы уверены, что хотите удалить задачу?
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Отменить</AlertDialogCancel>
										<AlertDialogAction
											className={buttonVariants({
												variant: "destructive",
											})}
											onClick={() =>
												startTransition(() => deleteTask())
											}
										>
											Завершить
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</div>
					</div>
					<Separator className=" bg-white/50" />
					<div className="flex flex-col items-start w-full gap-12">
						<div className="w-full flex flex-col items-start gap-1.5">
							<h2 className="font-bold text-lg/[22px] text-white/30">
								Отмечено воров:
							</h2>
							<div className="flex items-center w-full justify-between">
								<div className="w-[847px] overflow-x-scroll flex items-center gap-10 py-2.5 px-5">
									{cameras.map((camera) => (
										<div
											key={camera.id}
											className="flex items-center gap-3 text-lg/[22px] shrink-0"
										>
											<p className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white bg-[#b169ff] shadow-[0_0_16px_#c587f450]">
												#{camera.id}
											</p>
											<span className="">{camera.cameras}</span>
										</div>
									))}
								</div>
								<Button
									onClick={() => handleUpdateTask()}
									variant="destructive"
									className="rounded-xl text-xl/6 font-medium w-[216px] h-[58px] shadow-[0_12px_25px_#00000040]"
								>
									Применить
								</Button>
							</div>
						</div>
						<div className="w-full grid grid-cols-[420px_1fr] gap-6">
							<div className="flex w-full flex-col items-start gap-2.5">
								<h1 className="font-bold text-lg/[22px] uppercase">
									Камера 1
								</h1>
								<div className="w-[420px] h-[280px] rounded-xl bg-black/40">
									<Image
										src={currentCamera}
										alt="camera1"
										width={420}
										height={280}
										className="w-full h-full object-contain rounded-xl"
									/>
								</div>
							</div>
							<div className="flex flex-col items-start gap-2.5 w-full">
								<h1 className="font-bold text-lg/[22px] text-white/50">
									люди
								</h1>
								<div className="grid grid-cols-3 w-full grid-rows-2 gap-x-6 gap-y-4">
									<Button
										onClick={() => onClick("/incident2.jpg")}
										className="w-full h-full rounded-xl p-1.5 bg-gradient-to-tl from-purple-700 to-purple-500 shadow-[0_0_15px_#7e22ce]"
									>
										<Image
											width={150}
											height={100}
											src="/incident2.jpg"
											alt="incident"
											className="rounded-[6px] w-full h-full object-cover"
										/>
									</Button>
									<Button
										onClick={() => onClick("/incident1.jpg")}
										className="w-full h-full rounded-xl p-1.5 bg-gradient-to-tl from-red-600 to-orange-500 shadow-[0_0_15px_#dc2626]"
									>
										<Image
											width={150}
											height={100}
											src="/incident1.jpg"
											alt="incident"
											className="rounded-[6px] w-full h-full object-cover"
										/>
									</Button>
									<Button
										onClick={() => onClick("/incident2.jpg")}
										className="w-full h-full rounded-xl p-1.5 bg-gradient-to-tl from-purple-700 to-purple-500 shadow-[0_0_15px_#7e22ce]"
									>
										<Image
											width={150}
											height={100}
											src="/incident2.jpg"
											alt="incident"
											className="rounded-[6px] w-full h-full object-cover"
										/>
									</Button>
									<Button
										onClick={() => onClick("/incident2.jpg")}
										className="w-full h-full rounded-xl p-1.5 bg-gradient-to-tl from-blue-600 to-teal-500 shadow-[0_0_15px_#2563eb]"
									>
										<Image
											width={150}
											height={100}
											src="/incident2.jpg"
											alt="incident"
											className="rounded-[6px] w-full h-full object-cover"
										/>
									</Button>
									<Button
										onClick={() => onClick("/incident2.jpg")}
										className="w-full h-full rounded-xl p-1.5 bg-black/30 shadow-[0_0_15px_#00000050]"
									>
										<Image
											width={150}
											height={100}
											src="/incident2.jpg"
											alt="incident"
											className="rounded-[6px] w-full h-full object-cover"
										/>
									</Button>
									<Button
										onClick={() => onClick("/incident2.jpg")}
										className="w-full h-full rounded-xl p-1.5 bg-black/30 shadow-[0_0_15px_#00000050]"
									>
										<Image
											width={150}
											height={100}
											src="/incident2.jpg"
											alt="incident"
											className="rounded-[6px] w-full h-full object-cover"
										/>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	);
}
