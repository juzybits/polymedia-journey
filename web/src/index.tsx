import ReactDOM from 'react-dom/client';
import { AppWrap } from './app/App';

ReactDOM
    .createRoot( document.getElementById('app') as Element )
    .render(<AppWrap />);
