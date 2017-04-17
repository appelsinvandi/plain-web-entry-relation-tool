import rootReducer from './reducers'
import { compose, applyMiddleware, createStore } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist-immutable'
import thunk from 'redux-thunk'

export default (initialState) => {
  const middleware = [
    thunk
  ]

  const createReduxStore = window != null && window.devToolsExtension != null
    ? compose(applyMiddleware(...middleware), window.devToolsExtension(), autoRehydrate())
    : compose(applyMiddleware(...middleware), autoRehydrate())

  const store = createReduxStore(createStore)(rootReducer, initialState)
  persistStore(store)

  return store
}
