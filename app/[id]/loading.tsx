import { cn } from "@/lib/utils";
import styles from "./page.module.scss";
import { Skeleton } from "@/components/ui/skeleton";
import * as Card from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function Loading() {
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
						<Skeleton className="rounded-md w-[300px] h-6" />

						<Skeleton className="rounded-md w-[100px] h-5" />
					</Card.Title>
				</Card.Header>

				<Card.Content className="w-full flex flex-col items-start gap-6">
					<div className="w-full flex items-center justify-between">
						<div className="w-[570px] flex flex-col items-start gap-2">
							<section className="w-full flex items-center justify-between">
								<Skeleton className="rounded-md w-[100px] h-5" />
								<Skeleton className="rounded-md w-[200px] h-5" />
							</section>
							<Skeleton className="rounded-md w-full h-[120px]" />
						</div>
						<div className="flex flex-col items-end gap-2">
							<Skeleton className="rounded-xl h-[58px] w-[100px]" />

							<Skeleton className="rounded-md w-[80px] h-5" />
							<Skeleton className="rounded-md w-[120px] h-8" />
						</div>
					</div>
					<div className="flex flex-col items-start w-full gap-12">
						<div className="w-full flex flex-col items-start gap-1.5">
							<Skeleton className="h-5 w-[120px]" />
							<Skeleton className="rounded-md h-5 w-[80px]" />
							<div className="flex items-center w-full justify-between">
								<Skeleton className="w-full h-8 rounded-md" />
								<Skeleton className="w-120px h-8 rounded-md" />
							</div>
						</div>
						<div className="w-full grid grid-cols-[420px_1fr] gap-6">
							<div className="flex w-full flex-col items-start gap-2.5">
								<Skeleton className="h-5 w-[120px]" />
								<div className="w-[420px] h-[280px] rounded-xl bg-black/40">
									<Skeleton className="rounded-xl w-[420px] h-[280px]" />
								</div>
							</div>
							<div className="flex flex-col items-start gap-2.5 w-full">
								<Skeleton className="h-5 w-[60px]" />
								<div className="grid grid-cols-3 w-full grid-rows-2 gap-x-6 gap-y-4">
									{[1, 2, 3, 4, 5, 6].map((el) => (
										<Skeleton
											className="h-[100px] w-[150px] rounded-[6px]"
											key={el}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	);
}
