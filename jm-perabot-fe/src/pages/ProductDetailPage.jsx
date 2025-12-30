import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
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
      <div className="mt-3">
        {productsReq?.loading ? (
          <div className="flex justify-center">
            <Spinner animation="border" variant="dark" />
          </div>
        ) : (
          <div>
            <div className="section-title mb-5 text-center">
              {product?.name}
            </div>
            <img
              src={product?.imageUrl}
              alt={product?.name}
              className="w-full aspect-square"
            />
            <div className="mt-5">
              {product?.description && (
                <div>
                  <div className="mt-5 section-subtitle">Deskripsi</div>
                  <div className="whitespace-pre-line">
                    {product?.description}
                  </div>
                </div>
              )}
              {product?.variants?.length > 0 && (
                <div>
                  <div className="mt-5 section-subtitle">Varian</div>
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
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default ProductDetailPage
