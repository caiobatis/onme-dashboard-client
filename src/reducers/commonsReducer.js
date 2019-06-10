import {
  RECEIVE_SEARCH, FETCH_COMMON
} from '../lib/actionsTypes'

const initialState = {
  search: '',
  loading: {
    fetch: false
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_SEARCH:
      return {
        search: action.payload
      }
    case FETCH_COMMON:
      return {
        loading: {
          fetch: action.payload
        } 
      }

    default:
      return state;
  }
}