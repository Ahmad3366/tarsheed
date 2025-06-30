import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { API_URL } from '../config'
import styles from './ReportDetails.module.css'

export default function ReportDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [report, setReport] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${API_URL}/${id}`)
            .then(res => res.json())
            .then(data => {
                setReport(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [id])

    const handleDelete = async () => {
        if (window.confirm('هل أنت متأكد من حذف البلاغ؟')) {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
            navigate('/my-report', { replace: true })
        }
    }

    if (loading) return <div className={styles.loading}>جاري التحميل...</div>
    if (!report) return <div className={styles.notFound}>البلاغ غير موجود</div>

    return (
        <div className={styles.container}>
            {report.imageFile && (
                <img
                    src={report.imageFile}
                    alt="Report"
                    className={styles.image}
                />
            )}
            <h2 className={styles.title}>{report.title}</h2>
            <div className={styles.description}>{report.description}</div>
            <div className={styles.date}>
                {new Date(report.createdAt).toLocaleString('ar-EG')}
            </div>
            <button
                onClick={handleDelete}
                className={styles.deleteBtn}
            >
                حذف البلاغ
            </button>
        </div>
    )
}