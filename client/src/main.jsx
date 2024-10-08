import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import '@coinbase/onchainkit/styles.css';
import { Providers } from './utils/provider.jsx';
import { getConfig } from './utils/wagmi.js';
import { cookieToInitialState } from 'wagmi';

const initialState = cookieToInitialState(
  getConfig(),
);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Providers initialState={initialState}>
			<App />
		</Providers>
	</StrictMode>
);
