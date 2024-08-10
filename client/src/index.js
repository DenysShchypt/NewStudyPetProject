import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './index.css';
import store from './store';
import { useMode } from './theme';
const container = document.getElementById('root');
const root = createRoot(container);
export const Main = () => {
    const [theme] = useMode(); // Використовуємо хук useMode для отримання теми та функції зміни кольорової схеми
    return (_jsx(React.StrictMode, { children: _jsx(ThemeProvider, { theme: theme, children: _jsx(Provider, { store: store, children: _jsx(BrowserRouter, { children: _jsx(App, {}) }) }) }) }));
};
root.render(_jsx(Main, {}));
