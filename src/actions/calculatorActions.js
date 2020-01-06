import { calculatorFairResource, calculatorFrenteResource, calculatorSagiturResource } from "../lib/api"
import {
  RECEIVE_COIN_FRENTE,
  RECEIVE_COIN_FAIR,
  RECEIVE_COIN_SAGITUR,
  RECEIVE_COIN_VISION
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
export const receiveCoinSagitur = (data) => ({
  type: RECEIVE_COIN_SAGITUR,
  payload: data
})
export const receiveCoinVision = (data) => ({
  type: RECEIVE_COIN_VISION,
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

export const getCalculatorSagitur = () => {
  return dispatch => {
    dispatch(fetchCommon(true))
    calculatorSagiturResource()
      .then(res => {
        dispatch(receiveCoinSagitur(res.data))
        dispatch(fetchCommon(false))
      })
      .catch(res => {
        dispatch(fetchCommon(false))
      })
  }
}
export const getCalculatorVision = () => {
  return dispatch => {
    dispatch(fetchCommon(true))
    calculatorSagiturResource()
      .then(res => {
        dispatch(receiveCoinVision(res.data))
        dispatch(fetchCommon(false))
      })
      .catch(res => {
        dispatch(fetchCommon(false))
      })
  }
}