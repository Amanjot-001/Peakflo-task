import { TaskType } from '../types/types';

export const loadTasksFromLocalStorage = (): TaskType[] => {
	const tasks = localStorage.getItem('tasks');
	return tasks ? JSON.parse(tasks) : [];
};

export const saveTasksToLocalStorage = (tasks: TaskType[]) => {
	localStorage.setItem('tasks', JSON.stringify(tasks));
};
