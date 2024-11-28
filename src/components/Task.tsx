import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TaskType } from '../types/types';
import { Link } from 'react-router-dom';
import { useDraggable } from '@dnd-kit/core';

interface TaskProps {
	task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
	const { setNodeRef, listeners, attributes, transform } = useDraggable({
		id: task.id.toString(),
	});

	// Apply only translation (no scaling)
	const transformStyle = transform
		? {
			transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		}
		: {};

	return (
		<Card
			sx={{ width: 1, ...transformStyle }}
			ref={setNodeRef}
			{...listeners}
			{...attributes}
		>
			<Link to={`/task/${task.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
				<CardContent
					sx={{
						display: 'flex',
						alignItems: 'center',
						'&:last-child': { paddingBottom: 1 },
						padding: 1,
						margin: 0,
					}}
				>
					<Typography variant="h6" fontWeight={800} sx={{ padding: 0, margin: 0, lineHeight: 1 }}>
						{task.title !== "" && task.title}
					</Typography>
				</CardContent>
			</Link>
		</Card>
	);
};

export default Task;
