import {
  RECEIVE_COIN_FAIR,
  RECEIVE_COIN_FRENTE,
  RECEIVE_COIN_SAGITUR,
  RECEIVE_COIN_VISION
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
  },
  sagitur: {
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
    case RECEIVE_COIN_SAGITUR:
      return merge({}, state, {
        sagitur: {
          content: action.payload
        }
      })
    case RECEIVE_COIN_VISION:
      return merge({}, state, {
        vision: {
          content: action.payload
        }
      })

    default:
      return state;
  }
}