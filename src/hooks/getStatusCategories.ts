import { TaskType } from "../types/types";

export const getStatusCategories = (tasks: TaskType[]) => {
	const statuses = tasks.map(task => task.status);
	return Array.from(new Set(statuses));
};
