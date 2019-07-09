export const setEosUsername = (eosUsername) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();
		const userId = getState().firebase.auth.uid;

		firestore.collection('users').doc(userId).update({
			eosUsername: eosUsername
		}).then(() => {
			dispatch({ type: 'EOS_USERNAME_CHANGED' })
		}).catch(err => {
			dispatch({ type: 'EOS_USERNAME_ERROR', err })
		})
	}
}
