import SettingsSchema from '../schemas/settingsSchema'
import * as settingsActions from '../actions/settingsActions'

const initialState = new SettingsSchema()

export default (state = initialState, action) => {
  switch (action.type) {
    case settingsActions.SETTINGS_SET_SPACING:
      const {
        spacing
      } = action.payload

      return state
        .set('spacing', spacing)

    default:
      return state
  }
}
