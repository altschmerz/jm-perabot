import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <Layout>
      <div className=" flex flex-col justify-center items-center flex-grow">
        <div className="text-8xl">404</div>
        <div className="mt-3">Laman yang Anda cari tidak ada</div>
        <button className="mt-2 underline" onClick={() => navigate('/')}>
          Kembali ke Beranda
        </button>
      </div>
    </Layout>
  )
}

export default NotFoundPage
