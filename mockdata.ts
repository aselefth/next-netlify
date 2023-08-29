export type Task = {
	id: string;
	date: string;
	time: string;
	status: "pending" | "fullfilled" | "paused";
	progress: number;
	comment: string;
	hasVideo: boolean;
	thiefAmount: number;
	incidentsAmount: number;
};

export const tasks: Task[] = [
	{
		id: "12332",
		date: "24 авг 2023",
		time: "12:00",
		status: "pending",
		progress: 23,
		comment: "Какой то комментарий от пользователя в несколько строчек",
		hasVideo: true,
		thiefAmount: 0,
		incidentsAmount: 150,
	},
	{
		id: "1253",
		date: "23 авг 2023",
		time: "13:30",
		status: "fullfilled",
		progress: 67,
		comment: "Какой то комментарий от пользователя в несколько строчек",
		hasVideo: false,
		thiefAmount: 2,
		incidentsAmount: 15,
	},
	{
		id: "33",
		date: "24 авг 2023",
		time: "12:00",
		status: "pending",
		progress: 23,
		comment: "Какой то комментарий от пользователя в несколько строчек",
		hasVideo: true,
		thiefAmount: 0,
		incidentsAmount: 150,
	},
	{
		id: "1787",
		date: "23 авг 2023",
		time: "13:30",
		status: "fullfilled",
		progress: 43,
		comment: "Какой то комментарий от пользователя в несколько строчек",
		hasVideo: false,
		thiefAmount: 2,
		incidentsAmount: 15,
	},
];
