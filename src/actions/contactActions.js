import { postContact } from "../lib/api"

export const startAction = {
  type: "rotate",
  payload: true
};

export const sendContact = values => {
  return dispatch => {
    postContact(values)
      .then(res => {
        console.log(res)
      })
      .catch(res => {
        console.log(res)
      })
  }
}