import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from "axios";
import { ThemeProvider, CssBaseline } from '@mui/material'; // Import CssBaseline
import theme from './Theme.jsx'; // Your custom theme
import { Provider } from "react-redux";
import store from "./Redux/Store.jsx";
import { LoaderProvider } from './Context/LoaderContext.jsx';
import GlobalLoader from './Components/GlobalLoader.jsx';


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <LoaderProvider>
        <GlobalLoader />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </LoaderProvider>
    </Provider>
  </StrictMode>
);

