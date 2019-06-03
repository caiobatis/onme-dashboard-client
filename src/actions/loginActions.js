import { loginResource, registerResource } from "../lib/api"

import firebase from '../firebase'

export const startAction = {
  type: "rotate",
  payload: true
};

export async function register (values) {
  const {
    name, email, password
  } = values
  
  try {
    await firebase.register(name, email, password)
    // firebase.addQuote(quote)
  } catch (err) {
    console.log(err.message)
  }
}
// export const login = values => {
//   return async => {
//     try {
//       await firebase.register
//     }
//     // loginResource(values)
//     //   .then(res => {
//     //     console.log(res.data.csrfToken)
//     //   })
//     //   .catch(res => {
//     //     console.log(res)
//     //   })
//   }
// }