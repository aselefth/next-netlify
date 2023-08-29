import { getProbabilityColor } from "@/lib/getProbabilityColor";
import { cn } from "@/lib/utils";

export function Progress({ progress }: { progress: number }) {
	return (
		<div
			className={cn(
				"w-[100px] h-[50px] rounded-xl bg-black/20 flex items-center justify-center font-bold text-lg/6 overflow-hidden relative"
			)}
		>
			<span className={getProbabilityColor(progress)}>{progress}%</span>
			<div
				style={{ right: `${100 - progress}px` }}
				className="bg-black/[0.15] absolute top-0 bottom-0 left-0 right-full transition-all duration-100"
			/>
		</div>
	);
}
