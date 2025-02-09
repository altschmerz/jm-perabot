import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import rootReducer from '../reducers/root'

/**
 * Function to create a store.
 */
export const createReduxStore = (configureStoreOptions) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: configureStoreOptions?.preloadedState,
    // middleware: getDefaultMiddleware({
    //   /**
    //    * Need to disable variable check.
    //    * read more here: https://github.com/rt2zz/redux-persist/issues/988
    //    */
    //   serializableCheck: false,
    // }),
  })

export const store = createReduxStore()

export const persistor = persistStore(store)

export default store
