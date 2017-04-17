export const SETTINGS_SET_SPACING = "SETTINGS_SET_SPACING"
export function setSpacing({spacing}) {
  return {
    type: SETTINGS_SET_SPACING,
    payload: {
      spacing
    }
  }
}
