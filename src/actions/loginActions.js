import { loginResource } from "../lib/api"

export const startAction = {
  type: "rotate",
  payload: true
};

export const login = values => {
  return dispatch => {
    loginResource(values)
      .then(res => {
        console.log(res)
      })
      .catch(res => {
        console.log(res)
      })
  }
}