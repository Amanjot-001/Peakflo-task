import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router here
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Router>
			<App />
		</Router>
	</StrictMode>,
);
