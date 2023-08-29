import { Check, ChevronRight, Pause, Play } from "lucide-react/";
import * as Card from "./ui/card";
import Link from "next/link";
import { Separator } from "./ui/separator";
import * as Table from "./ui/table";
import { Task } from "@/mockdata";
import { cn } from "@/lib/utils";
import { getProbabilityColor } from "@/lib/getProbabilityColor";
import { Button } from "./ui/button";
import { Icons } from "./Icons";
import Image from "next/image";

interface TaskProps {
	task: Task;
}

export function Task({ task }: TaskProps) {
	return (
		<div className="flex items-center gap-1.5 h-[430px] w-full">
			<Card.Root className="h-full w-full rounded-[22px] rounded-tr-none rounded-br-none bg-white/10 backdrop-blur-sm text-white shadow-md border-white/10 border">
				<Card.Header>
					<Card.Title className="font-bold text-2xl/7 uppercase">
						Задача #{task.id}
					</Card.Title>
				</Card.Header>
				<Card.Content className="w-full flex flex-col items-start gap-5 -mt-6">
					<Table.Root>
						<Table.Header>
							<Table.Row className="hover:bg-transparent">
								<Table.Head className="text-[#ffffff60] font-bold text-sm/4">
									дата
								</Table.Head>
								<Table.Head className="text-[#ffffff60] font-bold text-sm/4">
									статус
								</Table.Head>
								<Table.Head className="text-[#ffffff60] font-bold text-sm/4">
									процент
								</Table.Head>
								<Table.Head className="text-[#ffffff60] font-bold text-sm/4">
									комментарий
								</Table.Head>
								<Table.Head className="text-[#ffffff60] font-bold text-sm/4">
									запуск
								</Table.Head>
								<Table.Head className="text-[#ffffff60] font-bold text-sm/4">
									видео
								</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							<Table.Row className="hover:bg-transparent">
								<Table.Cell className="font-[400] text-lg/6 flex flex-col items-center w-[140px]">
									<span>{task.date}</span>
									<p className="text-[#ffffff70]">{task.time}</p>
								</Table.Cell>
								<Table.Cell className="font-[400] text-lg/6 w-[150px]">
									{task.status === "fullfilled" ? (
										<span className="text-[#3ed078]">Завершён</span>
									) : (
										<span>Обрабатывается</span>
									)}
								</Table.Cell>
								<Table.Cell className="font-[400] text-lg/6 w-auto">
									<div
										className={cn(
											"w-[100px] h-[50px] rounded-xl bg-black/20 flex items-center justify-center font-bold text-lg/6 overflow-hidden relative"
										)}
									>
										<span
											className={getProbabilityColor(task.progress)}
										>
											{task.progress}%
										</span>
										<div
											style={{ right: `${100 - task.progress}px` }}
											className="bg-black/[0.15] absolute top-0 bottom-0 left-0 right-full transition-all duration-100"
										/>
									</div>
								</Table.Cell>
								<Table.Cell className="font-[400] text-lg/6 w-[220px] truncated-text p-0">
									{task.comment}
								</Table.Cell>
								<Table.Cell className="font-[400] text-lg/6 w-fit">
									<Button className="rounded-full p-0 w-[50px] h-[50px] border-[6px] border-white/10 bg-white/20 hover:bg-white/10">
										{
											{
												paused: <Play className="ml-1" />,
												pending: <Pause />,
												fullfilled: <Check />,
											}[task.status]
										}
									</Button>
								</Table.Cell>
								<Table.Cell className="font-[400] text-lg/6 w-fit">
									{task.hasVideo ? (
										<Icons.CameraDone />
									) : (
										<Icons.CameraQuestion />
									)}
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table.Root>
					<Separator />
					<div className="grid grid-cols-[713px_1fr] gap-x-[94px]">
						<div className="flex flex-col items-start gap-6">
							<div className="flex gap-2 items-center w-full">
								<Image
									width={150}
									height={100}
									src="/incident1.jpg"
									alt="incident1"
									className="w-[150px] h-[100px] rounded-xl object-cover"
								/>
								<Image
									width={150}
									height={100}
									src="/incident2.jpg"
									alt="incident2"
									className="w-[150px] h-[100px] rounded-xl object-cover"
								/>
								<Image
									width={150}
									height={100}
									src="/incident1.jpg"
									alt="incident1"
									className="w-[150px] h-[100px] rounded-xl object-cover"
								/>
								<Image
									width={150}
									height={100}
									src="/incident2.jpg"
									alt="incident2"
									className="w-[150px] h-[100px] rounded-xl object-cover"
								/>
								<p className="h-full flex items-center justify-center border text-center border-white bg-[#00000010] rounded-xl text-lg/6 p-3 w-20">
									+150 чел.
								</p>
							</div>
							<Button
								disabled={task.status === "fullfilled"}
								className="w-[216px] h-[58px] flex items-center justify-center rounded-xl text-xl/6 font-medium bg-[#253f7c50] hover:bg-[#213f7c] border border-[#ffffff20] shadow-[0_12px_25px_#00000040]"
							>
								Скачать данные
							</Button>
						</div>
						<div className="w-full flex flex-col items-start gap-2">
							<div className="flex items-center gap-2">
								<video
									controls
									poster="/incident1.jpg"
									className="w-[150px] h-[100px] rounded-xl"
								>
									<track kind="captions" />
								</video>
								<div className="bg-black/40 w-[150px] h-[100px] rounded-xl flex items-center justify-center">
									<Icons.CameraQuestion />
								</div>
							</div>
							<p
								className={cn(
									"text-lg/6 font-medium text-white/50 py-6 px-2.5 flex items-center justify-start rounded-xl bg-gradient-to-r w-[308px]",
									task.thiefAmount > 0
										? "from-[#ff265a60] to-black/0"
										: "from-[#799dee60] to-black/0"
								)}
							>
								Выявлено:{" "}
								<span className="text-white pl-1">
									{task.thiefAmount} воров
								</span>
							</p>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
			<Card.Root className="hover:bg-white/20 h-full w-[68px] rounded-[22px] rounded-tl-none rounded-bl-none bg-white/10 backdrop-blur-sm border-white/10 border shadow-md">
				<Card.Content className="p-0 flex items-center justify-center h-full">
					<Link
						href={`/${task.id}`}
						className="w-full h-full flex items-center justify-center"
					>
						<ChevronRight color="white" />
					</Link>
				</Card.Content>
			</Card.Root>
		</div>
	);
}
