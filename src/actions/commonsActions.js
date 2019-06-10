import {
  RECEIVE_SEARCH, FETCH_COMMON
} from '../lib/actionsTypes'

export const receiveSearch = (search) => ({
  type: RECEIVE_SEARCH,
  payload: search
})

export const fetchCommon = data => ({
  type: FETCH_COMMON,
  payload: data
})