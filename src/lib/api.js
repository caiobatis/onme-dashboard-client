import axios from 'axios'

const baseURL = ''

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