import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/storage'
import { getUserProfile } from './actions/commonsActions';

const config = {
  apiKey: "AIzaSyDnU14UbTMS_8Ba9yVFz9tPH1hF2f7tCm4",
  authDomain: "affable-armor-148018.firebaseapp.com",
  databaseURL: "https://affable-armor-148018.firebaseio.com",
  projectId: "affable-armor-148018",
  storageBucket: "affable-armor-148018.appspot.com",
  messagingSenderId: "892120156709",
  appId: "1:892120156709:web:a5d36771a72843c1"
}

const settings = {}

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
		this.storage = app.storage()

		this.db.settings(settings)
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(user) {
		const auth = this.auth
		await auth.createUserWithEmailAndPassword(user.email, user.password)
		return auth.currentUser.updateProfile({
			displayName: user.name,
			photoURL: user.avatarURL,
		})
	}

	async updateProfile(user, callback) {
		const auth = this.auth
		auth.currentUser.updateProfile({
			displayName: user.name,
			photoURL: user.avatarURL,
			email: user.email
		})
		this.db.doc(`users/${this.auth.currentUser.uid}`)
		.set({
			access: user.access
		})
		return setTimeout(()=>{
			return [getUserProfile(), callback]
		}, 3000)
	}

	addInformationToProfile(data) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}
		return this.db
		.doc(`users/${this.auth.currentUser.uid}`)
		.set(data)
		.then(function() {
			console.log("Document successfully written!");
		})
		.catch(function(error) {
			console.error("Error writing document: ", error);
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getInformationProfile() {
		return await this.db
		.doc(`users/${this.auth.currentUser.uid}`)
		.get()
		.then(e => {
			return e
		})
	}

	getCurrentUser() {
		const currentUser = this.auth.currentUser
		if(!currentUser)
			return {}

		return {
			photoURL: currentUser.photoURL,
			name: currentUser.displayName,
			email: currentUser.email
		}
	}
}


export default new Firebase()
