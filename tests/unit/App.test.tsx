import { describe, expect, it } from 'vitest';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/features/presentation/App';

describe('App', () => {
    it('renders the address search page', () => {
        const container = document.createElement('div');
        const root = createRoot(container);
        (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

        act(() => {
            root.render(<App />);
        });

        expect(container.querySelector('h1')?.textContent).toBe('Address Search');
    });
});
