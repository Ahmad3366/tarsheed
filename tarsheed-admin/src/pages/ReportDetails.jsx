import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

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
      const data = await res.json();
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
      <div style={{ textAlign: "center", marginTop: 40 }}>جاري التحميل...</div>
    );
  if (!report)
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>البلاغ غير موجود</div>
    );

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px 0",
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 6px 24px #38bdf855",
          padding: 40,
        }}
      >
        {report.imageFile && (
          <>
            <img
              src={report.imageFile}
              alt="Report"
              style={{
                width: "100%",
                borderRadius: 8,
                marginBottom: 24,
                maxHeight: 400,
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={handleImageClick}
              title="اضغط للتكبير أو التحميل"
            />
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <button
                onClick={handleDownload}
                style={{
                  background: "#38bdf8",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "8px 24px",
                  fontSize: 16,
                  cursor: "pointer",
                  marginRight: 8,
                }}
              >
                تحميل الصورة
              </button>
            </div>
          </>
        )}
        {showImage && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
            onClick={handleCloseImage}
          >
            <img
              src={report.imageFile}
              alt="Report Full"
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: 12,
                boxShadow: "0 2px 24px #0008",
              }}
            />
          </div>
        )}
        <h2
          style={{
            color: "#38bdf8",
            fontSize: "2.2rem",
            margin: "8px 0",
            textAlign: "center",
          }}
        >
          {report.title}
        </h2>
        <div
          style={{
            color: "#0ea5e9",
            fontWeight: 600,
            marginBottom: 16,
            textAlign: "center",
            fontSize: "1.2rem",
          }}
        >
          {report.state}
        </div>
        <div
          style={{
            color: "#333",
            marginBottom: 24,
            fontSize: "1.1rem",
            textAlign: "center",
            wordBreak: "break-word",
          }}
        >
          {report.description}
        </div>
        <div
          style={{
            fontSize: "1rem",
            color: "#888",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          {new Date(report.createdAt).toLocaleString("ar-EG")}
        </div>
        <div
          style={{
            marginBottom: 24,
            fontWeight: "bold",
            color: "#555",
            textAlign: "center",
            fontSize: "1.1rem",
          }}
        >
          الحالة الحالية:{" "}
          <span
            style={{
              color:
                report.status === "resolved"
                  ? "#22c55e"
                  : report.status === "rejected"
                  ? "#e11d48"
                  : "#f59e42",
            }}
          >
            {statusMap[report.status] || "غير معروف"}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <button
            disabled={updating || report.status === "in_progress"}
            style={{
              background: "#f59e42",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "12px 24px",
              fontSize: 18,
              cursor:
                updating || report.status === "in_progress"
                  ? "not-allowed"
                  : "pointer",
              opacity: updating || report.status === "in_progress" ? 0.7 : 1,
            }}
            onClick={() => handleUpdateStatus("in_progress")}
          >
            قيد المراجعة
          </button>
          <button
            disabled={updating || report.status === "resolved"}
            style={{
              background: "#22c55e",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "12px 24px",
              fontSize: 18,
              cursor:
                updating || report.status === "resolved"
                  ? "not-allowed"
                  : "pointer",
              opacity: updating || report.status === "resolved" ? 0.7 : 1,
            }}
            onClick={() => handleUpdateStatus("resolved")}
          >
            تم الحل
          </button>
          <button
            disabled={updating || report.status === "rejected"}
            style={{
              background: "#e11d48",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "12px 24px",
              fontSize: 18,
              cursor:
                updating || report.status === "rejected"
                  ? "not-allowed"
                  : "pointer",
              opacity: updating || report.status === "rejected" ? 0.7 : 1,
            }}
            onClick={() => handleUpdateStatus("rejected")}
          >
            مرفوض
          </button>
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "#38bdf8",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "12px 32px",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            رجوع
          </button>
        </div>
      </div>
    </div>
  );
}
