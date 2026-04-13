import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { FaPhoneAlt } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
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
import { ADMIN_ROLE_TYPE_ID } from '../utils/constants'
import formatDate from '../utils/formatDate'
import { priceFormatter } from '../utils/priceFormatter'

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
                      {priceFormatter.format(transactionItem.price)}
                    </div>
                    <div className="font-medium">
                      Rp {priceFormatter.format(transactionItem.total)}
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-2 flex justify-between font-bold">
                <div className="">Total</div>
                <div>Rp {priceFormatter.format(transaction?.total)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default TransactionDetailPage
