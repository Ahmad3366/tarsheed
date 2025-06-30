import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
            <img src="/tailwindcss-mark.svg" alt="App Logo" style={{ width: 100, height: 100 }} />
            <h1 style={{color: ' #38bdf8'}}>ترشيد</h1>
        </div>
    );
};

export default Home;