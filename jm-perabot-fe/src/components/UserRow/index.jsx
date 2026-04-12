import { FaGift } from 'react-icons/fa'

const UserRow = ({
  name,
  username,
  email,
  phoneNumber,
  referralCode,
  onClick,
}) => {
  return (
    <div className="bg-zinc-100 p-3 rounded" onClick={onClick}>
      <div className="font-bold">{name}</div>
      <div className=" grid grid-cols-2 gap-3 text-xs mt-1">
        <div>
          <div>{username}</div>
          <div
            className={`
              flex items-center
              font-medium
              rounded px-2
              mt-1
              ${referralCode ? 'bg-green-200' : 'bg-red-200'}
            `}
          >
            <FaGift size={10} className="mr-1" />
            <div>{referralCode ? referralCode : '-'}</div>
          </div>
        </div>
        <div className="text-right">
          <div>{phoneNumber}</div>
          <div className="mt-1">{email}</div>
        </div>
      </div>
    </div>
  )
}

export default UserRow
