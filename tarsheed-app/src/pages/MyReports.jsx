import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './MyReports.module.css'
import { API_URL } from '../config'

export default function MyReports() {
    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                setReports(data.filter(r => r.userId === userId))
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    const statusMap = {
        in_progress: { label: 'قيد المراجعة', color: '#f59e42' },
        resolved: { label: 'تم الحل', color: '#22c55e' },
        rejected: { label: 'مرفوض', color: '#e11d48' }
    }

    return (
        <div className={`center-container ${styles.stretch}`}>
            <h1 className={styles.title}>بلاغاتي</h1>
            <div className={styles.cardsContainer}>
                {loading ? (
                    <div className={styles.loading}>جاري التحميل...</div>
                ) : reports.length === 0 ? (
                    <div className={styles.empty}>لا توجد بلاغات بعد</div>
                ) : (
                    reports.map(report => (
                        <div
                            key={report._id}
                            className={styles.card}
                            onClick={() => navigate(`/report/${report._id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            {report.imageFile && (
                                <img
                                    src={report.imageFile}
                                    alt="Report"
                                    className={styles.cardImg}
                                />
                            )}
                            <h2 className={styles.cardTitle}>{report.title}</h2>
                            <div className={styles.cardDesc} title={report.description}>
                                {report.description && report.description.length > 60
                                    ? report.description.slice(0, 60) + '...'
                                    : report.description}
                            </div>
                            <div
                                style={{
                                    marginTop: 8,
                                    fontWeight: 'bold',
                                    color: statusMap[report.status]?.color || '#888'
                                }}
                            >
                                {statusMap[report.status]?.label || 'غير معروف'}
                            </div>
                            <div className={styles.cardDate}>
                                {new Date(report.createdAt).toLocaleString()}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
