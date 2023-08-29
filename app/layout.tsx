import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Scan 42",
	description: "Scan 42",
};

const SFPro = localFont({
	src: [
		{
			path: "../fonts/SF-Pro-Display-Thin.otf",
			style: "normal",
			weight: "300",
		},
		{
			path: "../fonts/SF-Pro-Display-Regular.otf",
			style: "normal",
			weight: "400",
		},
		{
			path: "../fonts/SF-Pro-Display-Medium.otf",
			style: "normal",
			weight: "500",
		},
		{
			path: "../fonts/SF-Pro-Display-Semibold.otf",
			style: "normal",
			weight: "600",
		},
		{
			path: "../fonts/SF-Pro-Display-Bold.otf",
			style: "normal",
			weight: "700",
		},
		{
			path: "../fonts/SF-Pro-Display-Heavy.otf",
			style: "normal",
			weight: "800",
		},
	],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={cn(SFPro.className, "w-full h-full")}>
				<div className="mx-auto h-screen grid grid-cols-[193px_1fr] gap-[22px] w-[1476px] pt-11 text-white">
					<div className="flex flex-col items-end gap-[18px]">
						<Icons.Logo />
						<p className="font-[800] text-3xl/9 mb-[33px]">SCAN</p>
						<Link
							href={"/create"}
							className="flex rounded-xl flex-col items-center gap-3 h-fit w-[193px] py-4 bg-[#4aa4d7]/20 hover:bg-[#4aa4d7]/10 border border-[#4aa4d7]/20"
						>
							<PlusCircle />
							<span className="font-bold text-xl/6 text-center uppercase">
								Добавить задачу
							</span>
						</Link>
					</div>
					<main className="mb-[45px]">{children}</main>
				</div>
			</body>
		</html>
	);
}
