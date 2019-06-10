import { calculatorFairResource, calculatorFrenteResource } from "../lib/api"

import {
  FETCH_COIN_FAIR,
  RECEIVE_COIN_FAIR
} from '../lib/actionsTypes'
import { fetchCommon } from "./commonsActions";



export const receiveCoinFair = (data) => ({
  type: RECEIVE_COIN_FAIR,
  payload: data
})


export const getCalculatorFair = () => {
  return dispatch => {
    dispatch(fetchCommon(true))
    calculatorFairResource()
      .then(res => {
        dispatch(receiveCoinFair(res.data))
        dispatch(fetchCommon(false))
      })
      .catch(res => {
        console.log(res)
        dispatch(fetchCommon(false))
      })
  }
}

export const getCalculatorFrente = city => {
  return dispatch => {
    dispatch(fetchCommon(true))
    calculatorFrenteResource(city)
      .then(res => {
        console.log(res)
        dispatch(fetchCommon(false))
      })
      .catch(res => {
        console.log(res)
        dispatch(fetchCommon(false))
      })
  }
}