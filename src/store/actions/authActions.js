export const signIn = (credentials) => {
	return (dispatch, getState, {getFirebase}) => {
		dispatch({ type: 'LOADING_START' })
		const firebase = getFirebase();

		firebase.auth().signInWithEmailAndPassword(
			credentials.email,
			credentials.password
		).then(() => {
			dispatch({ type: 'LOGIN_SUCCESS' })
		}).catch(err => {
			dispatch({ type: 'LOGIN_ERROR', err })
		}).then(() => {
			dispatch({ type: 'LOADING_END' })
		});
	}
}

export const signOut = () => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();

		firebase.auth().signOut().then(() => {
			dispatch({ type: 'SIGNOUT_SUCCESS' });
		});
	}
}

export const signUp = (newUser) => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		dispatch({ type: 'LOADING_START' })
		const firebase = getFirebase();
		const firestore = getFirestore();

		firebase.auth().createUserWithEmailAndPassword(
			newUser.email,
			newUser.password
		).then((res) => {
			return firestore.collection('users').doc(res.user.uid).set({
				nick: newUser.nick,
				friends: []
			})
		}).then(() => {
			dispatch({ type: 'SIGNUP_SUCCESS' })
		}).catch(err => {
			dispatch({ type: 'SIGNUP_ERROR', err })
		}).then(() => {
			dispatch({ type: 'LOADING_END' })
		});
	}
}
