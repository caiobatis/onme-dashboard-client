import React, { useEffect } from 'react';
import firebase from '../../firebase'

function UnloggedLayout(props) {
  useEffect(() => {
    logout()
  })

  async function logout() {
    await firebase.logout()
  }

  return (
    <div>
      {props.children}
    </div>
  )

}
export default UnloggedLayout