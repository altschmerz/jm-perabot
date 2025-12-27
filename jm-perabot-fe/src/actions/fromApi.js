import {
  ACTION_TYPES,
  HTTP_METHODS,
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

  createProduct(
    name,
    sku,
    description,
    purchasePrice,
    retailPrice,
    wholesalerPrice,
    totalStock
  ) {
    return makeApiRequestThunk(
      HTTP_METHODS.POST,
      `/products`,
      {
        name,
        sku,
        description,
        purchasePrice,
        retailPrice,
        wholesalerPrice,
        totalStock,
      },
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

  getProductsByCategory(categoryId) {
    return makeApiRequestThunk(
      HTTP_METHODS.GET,
      `/products?categoryId=${categoryId}`,
      null,
      ACTION_TYPES.MERGE
    )
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
