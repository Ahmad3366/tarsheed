import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(API_URL + "/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.adminId));
        navigate("/", { replace: true });
      } else {
        setError(data.message || "فشل تسجيل الدخول");
      }
    } catch {
      setError("حدث خطأ أثناء الاتصال بالخادم");
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        <div className={styles.title}>ترشيد</div>
      </div>
      <h2 className={styles.subtitle}>تسجيل دخول المشرف</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>
          البريد الالكتروني
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          كلمة المرور
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "جاري الدخول..." : "دخول"}
        </button>
      </form>
    </div>
  );
};

export default Login;
