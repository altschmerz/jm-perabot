import { Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import fromApi from '../actions/fromApi'
import Layout from '../components/Layout'
import useFromApi from '../hooks/useFromApi'
import useResourceMapper from '../hooks/useResourceMapper'

const ProductDetailPage = () => {
  const productId = useParams().id
  const productsReq = useFromApi(fromApi.getProductById(productId))
  const product = useResourceMapper('product', productsReq?.sortOrder)?.[0]

  const hasVariants = product?.variants?.length ? true : false

  return (
    <Layout>
      <div className="mt-1">
        {productsReq?.loading ? (
          <div className="flex flex-col items-center font-medium">
            <Spinner animation="border" variant="dark" />
            <div className="mt-2">Memuat...</div>
            <div>Mohon tunggu sebentar</div>
          </div>
        ) : (
          <div>
            <div className="section-title mb-3 text-center">
              {product?.name}
            </div>
            {hasVariants ? (
              <Slider
                dots
                infinite
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                swipeToSlide
              >
                <img src={product?.imageUrl} alt={product?.name} />

                {product?.variants?.map((variant) => (
                  <img
                    key={variant?.id}
                    src={variant?.imageUrl}
                    alt={variant?.name}
                  />
                ))}
              </Slider>
            ) : (
              <img src={product?.imageUrl} alt={product?.name} />
            )}
            <div className="mt-3">
              {product?.description && (
                <div>
                  <div className="section-subtitle">Deskripsi</div>
                  <div className="text-sm whitespace-pre-line">
                    {product?.description}
                  </div>
                </div>
              )}
              {/* {product?.variants?.length > 0 && (
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
              )} */}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default ProductDetailPage
