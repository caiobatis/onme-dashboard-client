import axios from 'axios'

const baseURL = 'https://onme-dashboard-api.herokuapp.com/api'

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

export const loginResource = values => {
  console.log(values)
  return new Promise((resolve, reject) => 
    api.post(`/users/login`, values)
      .then((res) => resolve(res))
      .catch((res) => reject(res)))
}