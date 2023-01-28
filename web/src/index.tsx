import ReactDOM from 'react-dom/client';
import { App } from './app/App';

ReactDOM
    .createRoot( document.getElementById('app') as Element )
    .render(<App />);
