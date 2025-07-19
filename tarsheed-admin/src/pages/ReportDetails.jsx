import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import styles from "./ReportDetails.module.css";

const statusMap = {
  in_progress: "قيد المراجعة",
  resolved: "تم الحل",
  rejected: "مرفوض",
};

export default function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/reports/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReport(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleUpdateStatus = async (newStatus) => {
    setUpdating(true);
    try {
      const res = await fetch(`${API_URL}/api/reports/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setReport((prev) => ({ ...prev, status: newStatus }));
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleImageClick = () => setShowImage(true);
  const handleCloseImage = () => setShowImage(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = report.imageFile;
    link.download = "report-image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading)
    return (
      <div className={styles.loading}>جاري التحميل...</div>
    );
  if (!report)
    return (
      <div className={styles.notfound}>البلاغ غير موجود</div>
    );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {report.imageFile && (
          <>
            <img
              src={report.imageFile}
              alt="Report"
              className={styles.image}
              onClick={handleImageClick}
              title="اضغط للتكبير أو التحميل"
            />
            <div className={styles.imageActions}>
              <button
                onClick={handleDownload}
                className={styles.downloadBtn}
              >
                تحميل الصورة
              </button>
            </div>
          </>
        )}
        {showImage && (
          <div
            className={styles.imageModal}
            onClick={handleCloseImage}
          >
            <img
              src={report.imageFile}
              alt="Report Full"
              className={styles.imageFull}
            />
          </div>
        )}
        <h2 className={styles.title}>{report.title}</h2>
        <div className={styles.state}>{report.state}</div>
        <div className={styles.description}>{report.description}</div>
        <div className={styles.date}>
          {new Date(report.createdAt).toLocaleString("ar-EG")}
        </div>
        <div className={styles.status}>
          الحالة الحالية:{" "}
          <span
            className={
              report.status === "resolved"
                ? styles.statusResolved
                : report.status === "rejected"
                ? styles.statusRejected
                : styles.statusProgress
            }
          >
            {statusMap[report.status] || "غير معروف"}
          </span>
        </div>
        <div className={styles.actions}>
          <button
            disabled={updating || report.status === "in_progress"}
            className={`${styles.btn} ${styles.btnProgress}`}
            onClick={() => handleUpdateStatus("in_progress")}
          >
            قيد المراجعة
          </button>
          <button
            disabled={updating || report.status === "resolved"}
            className={`${styles.btn} ${styles.btnResolved}`}
            onClick={() => handleUpdateStatus("resolved")}
          >
            تم الحل
          </button>
          <button
            disabled={updating || report.status === "rejected"}
            className={`${styles.btn} ${styles.btnRejected}`}
            onClick={() => handleUpdateStatus("rejected")}
          >
            مرفوض
          </button>
        </div>
        <div className={styles.back}>
          <button
            onClick={() => navigate("/")}
            className={styles.backBtn}
          >
            رجوع
          </button>
        </div>
      </div>
    </div>
  );
}
