import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { TaskType } from '../types/types';
import { saveTasksToLocalStorage } from '../utils/localStorage';

interface AddTaskDialogProps {
	open: boolean;
	onClose: () => void;
	status: string;
}

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ open, onClose, status }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleAddTask = () => {
		const newTask: TaskType = {
			id: Date.now(),
			title,
			description,
			status,
		};

		// Load existing tasks, add the new task, and save back to localStorage
		const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
		tasks.push(newTask);
		saveTasksToLocalStorage(tasks);

		onClose(); // Close the dialog after adding the task
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Add New Task</DialogTitle>
			<DialogContent>
				<TextField
					label="Task Title"
					fullWidth
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					sx={{ marginBottom: 2 }}
				/>
				<TextField
					label="Task Description"
					fullWidth
					multiline
					rows={4}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					sx={{ marginBottom: 2 }}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={handleAddTask}>Add Task</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddTaskDialog;
