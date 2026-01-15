const ProductCard = ({ name, sku, imageSrc, alt }) => {
  return (
    <div className="bg-zinc-100 pb-1 rounded shadow">
      <div className="aspect-square bg-gray-100 rounded mb-2">
        <img
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover rounded-tl rounded-tr"
        />
      </div>

      <div className="bg-zinc-100 text-xs font-medium mt-2 px-2 min-h-[3rem] line-clamp-2">
        <div>{name}</div>
      </div>
    </div>
  )
}

export default ProductCard
