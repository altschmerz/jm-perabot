import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { PiWarningCircleBold } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import fromApi from '../actions/fromApi'
import Layout from '../components/Layout'
import UserReferralRow from '../components/UserReferralRow'
import useFromApi from '../hooks/useFromApi'
import useResourceMapper from '../hooks/useResourceMapper'
import formatPrice from '../utils/formatPrice'

const UserReferralListPage = () => {
  const navigate = useNavigate()

  const userId = useParams().id

  const referralsReq = useFromApi(fromApi.getUserReferrals(userId))
  const referrals = useResourceMapper('referral', referralsReq?.sortOrder)

  const [total, setTotal] = useState()
  const [totalUnredeemed, setTotalUnredeemed] = useState()

  useEffect(() => {
    let total = 0
    let totalUnredeemed = 0
    referrals?.forEach((referral) => {
      if (!referral.redeemed) totalUnredeemed += referral.amount
      total += referral.amount
    })
    setTotal(total)
    setTotalUnredeemed(totalUnredeemed)
  }, [referrals])

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
        return
      }

      if (authUser.id !== Number(userId)) {
        toast('Anda tidak memiliki akses untuk halaman ini', {
          id: 'restricted-access',
          icon: <PiWarningCircleBold color="red" />,
          className: 'bg-red-100',
        })
        navigate('/')
        return
      }
    }
  }, [authUser, userId, navigate])

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
                      <UserReferralRow
                        date={referral?.transactionDate}
                        buyerName={referral?.buyerName}
                        commission={referral?.amount}
                      />
                    </div>
                  ))}

                  <div className="grid grid-cols-[3fr_1fr] font-bold text-lg mt-2 text-green-600">
                    <div>Total belum dicairkan:</div>
                    <div>Rp {formatPrice(totalUnredeemed)}</div>
                  </div>
                  <div className="grid grid-cols-[3fr_1fr] font-bold text-lg mt-2">
                    <div>Total komisi:</div>
                    <div>Rp {formatPrice(total)}</div>
                  </div>
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

export default UserReferralListPage
