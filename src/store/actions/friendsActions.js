export const findFriend = (nick) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();

		firestore.collection('users').orderBy('nick').startAt(nick).endAt(nick+'\uf8ff').get().then(q => {
			const promises = []
			q.forEach(doc => {
				promises.push(doc.data().nick)
			})
			return Promise.all(promises)
		}).then(nickArr => {
			dispatch({ type: 'FOUND_FRIENDS', nickArr })
		}).catch(err => {
			dispatch({ type: 'FOUND_FRIENDS_ERROR', err });
		})
	}
}

export const addFriend = (nick) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();
		const userId = getState().firebase.auth.uid;

		firestore.collection('users').where('nick', '==', nick).get().then(q => {
			if (q.empty == false){
				q.forEach(doc => {
					return firestore.collection('users').doc(userId).collection('friends').doc(doc.id).set({nick: nick});
				})
			}else {
				throw new Error('User with that nick does not exist!');
			}
		}).then(() => {
			dispatch({ type: 'ADDED_FRIEND', nick })
		}).catch(err => {
			dispatch({ type: 'ADDED_FRIEND_ERROR', err })
		})
	}
}
