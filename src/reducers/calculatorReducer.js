import {
  RECEIVE_COIN_FAIR,
  RECEIVE_COIN_FRENTE
} from '../lib/actionsTypes'

const initialState = {
  fair: {
    content: [],
    fetch: false
  },
  frente: {
    content: [],
    fetch: false
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_COIN_FAIR:
      return {
        fair: {
          content: action.payload,
          fetch: false
        } 
      }

    case RECEIVE_COIN_FRENTE:
      return {
        frente: {
          content: action.payload,
          fetch: false
        } 
      }

    default:
      return state;
  }
}