import { Spinner } from 'react-bootstrap'
import { FaGift } from 'react-icons/fa'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import 'yet-another-react-lightbox/styles.css'
import fromApi from '../actions/fromApi'
import Layout from '../components/Layout'
import useFromApi from '../hooks/useFromApi'
import useResourceMapper from '../hooks/useResourceMapper'

const MePage = () => {
  const usersReq = useFromApi(fromApi.getMe())
  const user = useResourceMapper('user', usersReq?.sortOrder)?.[0]

  return (
    <Layout>
      <div className="mt-3">
        {usersReq?.loading ? (
          <div className="flex flex-col items-center font-medium">
            <Spinner animation="border" variant="dark" />
            <div className="mt-2">Memuat...</div>
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
                <div>{user?.address} asidnaiusndiansiodjn ioausndiani</div>
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
      </div>
    </Layout>
  )
}

export default MePage
