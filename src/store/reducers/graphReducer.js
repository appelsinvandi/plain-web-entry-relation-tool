import GraphSchema from '../schemas/graphSchema'
import * as modelActions from '../actions/modelActions'

const initialState = new GraphSchema()

export default (state = initialState, action) => {
  switch (action.type) {
    case modelActions.SET_MODEL_NAME:
      const {
        modelName,
        name
      } = action.payload

      if (!state.hasIn(['models', modelName])) {
        console.error('Model does not exist')
        return state
      } else {
        return state
          .setIn(['models', modelName, 'name'], name)
      }

    default:
      return state
  }
}
