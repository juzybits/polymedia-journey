import ReactDOM from 'react-dom/client';
import { WalletKitProvider } from '@mysten/wallet-kit';
import { App } from './App';

ReactDOM
    .createRoot( document.getElementById('app') as Element )
    .render(
        <WalletKitProvider>
            <App />
        </WalletKitProvider>
    );
