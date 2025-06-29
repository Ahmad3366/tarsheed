import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import AddReport from './pages/AddReport'
import MyReports from './pages/MyReports'
import { AnimatePresence, motion } from 'motion/react'

function AnimatedRoutes() {
    const location = useLocation()
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
            >
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/add-report" element={<AddReport />} />
                    <Route path="/my-report" element={<MyReports />} />
                </Routes>
            </motion.div>
        </AnimatePresence>
    )
}

function App() {
    return (
        <Router>
            <AnimatedRoutes />
        </Router>
    )
}

export default App
