import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { FaMoneyBill, FaPhoneAlt } from 'react-icons/fa'
import { FaLocationDot, FaTruck } from 'react-icons/fa6'
import { PiWarningCircleBold } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import 'yet-another-react-lightbox/styles.css'
import fromApi from '../actions/fromApi'
import Layout from '../components/Layout'
import useFromApi from '../hooks/useFromApi'
import useResourceMapper from '../hooks/useResourceMapper'
import {
  ADMIN_ROLE_TYPE_ID,
  TRANSACTION_DELIVERY_STATUS,
  TRANSACTION_PAYMENT_STATUS,
  TRANSACTION_STATUS,
} from '../utils/constants'
import formatDate from '../utils/formatDate'
import formatPrice from '../utils/formatPrice'

const REFERRAL_COMMISSION_PERCENT = 1

function generatePaymentStatusStyles(paymentStatusId) {
  let className = 'w-fit ml-2 px-2 py-0.5 text-xs font-bold rounded uppercase'

  switch (paymentStatusId) {
    case 1:
      className += ' bg-red-50 text-red-700'
      break
    case 2:
      className += ' bg-yellow-50 text-yellow-700'
      break
    case 3:
      className += ' bg-green-50 text-green-700'
      break
    default:
  }
  return className
}

function generateDeliveryStatusStyles(deliveryStatusId) {
  let className = 'w-fit ml-2 px-2 py-0.5 text-xs font-bold rounded uppercase'

  switch (deliveryStatusId) {
    case 1:
      className += ' bg-red-50 text-red-700'
      break
    case 2:
      className += ' bg-yellow-50 text-yellow-700'
      break
    case 3:
    case 4:
      className += ' bg-green-50 text-green-700'
      break
    default:
  }
  return className
}

function generateStatusStyles(statusId) {
  let className = 'h-fit ml-2 px-2 py-0.5 text-xs font-bold rounded uppercase'

  switch (statusId) {
    case 1:
      className += ' bg-yellow-50 text-yellow-700'
      break
    case 2:
      className += ' bg-green-50 text-green-700'
      break
    case 3:
      className += ' bg-red-50 text-red-700'
      break
    default:
  }
  return className
}

const TransactionDetailPage = () => {
  const navigate = useNavigate()

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

  const transactionId = useParams().id
  const transactionsReq = useFromApi(
    fromApi.getTransactionById(transactionId, false),
  )
  const transaction = useResourceMapper(
    'transaction',
    transactionsReq?.sortOrder,
  )?.[0]

  const referralState = useSelector((state) => state.referral)
  const referral = referralState?.[transaction?.referralId]

  return (
    <Layout>
      <div className="mt-3">
        {transactionsReq?.loading ? (
          <div className="flex flex-col items-center font-medium">
            <Spinner animation="border" variant="dark" />
            <div className="mt-2">Memuat...</div>
            <div>Mohon tunggu sebentar</div>
          </div>
        ) : (
          <div>
            <div className="shadow-[0_10px_35px_rgba(0,0,0,0.2)] p-3 rounded">
              <div className="section-title text-center">Detail Transaksi</div>
              <div className="font-bold mt-2">
                Kode Transaksi:{' '}
                {transaction?.code?.substring(0, 8)?.toUpperCase()}
              </div>
              <div className="text-sm">{formatDate(transaction?.date)}</div>
            </div>

            <div className="mt-3 shadow-[0_10px_35px_rgba(0,0,0,0.2)] p-3 rounded">
              <div className="flex justify-between items-center border-b pb-2 font-bold">
                <div>Status Transaksi</div>
                <div className={generateStatusStyles(transaction?.status)}>
                  {TRANSACTION_STATUS[transaction?.status]}
                </div>
              </div>
              <div className="grid grid-cols-[10px_1fr] gap-1 items-center mt-2">
                <FaMoneyBill size={12} />
                <div
                  className={generatePaymentStatusStyles(
                    transaction?.paymentStatus,
                  )}
                >
                  {TRANSACTION_PAYMENT_STATUS[transaction?.paymentStatus]}
                </div>
              </div>
              <div className="grid grid-cols-[10px_1fr] gap-1 items-center mt-2">
                <FaTruck size={12} />
                <div
                  className={generateDeliveryStatusStyles(
                    transaction?.deliveryStatus,
                  )}
                >
                  {TRANSACTION_DELIVERY_STATUS[transaction?.deliveryStatus]}
                </div>
              </div>
            </div>

            <div className="mt-3 shadow-[0_10px_35px_rgba(0,0,0,0.2)] p-3 rounded">
              <div className="border-b pb-2 font-bold">Informasi Pelanggan</div>
              <div className="mt-2">{transaction?.buyerName}</div>
              <div>
                <div className="grid grid-cols-[10px_1fr] gap-1 items-center mt-2">
                  <FaPhoneAlt size={12} />
                  <div className="ml-2">{transaction?.buyerPhoneNumber}</div>
                </div>
                <div className="grid grid-cols-[10px_1fr] gap-1 items-start mt-2">
                  <FaLocationDot className="mt-[6px]" size={12} />
                  <div className="ml-2">{transaction?.deliveryAddress}</div>
                </div>
              </div>
            </div>

            <div className="mt-3 shadow-[0_10px_35px_rgba(0,0,0,0.2)] p-3 rounded">
              <div className="border-b pb-2 font-bold">
                Daftar Barang ({transaction?.transactionItems?.length})
              </div>
              {transaction?.transactionItems?.map((transactionItem) => (
                <div className="border-b py-2">
                  <div className="font-medium">{transactionItem.name}</div>
                  {transactionItem?.note && (
                    <div className="text-xs">{transactionItem?.note}</div>
                  )}
                  <div className="flex justify-between text-sm">
                    <div>
                      {transactionItem.quantity} x Rp{' '}
                      {formatPrice(transactionItem.price)}
                    </div>
                    <div className="font-medium">
                      Rp {formatPrice(transactionItem.total)}
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-2 flex justify-between font-bold">
                <div>Total</div>
                <div>Rp {formatPrice(transaction?.total)}</div>
              </div>
            </div>

            <div className="mt-3 shadow-[0_10px_35px_rgba(0,0,0,0.2)] p-3 rounded">
              <div className="border-b pb-2 font-bold">Komisi Referal </div>

              {referral ? (
                <div>
                  {transaction?.transactionItems?.map(
                    (transactionItem) =>
                      transactionItem.eligibleForReferral && (
                        <div className="border-b py-2">
                          <div className="font-medium">
                            {transactionItem.name}
                          </div>
                          <div className="flex justify-between text-sm">
                            <div>
                              {REFERRAL_COMMISSION_PERCENT}% x Rp{' '}
                              {formatPrice(transactionItem.total)}
                            </div>
                            <div className="font-medium">
                              Rp{' '}
                              {formatPrice(
                                (REFERRAL_COMMISSION_PERCENT / 100) *
                                  transactionItem.total,
                              )}
                            </div>
                          </div>
                        </div>
                      ),
                  )}
                  <div className="pt-2 flex justify-between font-bold">
                    <div>Total</div>
                    <div>Rp {formatPrice(referral?.amount)}</div>
                  </div>
                </div>
              ) : (
                <div className="pt-2">Tidak ada komisi referal</div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default TransactionDetailPage
