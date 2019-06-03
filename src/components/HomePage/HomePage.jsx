import React from 'react'

import { Typography } from '@material-ui/core'
import firebase from '../../firebase'
import LoggedLayout from '../DefaultLayout/LoggedLayout'


function HomePage(props) {

	if(!firebase.getCurrentUsername()) {
		props.history.replace('/login')
		return null
	}

	return (
		<LoggedLayout>
			<Typography component="h1" variant="h5">
				Hello { firebase.getCurrentUsername() }
			</Typography>
		</LoggedLayout>
	)
}

export default HomePage