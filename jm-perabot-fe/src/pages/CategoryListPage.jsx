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
        <div className="flex justify-center">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        <div>
          <div className="section-title text-center mt-2 mb-4">Kategori</div>

          <div className="flex flex-wrap justify-between">
            {categories?.map(({ id, name }) => (
              <div
                key={id}
                className="bg-zinc-100 cursor-pointer p-[1rem] mb-3 w-[10rem] text-lg font-medium text-center"
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
