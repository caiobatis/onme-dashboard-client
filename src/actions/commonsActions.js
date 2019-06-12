import {
  RECEIVE_SEARCH, 
  FETCH_COMMON,
  RECEIVE_PROFILE_USER
} from '../lib/actionsTypes'

import firebase from '../firebase'

export const receiveSearch = (search) => ({
  type: RECEIVE_SEARCH,
  payload: search
})

export const fetchCommon = (data = false) => ({
  type: FETCH_COMMON,
  payload: data
})

export const receiveProfileUser = data => ({
  type: RECEIVE_PROFILE_USER,
  payload: data
})

export const getUserProfile = (user) => {
  return dispatch => {
    const _user = firebase.getCurrentUser()
    const info = firebase.getInformationProfile()
    console.log(_user, info)
    info.then(e=> {
      dispatch(receiveProfileUser({
        ...user, ..._user, access: e.get('access')
      }))      
    })
  }
}