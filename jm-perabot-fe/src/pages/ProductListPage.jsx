import { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import fromApi from '../actions/fromApi'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import useFromApi from '../hooks/useFromApi'
import useResourceMapper from '../hooks/useResourceMapper'

const ProductListPage = () => {
  const categoryId = useParams().id
  const productsReq = useFromApi(fromApi.getProductsByCategory(categoryId))
  const products = useResourceMapper('product', productsReq?.sortOrder)

  useEffect(() => console.log('PRODUCTS', products), [products])

  return (
    <Layout>
      <div className="flex flex-wrap justify-between">
        {products.map(({ id, name, sku, imageUrl }) => (
          <div key={id} className="w-[49%]">
            <NavLink to={`/products/${id}`}>
              <ProductCard name={name} sku={sku} imageSrc={imageUrl} />
            </NavLink>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default ProductListPage
