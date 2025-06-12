import React, { useRef, useState } from 'react'

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
        <div className="add-report" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
            {/* Part 1: Take a Picture */}
            <div style={{ marginBottom: 32, textAlign: 'center' }}>
                {image ? (
                    <img src={image} alt="Report" style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: 12, marginBottom: 16 }} />
                ) : (
                    <button className="custom-btn btn1" onClick={handleTakePicture}>
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
            <form style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
                <input
                    type="text"
                    placeholder="العنوان"
                    style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', fontFamily: 'inherit' }}
                />
                <textarea
                    placeholder="وصف البلاغ"
                    rows={4}
                    style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', fontFamily: 'inherit' }}
                />
                <button className="custom-btn btn1" type="submit">
                    إرسال البلاغ
                </button>
            </form>
        </div>
    )
}
