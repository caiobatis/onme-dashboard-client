import {
  RECEIVE_SEARCH, FETCH_COMMON, RECEIVE_PROFILE_USER
} from '../lib/actionsTypes'

const initialState = {
  search: '',
  loading: {
    fetch: false
  },
  profile: {}
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
    case RECEIVE_PROFILE_USER:
      return {
        profile: action.payload
      }

    default:
      return state;
  }
}