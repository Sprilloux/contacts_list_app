import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contacts from './Contacts';
import ContactDetail from './ContactDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Contacts />} />
          <Route path="/contact/:id" element={<ContactDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
