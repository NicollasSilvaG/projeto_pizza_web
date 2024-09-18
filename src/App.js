import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TelaLogin from './Pages/TelaLogin';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<TelaLogin />} />
            </Routes>
        </Router>
    );
}

export default App;
