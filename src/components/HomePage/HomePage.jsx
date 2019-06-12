import React from 'react'
import { connect } from "react-redux"
import { Typography } from '@material-ui/core'
import firebase from '../../firebase'
import LoggedLayout from '../DefaultLayout/LoggedLayout'
import styles from './HomePage.scss'

function HomePage(props) {
	const {
		profile
	} = props

	return (
		<LoggedLayout
			title="Home"
		>
			<div className={styles.wellcome}>
				<h1 className={styles.h1}>
					Olá <b>{profile.name}</b>,
				</h1>
				<p className={styles.p}>Onme Dashboard, uma nova ferramenta em desenvolvimento</p>
			</div>
			<Typography component="h1" variant="h5">
			</Typography>
		</LoggedLayout>
	)
}

const mapStateToProps = state => ({
  profile: state.commonsReducer.profile || {}
})


export default connect(mapStateToProps)(HomePage);