import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

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
