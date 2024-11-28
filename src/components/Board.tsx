import { Box, CardHeader, Typography, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Task from './Task';

import { TaskType } from '../types/types';

interface BoardProps {
	status: string;
	tasks: TaskType[];
}

const Board: React.FC<BoardProps> = ({ status, tasks }) => {
	return (
		<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
			<Card sx={{ width: 1 }}>
				<CardHeader
					title={
						<Box sx={{ display: "col" }}>
							<Typography>{status}</Typography>
							<Typography>{tasks.length}</Typography> {/* Show task count */}
						</Box>
					}
					action={
						<Box>
							<IconButton aria-label="more">
								<MoreHorizIcon />
							</IconButton>
							<IconButton aria-label="add">
								<AddIcon />
							</IconButton>
						</Box>
					}
				/>
				<CardContent>
					{tasks.map((task: TaskType) => (
						<Task key={task.id} task={task} />
					))}
				</CardContent>
			</Card>
		</Grid>
	);
};

export default Board;
