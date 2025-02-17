import { NavLink } from 'react-router-dom'
import fromApi from '../actions/fromApi'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import useFromApi from '../hooks/useFromApi'
import useResourceMapper from '../hooks/useResourceMapper'

const ProductListPage = () => {
  const productsReq = useFromApi(fromApi.getProducts())
  const products = useResourceMapper('product', productsReq?.sortOrder)

  return (
    <Layout>
      <div className="flex flex-wrap justify-between">
        {products.map(({ id, name, sku }) => (
          <div key={id} className="w-[49%]">
            <NavLink to={`/products/${id}`}>
              <ProductCard name={name} sku={sku} />
            </NavLink>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default ProductListPage
