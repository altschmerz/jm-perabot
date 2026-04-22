import { useNavigate } from 'react-router-dom'
import { REFERRAL_STATUS } from '../../utils/constants'
import formatDate from '../../utils/formatDate'
import formatPrice from '../../utils/formatPrice'

function generateStatusStyles(statusId) {
  switch (statusId) {
    case 1:
      return 'bg-zinc-100'
    case 2:
      return 'bg-yellow-50 text-yellow-700'
    case 3:
      return 'bg-green-50 text-green-700'
    case 4:
      return 'bg-red-50 text-red-700'
    default:
  }
}

function generateRedemptionStatusStyles(statusId, redeemed) {
  if (statusId !== 3) return 'bg-zinc-100'

  if (redeemed) return 'bg-green-50 text-green-700'

  return 'bg-yellow-50 text-yellow-700'
}

const AdminReferralRow = ({
  transaction,
  referrer,
  amount,
  status,
  redeemed,
}) => {
  const navigate = useNavigate()

  return (
    <div
      className="bg-white rounded-xl mb-2 shadow-sm border border-gray-50 text-sm"
      onClick={() => navigate(`/transactions/${transaction?.id}`)}
    >
      <div className="font-bold border-b px-3 py-2">
        {transaction?.code?.substring(0, 8)?.toUpperCase()}
      </div>
      <div className="px-3">
        <div className="grid grid-cols-[1fr_2fr] py-2 border-b">
          <span className="text-gray-500 leading-tight">Kode Referal</span>
          <span className="">{referrer?.referralCode}</span>
        </div>

        <div className="grid grid-cols-[1fr_2fr] py-2 border-b">
          <span className="text-gray-500 leading-tight">Pemilik Kode</span>
          <span className="">{referrer?.name}</span>
        </div>

        <div className="grid grid-cols-[1fr_2fr] py-2 border-b">
          <span className="text-gray-500 leading-tight">Pembeli</span>
          <span className="">{transaction?.buyerName}</span>
        </div>

        <div className="grid grid-cols-[1fr_2fr] py-2 border-b">
          <span className="text-gray-500 leading-tight">Tanggal</span>
          <span className="">{formatDate(transaction?.date)}</span>
        </div>

        <div className="grid grid-cols-[1fr_2fr] py-2 border-b">
          <span className="text-gray-500 leading-tight">Komisi</span>
          <span className="">Rp {formatPrice(amount)}</span>
        </div>

        <div className="grid grid-cols-[1fr_2fr] py-2 border-b">
          <span className="text-gray-500 leading-tight">Status</span>
          <span
            className={`${generateStatusStyles(status)} w-fit px-3 py-0.5 text-[10px] font-bold rounded-full uppercase`}
          >
            {REFERRAL_STATUS[status]}
          </span>
        </div>

        <div className="grid grid-cols-[1fr_2fr] py-2 border-b">
          <span className="text-gray-500 leading-tight">Pencairan</span>
          <span
            className={`${generateRedemptionStatusStyles(status, redeemed)} w-fit px-3 py-0.5 text-[10px] font-bold rounded-full uppercase`}
          >
            {status !== 3
              ? '-'
              : redeemed
                ? 'SUDAH DICAIRKAN'
                : 'BELUM DICAIRKAN'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AdminReferralRow
