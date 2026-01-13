import { Spinner } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import fromApi from '../actions/fromApi'
import Layout from '../components/Layout'
import useFromApi from '../hooks/useFromApi'
import useResourceMapper from '../hooks/useResourceMapper'

const CategoryListPage = () => {
  const categoriesReq = useFromApi(fromApi.getCategories())
  const categories = useResourceMapper('category', categoriesReq?.sortOrder)

  return (
    <Layout>
      {categoriesReq?.loading ? (
        <div className="flex flex-col items-center font-medium">
          <Spinner animation="border" variant="dark" />
          <div className="mt-2">Memuat...</div>
          <div>Mohon tunggu sebentar</div>
        </div>
      ) : (
        <div>
          <div className="section-title text-center mt-2 mb-4">Kategori</div>

          <div className="grid grid-cols-2 gap-3">
            {categories?.map(({ id, name }) => (
              <div
                key={id}
                className="
                  h-20 bg-zinc-100
                  flex justify-center items-center text-center 
                  font-medium text-sm 
                  px-3
                "
              >
                <NavLink to={`/categories/${id}`}>
                  <div>{name}</div>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  )
}

export default CategoryListPage
