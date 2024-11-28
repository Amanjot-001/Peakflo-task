import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { sampleTasks } from './mockdata/data';
import { loadTasksFromLocalStorage, saveTasksToLocalStorage } from './utils/localStorage';
import { getStatusCategories } from './hooks/getStatusCategories';
import { TaskType } from './types/types';

import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add'; // Material UI icon for adding new board
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Board from './components/Board';
import TaskDetailsPage from './pages/TaskDetail'; // Import TaskDetailsPage

function App() {
	const [tasks, setTasks] = useState<TaskType[]>([]);
	const [statusCategories, setStatusCategories] = useState<string[]>([]);
	const [newBoardStatus, setNewBoardStatus] = useState<string>('');
	const [openNewBoardDialog, setOpenNewBoardDialog] = useState<boolean>(false);

	useEffect(() => {
		const existingTasks = loadTasksFromLocalStorage();
		if (existingTasks.length === 0) {
			saveTasksToLocalStorage(sampleTasks);
		}

		const tasksFromStorage = loadTasksFromLocalStorage();
		setTasks(tasksFromStorage);

		const categories = getStatusCategories(existingTasks);
		setStatusCategories(categories);
	}, []);

	const handleAddNewBoard = () => {
		setOpenNewBoardDialog(true);
	};

	const handleDialogClose = () => {
		setOpenNewBoardDialog(false);
		setNewBoardStatus(''); // Reset input
	};

	const handleCreateBoard = () => {
		if (newBoardStatus.trim()) {
			const updatedCategories = [...statusCategories, newBoardStatus];
			setStatusCategories(updatedCategories);
			localStorage.setItem('statusCategories', JSON.stringify(updatedCategories));

			const newTasks = loadTasksFromLocalStorage();
			saveTasksToLocalStorage([...newTasks, { id: Date.now(), title: 'New', description: 'New', status: newBoardStatus }]);
		}
		handleDialogClose();
	};

	return (
		<Routes>
			<Route
				path="/"
				element={
					<Box sx={{ width: '100%', height: '100vh', padding: 2, display: 'flex', flexDirection: 'column' }}>
						<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
							{statusCategories.map(status => (
								<Grid size={3} key={status}>
									<Board status={status} tasks={tasks.filter(task => task.status === status)} />
								</Grid>
							))}
							{/* New board button */}
							<Grid size={3} key="new-board">
								<Box
									sx={{
										width: '100%',
										height: '100%',
										border: '2px dashed #ccc',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										cursor: 'pointer',
									}}
									onClick={handleAddNewBoard}
								>
									<IconButton>
										<AddIcon />
									</IconButton>
									<Typography variant="h6">New Board</Typography>
								</Box>
							</Grid>
						</Grid>
						<Dialog open={openNewBoardDialog} onClose={handleDialogClose}>
							<DialogTitle>Enter New Board Status</DialogTitle>
							<DialogContent>
								<TextField
									autoFocus
									margin="dense"
									label="Board Status"
									type="text"
									fullWidth
									value={newBoardStatus}
									onChange={(e) => setNewBoardStatus(e.target.value)}
								/>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleDialogClose} color="primary">
									Cancel
								</Button>
								<Button onClick={handleCreateBoard} color="primary">
									Create Board
								</Button>
							</DialogActions>
						</Dialog>
					</Box>
				}
			/>
			<Route path="/task/:taskId" element={<TaskDetailsPage />} />
		</Routes>
	);
}

export default App;
