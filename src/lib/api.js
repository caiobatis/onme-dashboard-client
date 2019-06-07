import axios from 'axios'


// const baseURL = 'http://webservice.enfoque.com.br/wsFoccoCambio/cotacoes.asmx/MoedasJSON?login=wsFoccoCambio2016&senha=Moedas2016'
const baseURL = 'http://localhost:5000/api'
const enfoque = 'http://webservice.enfoque.com.br/wsFoccoCambio/cotacoes.asmx/MoedasJSON'
const params = '?login=wsFoccoCambio2016&senha=Moedas2016'

const api = axios.create({
  baseURL
})

export const postContact = values => {
  console.log(values)
  return new Promise((resolve, reject) => 
    api.post(`/contact`, values)
      .then((res) => resolve(res))
      .catch((res) => reject(res)))
}

export const calculatorFairResource = () => {
  return new Promise((resolve, reject) => 
    axios.get(`${enfoque}${params}`)
      .then((res) => resolve(res))
      .catch((res) => reject(res)))
}

// export const registerResource = values => {
//   const {
//     name, email, password
//   } = values

//   return new Promise((resolve, reject) => {
//     try {
//       resolve(firebase.register(name, email, password))
//       // firebase.addQuote(quote)
//     } catch {
//       // reject(err.message)
//     }
//   })
// }