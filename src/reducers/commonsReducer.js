import {
  RECEIVE_SEARCH, FETCH_COMMON, RECEIVE_PROFILE_USER
} from '../lib/actionsTypes'
import {
  merge
} from 'lodash'

const initialState = {
  search: '',
  loading: {
    fetch: false
  },
  profile: {}
}

let newState

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_SEARCH:
      return merge({}, state, {
        search: action.payload
      })

    case FETCH_COMMON:
      return merge({}, state, {
        loading: {
          fetch: action.payload
        } 
      })

    case RECEIVE_PROFILE_USER:
      newState = {...state}
      newState.profile = action.payload
      return newState

    default:
      return state;
  }
}