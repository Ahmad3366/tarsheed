import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import '../App.css';

import LogoutButton from '../components/LogoutButton';

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
                setReports(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [navigate]);

    return (
        <div className="admin-container">
            <div className="admin-header">
                <img src="/logo.png" alt="App Logo" className="admin-logo" />
                <h1 className="admin-title">ترشيد</h1>
            </div>
            <LogoutButton />
            <h2 className="admin-section-title">كل البلاغات</h2>
            {loading ? (
                <div className="admin-loading">جاري التحميل...</div>
            ) : (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>اسم صاحب البلاغ</th>
                            <th>رقم صاحب البلاغ</th>
                            <th>العنوان</th>
                            <th>الولاية</th>
                            <th>الوصف</th>
                            <th>الحالة</th>
                            <th>تاريخ الإنشاء</th>
                            <th>تفاصيل</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map(report => (
                            <tr key={report._id}>
                                <td>{report.reporterName}</td>
                                <td>{report.reporterPhone}</td>
                                <td>{report.title}</td>
                                <td>{report.state}</td>
                                <td className="admin-desc">{report.description}</td>
                                <td className={
                                    report.status === 'resolved'
                                        ? 'admin-status-resolved'
                                        : report.status === 'rejected'
                                        ? 'admin-status-rejected'
                                        : 'admin-status-progress'
                                }>
                                    {report.status === 'resolved' ? 'تم الحل' : report.status === 'rejected' ? 'مرفوض' : 'قيد المراجعة'}
                                </td>
                                <td className="admin-date">
                                    {new Date(report.createdAt).toLocaleString('ar-EG')}
                                </td>
                                <td>
                                    <button
                                        className="admin-details-btn"
                                        onClick={() => navigate(`/report/${report._id}`)}
                                    >
                                        عرض كامل
                                    </button>
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