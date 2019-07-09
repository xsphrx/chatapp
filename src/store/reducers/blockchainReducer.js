const initState = {
	scatterOpened: null,
	error: null,
	completed: null
}

const blockchainReducer = (state = initState, action) => {
	switch(action.type){
		case 'SCATTER_NOT_OPENED':
			console.log('scatter not opened')
			return { ...state, error: 'Check your Scatter!' }
		case 'EOS_USERNAME_NOT_FOUND':
			return { ...state, error: 'User did not connect his eos account with ChatApp!' }
		case 'BLOCKCHAIN_ERROR':
			return { ...state, error: action.error }
		case 'TRANSACTION_COMPLETE':
			return { ...state, completed: 'Transaction completed!' }
		case 'BLOCKCHAIN_RESET':
			return { ...state }
		default:
			return state;
	}
}

export default blockchainReducer
