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
// export const getCoins = city => {
//   return dispatch => {
//     dispatch(fetchCoins(true))
//     getProducts(city)
//     .then((res)=> {
//       dispatch(fetchCoins(false))
//       dispatch(receiveCoins(serializeCoins(res.data)))
//     })
//     .catch(()=> dispatch(fetchCoins(false)))
//   }
// }
