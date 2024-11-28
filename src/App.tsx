import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { sampleTasks } from './mockdata/data';
import { loadTasksFromLocalStorage, saveTasksToLocalStorage } from './utils/localStorage';
import { getStatusCategories } from './hooks/getStatusCategories';
import { TaskType } from './types/types';

import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Board from './components/Board';
import TaskDetailsPage from './pages/TaskDetail'; // Import TaskDetailsPage
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';

function App() {
	const [tasks, setTasks] = useState<TaskType[]>([]);
	const [statusCategories, setStatusCategories] = useState<string[]>([]);
	const [newBoardStatus, setNewBoardStatus] = useState<string>('');
	const [openNewBoardDialog, setOpenNewBoardDialog] = useState<boolean>(false);
	const [activeId, setActiveId] = useState<string | null>(null); // Track active ID for DragOverlay

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

	const handleDragStart = (event: DragStartEvent) => {
		setActiveId(String(event.active.id));
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		setActiveId(null);

		if (over && active.id !== over.id) {
			const updatedTasks = [...tasks];
			const taskIndex = updatedTasks.findIndex((task) => task.id === Number(active.id));
			if (taskIndex !== -1) {
				updatedTasks[taskIndex].status = String(over.id);
				setTasks(updatedTasks);
				saveTasksToLocalStorage(updatedTasks);
			}
		}
	};

	return (
		<Routes>
			<Route
				path="/"
				element={
					<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
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

						{/* DragOverlay to display the active dragged item */}
						<DragOverlay>
							{activeId ? (
								<Box
									sx={{
										width: 1,
										padding: 1,
										backgroundColor: 'white',
										borderRadius: 1,
										boxShadow: 1,
										fontWeight: 800,
										fontSize: '1.25rem',
										lineHeight: 1.5,
										display: 'flex',
										alignItems: 'center',
										fontFamily: 'Roboto, sans-serif',
										'&:last-child': { paddingBottom: 1 },
									}}
								>
									{tasks.find(task => task.id.toString() === activeId)?.title}
								</Box>
							) : null}
						</DragOverlay>
					</DndContext>
				}
			/>
			<Route path="/task/:taskId" element={<TaskDetailsPage />} />
		</Routes>
	);
}

export default App;
