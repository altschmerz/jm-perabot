import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { FaGift } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import 'yet-another-react-lightbox/styles.css'
import fromApi from '../actions/fromApi'
import Layout from '../components/Layout'
import useFromApi from '../hooks/useFromApi'
import useResourceMapper from '../hooks/useResourceMapper'

const MePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const usersReq = useFromApi(fromApi.getMe())
  const user = useResourceMapper('user', usersReq?.sortOrder)?.[0]

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => setIsLoading(usersReq?.loading), [usersReq])

  const onSubmit = () => {
    setIsLoading(true)

    dispatch(fromApi.logout())
      .then((res) => navigate('/'))
      .catch((err) => console.warn('ERROR', err))
  }

  return (
    <Layout>
      <div className="mt-3">
        {isLoading ? (
          <div className="flex flex-col items-center font-medium">
            <Spinner animation="border" variant="dark" />
            <div className="mt-2">Memproses...</div>
            <div>Mohon tunggu sebentar</div>
          </div>
        ) : (
          <div>
            <div className="section-title text-center">Profil Saya</div>
            <div className="flex flex-col gap-3 mt-3">
              <div className="grid grid-cols-[160px_1fr] items-start">
                <div className="font-medium self-start">Nama</div>
                <div className="self-start">{user?.name}</div>
              </div>

              <div className="grid grid-cols-[160px_1fr] items-start">
                <div className="font-medium">Username</div>
                <div>{user?.username}</div>
              </div>

              <div className="grid grid-cols-[160px_1fr] items-start">
                <div className="font-medium">Email</div>
                <div>{user?.email}</div>
              </div>

              <div className="grid grid-cols-[160px_1fr] items-start">
                <div className="font-medium">Nomor Telepon</div>
                <div>{user?.phoneNumber}</div>
              </div>

              <div className="grid grid-cols-[160px_1fr] items-start">
                <div className="font-medium">Alamat</div>
                <div>{user?.address}</div>
              </div>

              <div className="grid grid-cols-[160px_1fr] items-start">
                <div className="font-medium">Kode Referal</div>
                <div>
                  {user?.referralCode ? (
                    user.referralCode
                  ) : (
                    <div className="flex items-center bg-[#FFFBEB] px-2 py-1">
                      <FaGift size={23} className="mr-3" />
                      <div className="text-[#92400E]">
                        Anda tidak memiliki kode referal
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <div
            className="bg-black px-3 py-2 text-white cursor-pointer mt-5"
            onClick={onSubmit}
          >
            Logout
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MePage
