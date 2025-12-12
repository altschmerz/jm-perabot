import fromApi from '../actions/fromApi'
import Layout from '../components/Layout'
import useFromApi from '../hooks/useFromApi'
import useResourceMapper from '../hooks/useResourceMapper'

const CategoryListPage = () => {
  const categoriesReq = useFromApi(fromApi.getCategories())
  const categories = useResourceMapper('category', categoriesReq?.sortOrder)

  return (
    <Layout>
      <div className="flex flex-wrap justify-between">
        {categories?.map(({ id, name }) => (
          <div
            key={id}
            className="bg-zinc-100 cursor-pointer p-[1rem] mb-3 w-[10rem] text-lg font-medium text-center"
          >
            <div>{name}</div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default CategoryListPage
