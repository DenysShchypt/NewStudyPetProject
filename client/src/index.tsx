import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './index.css';
import store from './store';
import { useMode } from './theme';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
export const Main: React.FC = () => {
  const [theme] = useMode(); // Використовуємо хук useMode для отримання теми та функції зміни кольорової схеми

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

root.render(<Main />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
