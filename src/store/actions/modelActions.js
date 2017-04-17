export const SET_MODEL_NAME = "SET_MODEL_NAME"
export function setModelName({modelName, name}) {
  return {
    type: SET_MODEL_NAME,
    payload: {
      modelName,
      name
    }
  }
}
