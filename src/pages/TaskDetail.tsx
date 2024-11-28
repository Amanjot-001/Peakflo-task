import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { TaskType } from '../types/types';
import { loadTasksFromLocalStorage, saveTasksToLocalStorage } from '../utils/localStorage';

const TaskDetailsPage = () => {
	const { taskId } = useParams();
	const navigate = useNavigate();

	const [task, setTask] = useState<TaskType | null>(null);
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	useEffect(() => {
		const tasks = loadTasksFromLocalStorage();
		const taskToEdit = tasks.find((task) => task.id.toString() === taskId);
		if (taskToEdit) {
			setTask(taskToEdit);
			setTitle(taskToEdit.title);
			setDescription(taskToEdit.description);
		}
	}, [taskId]);

	const handleSave = () => {
		if (task) {
			const tasks = loadTasksFromLocalStorage();
			const updatedTasks = tasks.map((t) =>
				t.id === task.id ? { ...t, title, description } : t
			);
			saveTasksToLocalStorage(updatedTasks);
			navigate('/');
		}
	};

	const handleDelete = () => {
		if (task) {
			const tasks = loadTasksFromLocalStorage();
			const updatedTasks = tasks.filter((t) => t.id !== task.id);
			saveTasksToLocalStorage(updatedTasks);
			navigate('/');
		}
	};

	return (
		<Box sx={{ padding: 2 }}>
			{task ? (
				<>
					<Typography variant="h5">Edit Task</Typography>
					<TextField
						label="Title"
						variant="outlined"
						fullWidth
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						sx={{ marginBottom: 2 }}
					/>
					<TextField
						label="Description"
						variant="outlined"
						fullWidth
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						sx={{ marginBottom: 2 }}
					/>
					<Box sx={{ display: 'flex', gap: 2 }}>
						<Button variant="contained" onClick={handleSave}>
							Save
						</Button>
						<Button variant="outlined" color="error" onClick={handleDelete}>
							Delete
						</Button>
					</Box>
				</>
			) : (
				<Typography>Task not found</Typography>
			)}
		</Box>
	);
};

export default TaskDetailsPage;
