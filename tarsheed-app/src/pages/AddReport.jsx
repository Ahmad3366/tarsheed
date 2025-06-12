import React, { useRef, useState } from 'react'
import styles from './AddReport.module.css'

export default function AddReport() {
    const [image, setImage] = useState(null)
    const fileInputRef = useRef(null)

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleTakePicture = () => {
        fileInputRef.current.click()
    }

    return (
        <div className={styles.addReport}>
            {/* Part 1: Take a Picture */}
            <div className={styles.pictureSection}>
                {image ? (
                    <img
                        src={image}
                        alt="Report"
                        className={styles.previewImg}
                    />
                ) : (
                    <button className={`${styles.customBtn} ${styles.btn1}`} onClick={handleTakePicture}>
                        التقط صورة
                    </button>
                )}
                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />
            </div>

            {/* Part 2: Fill the Form */}
            <form className={styles.formSection}>
                <input
                    type="text"
                    placeholder="العنوان"
                    className={styles.input}
                />
                <textarea
                    placeholder="وصف البلاغ"
                    rows={4}
                    className={styles.textarea}
                />
                <button className={`${styles.customBtn} ${styles.btn1}`} type="submit">
                    إرسال البلاغ
                </button>
            </form>
        </div>
    )
}
