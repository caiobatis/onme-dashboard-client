import React from 'react'
import { Typography } from '@material-ui/core'
import firebase from '../../firebase'
import LoggedLayout from '../DefaultLayout/LoggedLayout'
import styles from './HomePage.scss'

function HomePage(props) {

	if(!firebase.getCurrentUsername()) {
		props.history.replace('/login')
		return null
	}

	return (
		<LoggedLayout
			title="Home"
		>
			<div className={styles.wellcome}>
				<h1 className={styles.h1}>
					Olá <b>{firebase.getCurrentUsername()}</b>,
				</h1>
				<p className={styles.p}>Onme Dashboard, uma nova ferramenta em desenvolvimento</p>
			</div>
			<Typography component="h1" variant="h5">
			</Typography>
		</LoggedLayout>
	)
}

export default HomePage