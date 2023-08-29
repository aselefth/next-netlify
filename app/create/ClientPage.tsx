"use client";
import styles from "./page.module.scss";
import * as Card from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronLeft, PlusCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChangeEvent, useState } from "react";

interface CreateTaskClientProps {
	sendFiles: (form: FormData) => Promise<void>;
}

export function CreateTaskClient(props: CreateTaskClientProps) {
	const [isInDragArea, setIsInDragArea] = useState(false);
	const [files, setFiles] = useState<FileList>();

	function handleSetFiles(e: ChangeEvent<HTMLInputElement>) {
		const newFiles = e.target.files;

		if (!newFiles) {
			return null;
		}

		setFiles(newFiles);
	}

	return (
		<form
			action={props.sendFiles}
			className={cn("grid grid-cols-[68px_1fr] gap-1.5 w-full", styles.page)}
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
					<Card.Title className="font-bold text-2xl/7 uppercase">
						новая задача
					</Card.Title>
				</Card.Header>
				<Card.Content className="w-full flex flex-col items-center gap-14">
					<div
						className={cn(
							"w-full flex flex-col gap-2.5 items-center justify-center rounded-xl bg-white/10 border border-white/10 h-[302px] relative p-2",
							isInDragArea && styles.dragging
						)}
					>
						<label
							htmlFor="file-input"
							className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-2.5"
						>
							<PlusCircle size={55} />
							<p className="text-xl/6 uppercase mt-2">добавить видео</p>
							<span className="text-lg/[22px] text-white/40 flex flex-col items-start gap-1">
								{files && files.length ? (
									Array.from(files).map((file) => (
										<span key={file.name}>{file.name}</span>
									))
								) : (
									<span>Вы можете перетащить файлы в эту область</span>
								)}
							</span>
						</label>
						<input
							onDragEnter={() => setIsInDragArea(true)}
							onDragLeave={() => setIsInDragArea(false)}
							onChange={handleSetFiles}
							id="file-input"
							name="fileInput"
							multiple
							className="bg-transparent w-full h-full absolute top-0 left-0 opacity-0 text-transparent cursor-pointer focus:outline-4 focus:opacity-100 rounded-xl"
							type="file"
						/>
					</div>

					<section className="w-full flex items-start justify-between">
						<div className="flex flex-col items-start gap-2">
							<h2 className="font-bold text-lg/[22px] text-white/30">
								Комментарий:
							</h2>
							<textarea
								name="comment"
								placeholder="Введите свой комментарий"
								className="resize-none bg-black/20 w-[540px] h-[120px] text-lg/[22px] outline-none rounded-xl pl-[14px] pr-2 py-[18px] overflow-y-auto"
							/>
						</div>
						<div className="flex flex-col gap-[30px] items-center w-[216px]">
							<Button
								disabled={!files}
								type="submit"
								className="w-full h-[58px] bg-[#253f7c]/50 hover:bg-[#253f7c]/40 shadow-[0_12px_25px_#00000040] border border-white/5 font-medium text-xl/6 rounded-xl"
							>
								Создать
							</Button>
							<Button
								disabled={!files}
								type="button"
								className="w-full h-[58px] bg-[#253f7c]/50 hover:bg-[#253f7c]/40 shadow-[0_12px_25px_#00000040] border border-white/5 font-medium text-xl/6 rounded-xl"
							>
								Создать и открыть
							</Button>
						</div>
					</section>
				</Card.Content>
			</Card.Root>
		</form>
	);
}
