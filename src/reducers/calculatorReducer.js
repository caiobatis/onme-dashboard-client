import {
  RECEIVE_COIN_FAIR,
  RECEIVE_COIN_FRENTE
} from '../lib/actionsTypes'
import {
  merge
} from 'lodash'

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
      return merge({}, state, {
        fair: {
          content: action.payload
        } 
      })

    case RECEIVE_COIN_FRENTE:
      return merge({}, state, {
        frente: {
          content: action.payload
        } 
      })

    default:
      return state;
  }
}