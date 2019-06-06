import {
  RECEIVE_SEARCH
} from '../lib/actionsTypes'

const initialState = {
  search: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_SEARCH:
      return {
        search: action.payload
      };
    default:
      return state;
  }
}