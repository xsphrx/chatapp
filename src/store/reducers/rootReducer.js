import authReducer from './authReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import chatReducer from './chatReducer'
import friendsReducer from './friendsReducer'
import loadingReducer from './loadingReducer'
import blockchainReducer from './blockchainReducer'
import profileReducer from './profileReducer'

const rootReducer = combineReducers({
	auth: authReducer,
	chat: chatReducer,
	friends: friendsReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer,
	loading: loadingReducer,
	blockchain: blockchainReducer,
	userProfile: profileReducer
});

export default rootReducer
