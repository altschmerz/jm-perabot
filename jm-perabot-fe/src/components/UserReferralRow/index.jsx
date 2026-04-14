import formatDate from '../../utils/formatDate'
import formatPrice from '../../utils/formatPrice'

const UserReferralRow = ({ buyerName, commission, date, redeemed }) => {
  return (
    <div className="bg-white rounded-xl p-3 mb-2 shadow-sm border border-gray-50 flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <span className="text-gray-900 font-semibold text-lg leading-tight">
          {buyerName}
        </span>
        <span className="text-gray-400 text-xs uppercase tracking-wider">
          {formatDate(date)}
        </span>
      </div>

      <div className="text-right">
        <span className={`block text-green-600 font-bold text-xl`}>
          + Rp {formatPrice(commission)}
        </span>
        <span
          className={`inline-block px-2 py-0.5 
          ${redeemed ? 'bg-zinc-100' : 'bg-green-50 text-green-700'} 
          text-[10px] font-bold rounded-full uppercase`}
        >
          {redeemed ? 'Sudah dicairkan' : 'Belum dicairkan'}
        </span>
      </div>
    </div>
  )
}

export default UserReferralRow
