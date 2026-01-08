import { Spinner } from 'react-bootstrap'
import { NavLink, useParams } from 'react-router-dom'
import fromApi from '../actions/fromApi'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import useFromApi from '../hooks/useFromApi'
import useResourceMapper from '../hooks/useResourceMapper'

const PAGE = 0
const PAGE_SIZE = 100

const ProductListPage = () => {
  const categoryId = useParams().id

  const categoryReq = useFromApi(fromApi.getCategoryById(categoryId))
  const category = useResourceMapper('category', categoryReq?.sortOrder)?.[0]

  const productsReq = useFromApi(
    fromApi.getProductsByCategory(categoryId, PAGE, PAGE_SIZE)
  )
  const products = useResourceMapper('product', productsReq?.sortOrder)

  return (
    <Layout>
      <div className="mt-3">
        {productsReq?.loading ? (
          <div className="flex flex-col items-center font-medium">
            <Spinner animation="border" variant="dark" />
            <div className="mt-2">Memuat...</div>
            <div>Mohon tunggu sebentar</div>
          </div>
        ) : (
          <div>
            <div className="section-title text-center mb-4">
              {category?.name}
            </div>

            <div className="flex flex-wrap justify-between">
              {products.map(({ id, name, sku, imageUrl }) => (
                <div key={id} className="w-[49%]">
                  <NavLink to={`/products/${id}`}>
                    <ProductCard name={name} sku={sku} imageSrc={imageUrl} />
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default ProductListPage
