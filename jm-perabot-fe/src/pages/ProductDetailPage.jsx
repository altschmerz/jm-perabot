import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import fromApi from '../actions/fromApi'
import Layout from '../components/Layout'
import useFromApi from '../hooks/useFromApi'
import useResourceMapper from '../hooks/useResourceMapper'

const ProductDetailPage = () => {
  const productId = useParams().id
  const productsReq = useFromApi(fromApi.getProductById(productId))
  const product = useResourceMapper('product', productsReq?.sortOrder)?.[0]

  useEffect(() => console.log('PRODUCT', product))
  useEffect(() => console.log('PRODUCTS REQ', productsReq), [productsReq])

  return (
    <Layout>
      <div>
        <div className="mt-10">
          <div className="section-title mb-5 text-center">
            {product?.name} ({product?.sku})
          </div>
          <div className="mt-10">
            {product?.description && (
              <div>
                <div className="mt-5 section-subtitle">Deskripsi</div>
                <div>{product?.description}</div>
              </div>
            )}
            <div className="mt-5 section-subtitle">Harga</div>
            <div>Harga modal: {product?.purchasePrice}</div>
            <div>Harga ecer: {product?.retailPrice}</div>
            <div>Harga grosir: {product?.wholesalerPrice}</div>
            {product?.variants?.length && (
              <div>
                <div className="mt-5 section-subtitle mb-3">Varian</div>
                <div className="flex">
                  {product?.variants?.map((variant) => (
                    <div key={variant.id} className="mb-2">
                      <div>{variant.name}</div>
                      <div>Stok: {variant.stock}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="font-bold">Total stok: {product?.totalStock}</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetailPage
