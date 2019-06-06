import {
  RECEIVE_SEARCH
} from '../lib/actionsTypes'

export const receiveSearch = (search) => ({
  type: RECEIVE_SEARCH,
  payload: search
})