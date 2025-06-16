import { useEffect, useState } from 'react'
import styles from './MyReports.module.css'

export default function MyReports() {
    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        // fetch('http://localhost:3000/api/reports')
        fetch('https://tarsheed-5nms.onrender.com/api/reports')
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
                        >
                            {report.imageFile && (
                                <img
                                    src={report.imageFile}
                                    alt="Report"
                                    className={styles.cardImg}
                                />
                            )}
                            <h2 className={styles.cardTitle}>{report.title}</h2>
                            <div className={styles.cardDesc}>{report.description}</div>
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
                                {new Date(report.createdAt).toLocaleString('ar-EG')}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
