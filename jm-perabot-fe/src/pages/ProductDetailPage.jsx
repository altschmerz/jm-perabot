import { useState } from 'react'
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
  const product = useResourceMapper(
    'shallowProduct',
    productsReq?.sortOrder,
  )?.[0]

  const variants = product?.variants

  const [imageIndex, setImageIndex] = useState(0)
  const imageCount = variants ? 1 + variants.length : 1

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
            {variants?.length ? (
              <div className="relative">
                <Slider
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                  swipeToSlide
                  afterChange={(index) => setImageIndex(index)}
                >
                  <img
                    src={product?.imageUrl}
                    alt={product?.name}
                    className="aspect-square object-contain object-center"
                  />

                  {product?.variants?.map((variant) => (
                    <img
                      key={variant?.id}
                      src={variant?.imageUrl}
                      alt={variant?.name}
                      className="aspect-square object-contain object-center"
                    />
                  ))}
                </Slider>
                <div
                  className="
                    absolute bottom-3 left-3
                    bg-zinc-100 rounded
                    px-2 py-1 mt-1
                    text-xs
                  "
                >
                  {imageIndex + 1} / {imageCount}
                </div>
              </div>
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
