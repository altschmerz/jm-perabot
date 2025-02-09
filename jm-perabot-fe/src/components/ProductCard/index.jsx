import { Truncate } from '@re-dev/react-truncate'
import React from 'react'

const ProductCard = ({ name, sku, imageSrc, alt }) => {
  return (
    <div className="bg-zinc-100 cursor-pointer px-[1rem] py-[1rem] mb-3 h-[20rem]">
      <img src={imageSrc} alt={alt} className="w-full aspect-square" />

      <div className="text-lg font-medium mt-2">
        <Truncate lines={3}>{name}</Truncate>
      </div>
      <div className="font-medium mt-2">{sku}</div>
    </div>
  )
}

export default ProductCard
