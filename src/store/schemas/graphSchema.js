import { Record, Map } from 'immutable'
import ModelSchema from './modelSchema'

export default Record({
  models: new Map(new ModelSchema())
}, 'graph')
