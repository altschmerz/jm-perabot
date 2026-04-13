import { FaPhoneAlt, FaRegCalendar } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import formatDate from '../../utils/formatDate'
import formatPrice from '../../utils/formatPrice'

const TransactionRow = ({
  buyerName,
  buyerPhoneNumber,
  deliveryAddress,
  total,
  date,
  onClick,
}) => {
  return (
    <div className="bg-zinc-100 p-3 rounded" onClick={onClick}>
      <div className="font-bold">{buyerName}</div>

      <div className="grid grid-cols-2 gap-3 mt-1">
        <div>
          <div className="grid grid-cols-[10px_1fr] gap-1 items-center">
            <FaPhoneAlt className="mr-2" size={10} />
            <div className="text-sm">{buyerPhoneNumber}</div>
          </div>
          <div className="grid grid-cols-[10px_1fr] gap-1 items-start">
            <FaLocationDot className="mr-2 mt-[5px]" size={10} />
            <div className="text-sm">{deliveryAddress}</div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-end">
            <FaRegCalendar className="mr-2" size={10} />
            <div className="text-sm">{formatDate(date)}</div>
          </div>
        </div>
      </div>

      <div className="text-lg font-bold text-right">
        Rp {formatPrice(total)}
      </div>
    </div>
  )
}

export default TransactionRow
