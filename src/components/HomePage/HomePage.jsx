import React from 'react'
import { connect } from "react-redux"
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
				<div className={styles.image}>
					<img src={profile.photoURL} alt={profile.name}/>
				</div>
				<div className={styles.content}>
					<h1 className={styles.h1}>
						Olá <b>{profile.name}</b>,
					</h1>
					<p className={styles.p}>Onme Dashboard, uma nova ferramenta em desenvolvimento</p>
				</div>
			</div>
		</LoggedLayout>
	)
}

const mapStateToProps = state => ({
  profile: state.commonsReducer.profile || {}
})


export default connect(mapStateToProps)(HomePage);