import {
  ACTION_TYPES,
  HTTP_METHODS,
  makeApiRequestThunk,
} from './makeApiRequest'
class ApiCallActionCreator {
  getProductById(id) {
    return makeApiRequestThunk(
      HTTP_METHODS.GET,
      `/products/${id}`,
      null,
      ACTION_TYPES.MERGE
    )
  }

  getGameDetailsById(id) {
    return makeApiRequestThunk(
      HTTP_METHODS.GET,
      `/gameItems/details?id=${id}`,
      null,
      ACTION_TYPES.MERGE
    )
  }
}

const fromApi = new ApiCallActionCreator()

export default fromApi
