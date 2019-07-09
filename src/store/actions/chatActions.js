export const createChat = (newChat) => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		console.log(newChat)
		const firebase = getFirebase();
		const firestore = getFirestore();

		const profile = getState().firebase.profile;
		const authorId = getState().firebase.auth.uid;

		firestore.collection('chats').add({
			author: profile.nick,
			name: newChat.chatName
		}).then(res => {
			return newChat.members.map(nick => {
				firestore.collection('users').where('nick', '==', nick).get().then(q => {
					q.forEach(doc => {
						firestore.collection('users').doc(doc.id).collection('chats').doc(res.id).set({ name: newChat.chatName })
						firestore.collection('chats').doc(res.id).collection('users').doc(doc.id).set({ nick: nick })
					})
				})
			})
		}).then(() => {
			dispatch({ type: 'CREATE_CHAT', newChat });
		}).catch(err => {
			dispatch({ type: 'CREATE_CHAT_ERROR', err });
		})
	}
}

export const addMessage = (newMessage) => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		const firestore = getFirestore();
		const nick = getState().firebase.profile.nick

		console.log('newMessage => ', newMessage)
		firestore.collection('chats').doc(newMessage.chatId).collection('messages').add({
			author: nick,
			content: newMessage.content,
			createdAt: new Date()
		}).then(() => {
			dispatch({ type: 'ADD_MESSAGE' })
		}).catch(err => {
			dispatch({ type: 'ADD_MESSAGE_ERROR', err })
		})
	}
}
