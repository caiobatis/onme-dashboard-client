import { calculatorFairResource, calculatorFrenteResource } from "../lib/api"
import {
  RECEIVE_COIN_FRENTE,
  RECEIVE_COIN_FAIR
} from '../lib/actionsTypes'
import { fetchCommon } from "./commonsActions"

export const receiveCoinFair = (data) => ({
  type: RECEIVE_COIN_FAIR,
  payload: data
})

export const receiveCoinFrente = (data) => ({
  type: RECEIVE_COIN_FRENTE,
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
        dispatch(fetchCommon(false))
      })
  }
}

export const getCalculatorFrente = city => {
  return dispatch => {
    dispatch(fetchCommon(true))
    calculatorFrenteResource(city)
      .then(res => {
        dispatch(receiveCoinFrente(res.data))
        dispatch(fetchCommon(false))
      })
      .catch(res => {
        dispatch(fetchCommon(false))
      })
  }
}