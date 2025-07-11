import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch(API_URL + "/api/users/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('user', JSON.stringify(data.adminId));
                navigate('/', { replace: true });
            } else {
                setError(data.message || 'فشل تسجيل الدخول');
            }
        } catch {
            setError('حدث خطأ أثناء الاتصال بالخادم');
        }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: 350, margin: '80px auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 12px #0001', padding: 32 }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <img
                    src="/logo.png"
                    alt="Logo"
                    style={{ width: 60, height: 60, marginBottom: 8 }}
                />
                <div style={{ fontSize: 28, fontWeight: 'bold', color: '#38bdf8', marginBottom: 8 }}>
                    ترشيد
                </div>
            </div>
            <h2 style={{ textAlign: 'center', marginBottom: 24 }}>تسجيل دخول المشرف</h2>
            <form onSubmit={handleSubmit}>
                <label style={{ display: 'block', marginBottom: 12 }}>
                    اسم المستخدم
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 4, border: '1px solid #ccc' }}
                    />
                </label>
                <label style={{ display: 'block', marginBottom: 20 }}>
                    كلمة المرور
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 4, border: '1px solid #ccc' }}
                    />
                </label>
                {error && <div style={{ color: '#e11d48', marginBottom: 12, textAlign: 'center' }}>{error}</div>}
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: 10,
                        background: '#38bdf8',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        fontSize: 16,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1
                    }}
                >
                    {loading ? 'جاري الدخول...' : 'دخول'}
                </button>
            </form>
        </div>
    );
};

export default Login;