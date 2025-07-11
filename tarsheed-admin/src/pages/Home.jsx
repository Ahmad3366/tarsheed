import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const Home = () => {
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login', { replace: true });
            return;
        }
        fetch(API_URL + '/api/reports')
            .then(res => res.json())
            .then(data => {
								console.log(data);
                setReports(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [navigate]);

    return (
        <div style={{ maxWidth: 900, margin: '40px auto', padding: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
                <img src="/tailwindcss-mark.svg" alt="App Logo" style={{ width: 100, height: 100 }} />
                <h1 style={{ color: '#38bdf8' }}>ترشيد</h1>
            </div>
            <h2 style={{ textAlign: 'center', marginBottom: 24 }}>كل البلاغات</h2>
            {loading ? (
                <div style={{ textAlign: 'center', color: '#38bdf8' }}>جاري التحميل...</div>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, boxShadow: '0 2px 12px #0001', overflow: 'hidden' }}>
                    <thead>
                        <tr style={{ background: '#f1f5f9', color: '#0ea5e9' }}>
                            <th style={{ padding: '12px 8px', borderBottom: '1px solid #eee' }}>العنوان</th>
                            <th style={{ padding: '12px 8px', borderBottom: '1px solid #eee' }}>الولاية</th>
                            <th style={{ padding: '12px 8px', borderBottom: '1px solid #eee' }}>الوصف</th>
                            <th style={{ padding: '12px 8px', borderBottom: '1px solid #eee' }}>الحالة</th>
                            <th style={{ padding: '12px 8px', borderBottom: '1px solid #eee' }}>تاريخ الإنشاء</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map(report => (
                            <tr key={report._id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '10px 8px' }}>{report.title}</td>
                                <td style={{ padding: '10px 8px' }}>{report.state}</td>
                                <td style={{ padding: '10px 8px', maxWidth: 250, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {report.description}
                                </td>
                                <td style={{ padding: '10px 8px', color: report.status === 'resolved' ? '#22c55e' : report.status === 'rejected' ? '#e11d48' : '#f59e42', fontWeight: 'bold' }}>
                                    {report.status === 'resolved' ? 'تم الحل' : report.status === 'rejected' ? 'مرفوض' : 'قيد المراجعة'}
                                </td>
                                <td style={{ padding: '10px 8px', fontSize: '0.95rem', color: '#888' }}>
                                    {new Date(report.createdAt).toLocaleString('ar-EG')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Home;