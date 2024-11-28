# Project Board Application

This is a project board application inspired by Trello and Notion, built using React and TypeScript. It features drag-and-drop task management, task creation and editing, local storage integration, and a clean user interface using Material UI. Tasks can be managed across different statuses (e.g., "To Do", "In Progress", "Completed").

## Features

- Task Management: Create, edit, and move tasks across boards with different statuses.

- Drag and Drop: Tasks can be dragged and dropped between columns (statuses).

- Status-Based Boards: Organize tasks by status (e.g., "To Do", "In Progress", "Completed").

- Dynamic Boards: Add new statuses (boards) dynamically.

- Local Storage: Task data is saved in local storage for persistence between page reloads.

- Material UI: The user interface is built with Material UI components for a modern, clean look.

- Responsive Design: The application is fully responsive and works across desktop and mobile devices.

## Tools and Libraries

- React: JavaScript library for building the user interface.

- TypeScript: TypeScript ensures type safety and better developer experience.

- Material UI: UI components library for faster development and a sleek design.

- React DnD Kit: A library for implementing drag-and-drop functionality.

- Local Storage: Used to persist task data and status changes across sessions.

## Local Setup

Follow these steps to set up the project locally:

1. Clone the repository
	```git clone https://github.com/your-username/project-board-app.git```

	```cd project-board-app```

2. Install dependencies
	Make sure you have Node.js and npm installed, then run the following command to install the required dependencies:

	```npm install```

3. Run the application

	To start the development server and view the app in your browser, run:

	```npm run dev```

	The application will be available at http://localhost:5173.

4. Open the app in your browser

	Once the development server is running, open the app in your browser by navigating to http://localhost:3000.

## Features to Explore

- Add new boards: Click on the "New Board" button to create additional statuses for tasks.

- Create and move tasks: You can add tasks to any board and drag them between boards.

- Task Details: Click on a task to view and edit its details.