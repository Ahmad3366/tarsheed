import React, { useRef, useState } from 'react'
import styles from './AddReport.module.css'
import { AnimatePresence, motion } from 'framer-motion'
import { Bounce, ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

export default function AddReport() {
    const [image, setImage] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [approved, setApproved] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const fileInputRef = useRef(null)

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(URL.createObjectURL(file));
            // Convert to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageFile(reader.result); // base64 string
            };
            reader.readAsDataURL(file);
            setApproved(false);
        }
    }

    const handleTakePicture = () => {
        fileInputRef.current.click()
    }

    const handleApprove = () => {
        setApproved(true)
    }

    const handleRetake = () => {
        setImage(null)
        setImageFile(null)
        setApproved(false)
    }

		const handleSubmit = async (e) => {
			e.preventDefault()
			setSubmitting(true)
			const form = e.target
			const title = form.elements[0].value
			const state = form.elements[1].value
			const description = form.elements[2].value
			const userId = localStorage.getItem('userId') // Get userId from localStorage

			try {
				// const res = await fetch('http://localhost:3000/api/reports', {
				const res = await fetch('https://tarsheed-5nms.onrender.com/api/reports', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						title,
						state,
						description,
						imageFile,
						userId // Send userId with the request
					}),
				})
				const json = await res.json()
				if (res.ok) {
					setSubmitting(false)
					toast.success('تم إرسال البلاغ بنجاح!')
					setImage(null)
					setImageFile(null)
					setApproved(false)
				} else {
					throw new Error(json.error);
				}
			} catch (err) {
				setSubmitting(false)
				toast.error('حدث خطأ أثناء الإرسال')
			}
		}

    return (
        <div className={styles.addReport} dir="ltr">
            <ToastContainer position="top-center" closeOnClick={true} rtl={true} pauseOnHover={false} transition={Bounce}  />
            {/* Part 1: Take a Picture */}
            <div className={styles.pictureSection}>
                {image && !approved ? (
                    <>
                        <img
                            src={image}
                            alt="Report"
                            className={styles.previewImg}
                        />
                        <div>
                            <button
                                className={`${styles.customBtn} ${styles.btn1}`}
                                onClick={handleApprove}
                                style={{ marginInlineEnd: 8 }}
                            >
                                موافق
                            </button>
                            <button
                                className={styles.customBtn}
                                onClick={handleRetake}
                                style={{ background: '#e11d48' }}
                            >
                                إعادة الالتقاط
                            </button>
                        </div>
                    </>
                ) : !image ? (
                    <button className={`${styles.customBtn} ${styles.btn1}`} onClick={handleTakePicture}>
                        التقط صورة
                    </button>
                ) : null}
                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />
            </div>

            {/* Part 2: Fill the Form with animation */}
            <AnimatePresence>
                {approved && (
                    <motion.form
                        className={styles.formSection}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.4 }}
                        key="report-form"
                        onSubmit={handleSubmit}
                    >
                        <label className={styles.label}>
                            <span>
                                العنوان<span className={styles.required}>*</span>
                            </span>
                            <input
                                type="text"
                                placeholder="العنوان"
                                className={styles.input}
                                required
                            />
                        </label>
                        <label className={styles.label}>
                            <span>
                                الولاية <span className={styles.required}>*</span>
                            </span>
                            <select className={styles.input} defaultValue="KS" required>
                                <option value="KS">كسلا</option>
                                <option value="KH" disabled>الخرطوم</option>
                                <option value="SH" disabled>الشمالية</option>
                                <option value="RD" disabled>البحر الأحمر</option>
                                <option value="GD" disabled>القضارف</option>
                                <option value="GZ" disabled>الجزيرة</option>
                                <option value="NR" disabled>نهر النيل</option>
                                <option value="NB" disabled>النيل الأزرق</option>
                                <option value="NW" disabled>النيل الأبيض</option>
                                <option value="SN" disabled>سنار</option>
                                <option value="NK" disabled>شمال كردفان</option>
                                <option value="SK" disabled>جنوب كردفان</option>
                                <option value="GK" disabled>غرب كردفان</option>
                                <option value="ND" disabled>شمال دارفور</option>
                                <option value="SD" disabled>جنوب دارفور</option>
                                <option value="ED" disabled>شرق دارفور</option>
                                <option value="WD" disabled>غرب دارفور</option>
                                <option value="CD" disabled>وسط دارفور</option>
                            </select>
                        </label>
                        <label className={styles.label}>
                            وصف البلاغ
                            <textarea
                                placeholder="وصف البلاغ"
                                rows={4}
                                className={styles.textarea}
                            />
                        </label>
                        <button
                            className={`${styles.customBtn} ${styles.btn1}`}
                            type="submit"
                            disabled={submitting}
                        >
                            {submitting ? 'جاري الإرسال...' : 'إرسال البلاغ'}
                        </button>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    )
}
