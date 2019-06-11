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

export const fetchCommon = data => ({
  type: FETCH_COMMON,
  payload: data
})

export const receiveProfileUser = data => ({
  type: RECEIVE_PROFILE_USER,
  payload: data
})

export const getUserProfile = (user) => {
  return dispatch => {
    firebase
    .getCurrentUser()
    .then((res) => {
      const path = firebase.storage.ref(res.avatar);
      console.log(res.avatar)
      path
      .getDownloadURL()
      .then((url) => { 
        dispatch(receiveProfileUser({
          ...user,
          ...res,
          avatar: url
        }))
      })

    })
    .catch((error)=> (
      alert(error.message)
    ))
  }
}