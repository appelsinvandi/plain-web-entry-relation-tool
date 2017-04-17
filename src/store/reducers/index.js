import { combineReducers } from 'redux-immutable'
import graph from './graphReducer'
import settings from './settingsReducer'

const rootReducer = combineReducers({
  graph,
  settings
})

export default rootReducer
