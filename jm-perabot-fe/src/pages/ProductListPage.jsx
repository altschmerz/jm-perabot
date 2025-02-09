import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'

const ProductListPage = () => {
  const SEARCH_RESULTS = [
    { id: 1, name: 'Product 1', sku: 'p1' },
    { id: 2, name: 'Product 2 and Much Much MUCH MUCH MUCH Longer', sku: 'p2' },
    { id: 3, name: 'Product 3', sku: 'p3' },
  ]
  return (
    <Layout>
      <div className="flex flex-wrap justify-between">
        {SEARCH_RESULTS.map(({ id, name, sku }) => (
          <div key={id} className="w-[49%]">
            <ProductCard name={name} sku={sku} />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default ProductListPage
