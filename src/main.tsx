import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/features/presentation/App';
import './styles.css';

createRoot(document.getElementById('app') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
