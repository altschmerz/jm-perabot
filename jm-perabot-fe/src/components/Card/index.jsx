import React from 'react'

const Card = ({ order, label, imageSrc, alt }) => {
  return (
    <div
      className={`bg-zinc-100 flex items-center cursor-pointer px-5 py-1 mb-3 ${
        (order + 1) % 5 !== 0 ? 'mr-3' : ''
      }`}
    >
      <img src={imageSrc} alt={alt} height={80} width={80} />
      <div className="text-xl ml-8 font-medium">{label}</div>
    </div>
  )
}

export default Card
