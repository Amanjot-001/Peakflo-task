import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import { sampleTasks } from './mockdata/data';
import { loadTasksFromLocalStorage, saveTasksToLocalStorage } from './utils/localStorage';
import { getStatusCategories } from './hooks/getStatusCategories';
import { TaskType } from './types/types';

import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';

import Board from './components/Board';
import TaskDetailsPage from './pages/TaskDetail'; // Import TaskDetailsPage

function App() {
	const [tasks, setTasks] = useState<TaskType[]>([]);
	const [statusCategories, setStatusCategories] = useState<string[]>([]);

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
						</Grid>
					</Box>
				}
			/>
			<Route path="/task/:taskId" element={<TaskDetailsPage />} />
		</Routes>
	);
}

export default App;
