import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import M from "materialize-css";
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Friends from './Friends'
import FriendsList from './FriendsList'


class Dashboard extends Component {
	state = {

	}

	componentDidMount() {

	}



	render() {
		if (!this.props.auth.uid) return <Redirect to='/signin' />
		return (
			<div className="container">
				<div className="section">
					<h3>
						<NavLink to='/createchat'className="waves-effect waves-light btn-large">
							<i className="material-icons right">add</i>
							Create Chat
						</NavLink>
					</h3>
				</div>
				<div id="heightForTab">
					{this.props.chats && this.props.chats.map(key =>
						<div className="row" key={key.id}>
							<div className="card blue-grey darken-1 z-depth-2">
								<div className="card-content white-text">
									<span className="card-title">{key.name}</span>
									<p>Description</p>
								</div>
								<div className="card-action">
									<NavLink to={'/chat/'+key.id}>Start Chatting</NavLink>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		profile: state.firebase.profile,
		auth: state.firebase.auth,
		chats: state.firestore.ordered.chats
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect((state) => {
		return [
	      { collection: 'users', doc: state.auth.uid ? state.auth.uid : '', subcollections: [{ collection: 'chats' }], storeAs: 'chats' }
	  ]
	})
)(Dashboard)
