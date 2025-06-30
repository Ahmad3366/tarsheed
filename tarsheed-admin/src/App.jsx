import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';

function App() {
    const user = localStorage.getItem('user');

    return (
        <Router>
            <Routes>
                <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
