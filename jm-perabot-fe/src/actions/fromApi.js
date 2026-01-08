import {
  ACTION_TYPES,
  HTTP_METHODS,
  makeApiRequestFileThunk,
  makeApiRequestThunk,
} from './makeApiRequest'
class ApiCallActionCreator {
  createCategory(name) {
    return makeApiRequestThunk(
      HTTP_METHODS.POST,
      `/categories`,
      { name },
      ACTION_TYPES.MERGE
    )
  }

  getCategories() {
    return makeApiRequestThunk(
      HTTP_METHODS.GET,
      `/categories`,
      null,
      ACTION_TYPES.MERGE
    )
  }

  getCategoryById(id) {
    return makeApiRequestThunk(
      HTTP_METHODS.GET,
      `/categories/${id}`,
      null,
      ACTION_TYPES.MERGE
    )
  }

  createProduct(formData) {
    return makeApiRequestFileThunk(
      HTTP_METHODS.POST,
      `/products`,
      formData,
      ACTION_TYPES.MERGE
    )
  }

  getProducts() {
    return makeApiRequestThunk(
      HTTP_METHODS.GET,
      `/products`,
      null,
      ACTION_TYPES.MERGE
    )
  }

  getProductsByCategory(categoryId, page, pageSize) {
    var url = `/products?categoryId=${categoryId}`
    url += `&page=${page}&pageSize=${pageSize}`

    return makeApiRequestThunk(HTTP_METHODS.GET, url, null, ACTION_TYPES.MERGE)
  }

  getProductById(id) {
    return makeApiRequestThunk(
      HTTP_METHODS.GET,
      `/products/${id}`,
      null,
      ACTION_TYPES.MERGE
    )
  }
}

const fromApi = new ApiCallActionCreator()

export default fromApi
