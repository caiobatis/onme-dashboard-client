import {
  RECEIVE_COIN_FAIR
} from '../lib/actionsTypes'

const initialState = {
  fair: {
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

    default:
      return state;
  }
}