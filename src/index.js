import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ColorModeScript, ChakraProvider } from '@chakra-ui/react'
import theme from "./theme"
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    </ChakraProvider>
  </>
);

reportWebVitals();
