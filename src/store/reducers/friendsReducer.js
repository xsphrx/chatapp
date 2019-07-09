const initState = {
	matchedFriends: null,
	addedFriend: '',
	addingError: null
}

const chatReducer = (state = initState, action) => {
	switch(action.type){
		case 'FOUND_FRIENDS':
			console.log('found friends => ', action.nickArr)
			return {...state, matchedFriends: action.nickArr}
		case 'FOUND_FRIENDS_ERROR':
			console.log('error while searching for friends', action.err)
			return {...state}
		case 'ADDED_FRIEND':
			console.log('friend added => ', action.nick)
			return {...state, addingError: null, addedFriend: action.nick}
		case 'ADDED_FRIEND_ERROR':
			console.log('error while adding friend', action.err)
			return {...state, addingError: action.err}
		default:
			return state;
	}
}

export default chatReducer
