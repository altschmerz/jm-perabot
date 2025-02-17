import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import createSimpleReducer from '../utils/createSimpleReducer'
import authUserReducer from './authUserReducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authUser', 'announcement'],
}

/**
 * This is where all the reducers each entity type has are combined.
 * Please add/edit/remove entity types accordingly based on back-end
 * specs.
 */
const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    authUser: authUserReducer,
    category: createSimpleReducer('categories'),
    product: createSimpleReducer('products'),
  })
)

export default rootReducer
