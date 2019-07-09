const initState = {
	loading: false
}

const loadingReducer = (state = initState, action) => {
	switch(action.type){
		case 'LOADING_START':
			console.log('loading')
			return {...state, loading: true}
		case 'LOADING_END':
			console.log('stopped loading')
			return {...state, loading: false}
		default:
			return state;
	}
}

export default loadingReducer
