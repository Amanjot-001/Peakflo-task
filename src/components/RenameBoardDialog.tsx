import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { TaskType } from '../types/types';
import { saveTasksToLocalStorage } from '../utils/localStorage';

interface RenameBoardDialogProps {
	open: boolean;
	onClose: () => void;
	currentStatus: string;
}

const RenameBoardDialog: React.FC<RenameBoardDialogProps> = ({ open, onClose, currentStatus }) => {
	const [newStatus, setNewStatus] = useState(currentStatus);

	const handleRenameBoard = () => {
		const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
		const updatedTasks = tasks.map((task: TaskType) =>
			task.status === currentStatus ? { ...task, status: newStatus } : task
		);
		saveTasksToLocalStorage(updatedTasks);

		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Rename Board</DialogTitle>
			<DialogContent>
				<TextField
					fullWidth
					value={newStatus}
					onChange={(e) => setNewStatus(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={handleRenameBoard}>Rename</Button>
			</DialogActions>
		</Dialog>
	);
};

export default RenameBoardDialog;
