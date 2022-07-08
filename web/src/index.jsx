import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dashboard from './routes/Dashboard';
import Instruments from './routes/Instruments';
import Dividends from './routes/Dividends';
import Instrument from './routes/Instrument';
import App from './App'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Upload from './routes/Upload';
import DashboardYear from './routes/DashboardYear';
import Login from './routes/Login';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<App />} >
          <Route index element={<Dashboard />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/:year" element={<DashboardYear />} />
          <Route path="instruments">
            <Route index element={<Instruments />} />
            <Route path=":isin" element={<Instrument />} />
          </Route>
          <Route path="dividends" element={<Dividends />} />
          <Route path="upload" element={<Upload />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


