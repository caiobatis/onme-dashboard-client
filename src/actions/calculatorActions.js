import { calculatorFairResource } from "../lib/api"


export const getCalculatorFair = () => {
  return dispatch => {
    calculatorFairResource()
      .then(res => {
        console.log(res)
      })
      .catch(res => {
        console.log(res)
      })
  }
}

export const getCalculatorFrente = city => {
  return dispatch => {
    calculatorFairResource(city)
      .then(res => {
        console.log(res)
      })
      .catch(res => {
        console.log(res)
      })
  }
}