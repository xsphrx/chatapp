const initState = {
	usernameError: null
}

const authReducer = (state = initState, action) => {
	switch(action.type){
		case 'EOS_USERNAME_CHANGED':
			return state;
		case 'EOS_USERNAME_ERROR':
			return {...state, usernameError: action.err}
		default:
			return state;
	}
}

export default authReducer
