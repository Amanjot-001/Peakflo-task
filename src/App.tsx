import { useState, useEffect } from 'react';
import { sampleTasks } from './mockdata/data';
import { loadTasksFromLocalStorage, saveTasksToLocalStorage } from './utils/localStorags';
import { getStatusCategories } from './hooks/getStatusCategories';
import { TaskType } from './types/types';

import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';

import Board from './components/Board';

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
	}, [])

	return (
		<Box sx={{ width: '100%', height: '100%', padding: 2 }}>
			<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				{statusCategories.map(status => (
					<Grid size={3} key={status}>
						<Board status={status} tasks={tasks.filter(task => task.status === status)} />
					</Grid>
				))}
			</Grid>
		</Box>
	)
}

export default App
