import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('app')
);
