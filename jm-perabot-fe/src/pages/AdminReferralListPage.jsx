import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { PiWarningCircleBold } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import fromApi from '../actions/fromApi'
import AdminReferralRow from '../components/AdminReferralRow'
import Layout from '../components/Layout'
import useFromApi from '../hooks/useFromApi'
import useResourceMapper from '../hooks/useResourceMapper'
import { ADMIN_ROLE_TYPE_ID } from '../utils/constants'

const AdminReferralListPage = () => {
  const navigate = useNavigate()

  const referralsReq = useFromApi(fromApi.getReferrals())
  const referrals = useResourceMapper('referral', referralsReq?.sortOrder)
  const transactions = useSelector((state) => state.transaction)
  const safeUsers = useSelector((state) => state.safeUser)

  const authUser = useSelector((state) => state.authUser)

  useEffect(() => {
    if (window.location.pathname !== '/') {
      if (!authUser) {
        toast('Anda belum login. Silahkan login terlebih dahulu.', {
          id: 'not-logged-in',
          icon: <PiWarningCircleBold color="red" />,
          className: 'bg-red-100',
        })
        navigate('/')
      }

      if (authUser.role !== ADMIN_ROLE_TYPE_ID) {
        toast('Anda tidak memiliki akses untuk halaman ini', {
          id: 'restricted-access',
          icon: <PiWarningCircleBold color="red" />,
          className: 'bg-red-100',
        })
        navigate('/')
      }
    }
  }, [authUser, navigate])

  return (
    <Layout>
      <div className="mt-3">
        {referralsReq?.loading ? (
          <div className="flex flex-col items-center font-medium">
            <Spinner animation="border" variant="dark" />
            <div className="mt-2">Memuat...</div>
            <div>Mohon tunggu sebentar</div>
          </div>
        ) : (
          <div>
            <div className="section-title text-center mb-4">Daftar Referal</div>

            <div className="flex flex-col gap-2">
              {referrals.length ? (
                <div>
                  {referrals?.map((referral) => (
                    <div key={referral?.id}>
                      <AdminReferralRow
                        transaction={transactions?.[referral?.transactionId]}
                        referrer={safeUsers?.[referral?.referrerId]}
                        amount={referral?.amount}
                        status={referral?.status}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  Anda belum memiliki referal untuk saat ini
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default AdminReferralListPage
