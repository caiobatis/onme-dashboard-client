import { getAddressResource } from "../lib/api"


export const getAddress = cep => {
  return getAddressResource(cep)
    .then(res => {
      return res.data
    })
    .catch(res => {
      console.log(res)
      return res
    })
}

// export async function getAddress (cep) {
//   const {
//     name, email, password
//   } = values
  
//   try {
//     await firebase.register(name, email, password)
//     // firebase.addQuote(quote)
//   } catch (err) {
//     console.log(err.message)
//   }
// }