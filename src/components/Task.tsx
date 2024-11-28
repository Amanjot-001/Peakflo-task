import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TaskType } from '../types/types';

interface TaskProps {
	task: TaskType; // Receive task as a prop
}

const Task: React.FC<TaskProps> = ({ task }) => {
	return (
		<Card sx={{ width: 1 }}>
			<CardContent>
				<Typography variant="h6">{task.title}</Typography>
				<Typography>{task.description}</Typography>
			</CardContent>
		</Card>
	);
};

export default Task;
