import {
  ACTION_TYPES,
  HTTP_METHODS,
  makeApiRequestFileThunk,
  makeApiRequestThunk,
} from './makeApiRequest'
class ApiCallActionCreator {
  login(data) {
    return makeApiRequestThunk(
      HTTP_METHODS.POST,
      `/auth/login`,
      data,
      ACTION_TYPES.MERGE,
    )
  }

  logout(data) {
    return makeApiRequestThunk(
      HTTP_METHODS.POST,
      `/auth/logout`,
      data,
      ACTION_TYPES.MERGE,
    )
  }

  createUser(data) {
    return makeApiRequestThunk(
      HTTP_METHODS.POST,
      `/users`,
      data,
      ACTION_TYPES.MERGE,
    )
  }

  getMe() {
    return makeApiRequestThunk(
      HTTP_METHODS.GET,
      `/users/me`,
      null,
      ACTION_TYPES.MERGE,
    )
  }

  getUserById(id, safeUser) {
    return makeApiRequestThunk(
      HTTP_METHODS.GET,
      `/users/${id}?safeUser=${safeUser}`,
      null,
      ACTION_TYPES.MERGE,
    )
  }

  getUsers(search) {
    return makeApiRequestThunk(
      HTTP_METHODS.GET,
      `/users?search=${search}`,
      null,
      ACTION_TYPES.MERGE,
    )
  }

  assignReferralCode(data) {
    return makeApiRequestThunk(
      HTTP_METHODS.POST,
      `/users/referral`,
      data,
      ACTION_TYPES.MERGE,
    )
  }

  createCategory(name) {
    return makeApiRequestThunk(
      HTTP_METHODS.POST,
      `/categories`,
      { name },
      ACTION_TYPES.MERGE,
    )
  }

  getCategories() {
    return makeApiRequestThunk(
      HTTP_METHODS.GET,
      `/categories`,
      null,
      ACTION_TYPES.MERGE,
    )
  }

  getCategoryById(id) {
    return makeApiRequestThunk(
      HTTP_METHODS.GET,
      `/categories/${id}`,
      null,
      ACTION_TYPES.MERGE,
    )
  }

  createProduct(formData) {
    return makeApiRequestFileThunk(
      HTTP_METHODS.POST,
      `/products`,
      formData,
      ACTION_TYPES.MERGE,
    )
  }

  getProducts() {
    return makeApiRequestThunk(
      HTTP_METHODS.GET,
      `/products`,
      null,
      ACTION_TYPES.MERGE,
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
      ACTION_TYPES.MERGE,
    )
  }

  createTransaction(data) {
    return makeApiRequestThunk(
      HTTP_METHODS.POST,
      `/transactions`,
      data,
      ACTION_TYPES.MERGE,
    )
  }

  getTransactions() {
    return makeApiRequestThunk(
      HTTP_METHODS.GET,
      `/transactions`,
      null,
      ACTION_TYPES.MERGE,
    )
  }
}

const fromApi = new ApiCallActionCreator()

export default fromApi
