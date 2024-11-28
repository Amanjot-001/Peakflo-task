import { useState } from 'react';
import { Box, CardHeader, Typography, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDroppable } from '@dnd-kit/core';

import Task from './Task';
import AddTaskDialog from './AddTaskDialog';
import RenameBoardDialog from './RenameBoardDialog';

import { TaskType } from '../types/types';

interface BoardProps {
	status: string;
	tasks: TaskType[];
}

const Board: React.FC<BoardProps> = ({ status, tasks }) => {
	const [openAddDialog, setOpenAddDialog] = useState(false);
	const [openRenameDialog, setOpenRenameDialog] = useState(false);

	const { setNodeRef } = useDroppable({
		id: status,
	});

	const handleAddTaskClick = () => {
		setOpenAddDialog(true);
	};

	const handleRenameBoardClick = () => {
		setOpenRenameDialog(true);
	};

	return (
		<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
			<Card sx={{ width: 1, boxShadow: 'none' }} ref={setNodeRef}>
				<CardHeader
					title={
						<Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, alignItems: 'center' }}>
							<Typography sx={{ padding: 0.5, bgcolor: '#FBF8E6', borderRadius: 2 }}>{status}</Typography>
							<Typography sx={{ fontWeight: 100, color: '#888' }}>{tasks.length}</Typography>
						</Box>
					}
					action={
						<Box>
							<IconButton aria-label="rename" onClick={handleRenameBoardClick}>
								<MoreHorizIcon />
							</IconButton>
							<IconButton aria-label="add" onClick={handleAddTaskClick}>
								<AddIcon />
							</IconButton>
						</Box>
					}
				/>
				<CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					{tasks.map((task: TaskType) => (
						<Task key={task.id} task={task} />
					))}
				</CardContent>
			</Card>

			<AddTaskDialog
				open={openAddDialog}
				onClose={() => setOpenAddDialog(false)}
				status={status}
			/>

			<RenameBoardDialog
				open={openRenameDialog}
				onClose={() => setOpenRenameDialog(false)}
				currentStatus={status}
			/>
		</Grid>
	);
};

export default Board;
