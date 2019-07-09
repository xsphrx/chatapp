const initState = {
	chatError: null
}

const chatReducer = (state = initState, action) => {
	switch(action.type){
		case 'CREATE_CHAT':
			return {...state}
		case 'CREATE_CHAT_ERROR':
			console.log('error while creating chat', action.err)
			return {...state, chatError: action.err.message}
		case 'ADD_MESSAGE':
			console.log('message added')
			return {...state}
		case 'ADD_MESSAGE_ERROR':
			console.log('error while adding message', action.err)
			return {...state}
		default:
			return state;
	}
}

export default chatReducer
