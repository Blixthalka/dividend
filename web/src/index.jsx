import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dashboard from './routes/Dashboard';
import Instruments from './routes/Instruments';
import Dividends from './routes/Dividends';
import Portfolio from './routes/Portfolio';
import Instrument from './routes/Instrument';
import reportWebVitals from './reportWebVitals';
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Upload from './routes/Upload';


const theme = extendTheme({
  colors: {
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} >
            <Route index element={<Dashboard />} />
            <Route path="instruments">
              <Route index element={<Instruments />} />
              <Route path=":instrumentId" element={<Instrument />} />
            </Route>
            <Route path="dividends" element={<Dividends />} />
            <Route path="upload" element={<Upload />} />
            <Route path="portfolio" element={<Portfolio />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>,
  </React.StrictMode >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
