import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

	useEffect(() => {
  let userId = localStorage.getItem('userId')
  if (!userId) {
    let uuid
    if (window.crypto && crypto.randomUUID) {
      uuid = crypto.randomUUID()
    } else {
      // Fallback UUID generator
      uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    }
    localStorage.setItem('userId', uuid)
  }
}, [])

  return (
    <div className="center-container">
      <img
        src="tailwindcss-mark.svg"
        alt="Tailwind CSS Logo"
        className="logo"
      />
			<h1>ترشيد</h1>
      <div className='buttons'>
        <button
          className="custom-btn btn1"
          onClick={() => navigate('/add-report')}
        >
          اضافة بلاغ
        </button>
        <button
          className="custom-btn btn2"
          onClick={() => navigate('/my-report')}
        >
          بلاغاتي
        </button>
      </div>
    </div>
  )
}
