import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import M from "materialize-css";
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class FriendsList extends Component {
	state = {

	}

	componentDidUpdate(oldProps){

	}

	componentDidMount() {

	}

	render() {


		return (
			<div className="container">
				<div className="row">
					<div className="col s12">
						<h3>Friends</h3>
							<ul className="collection" id="heightForTab">
								{this.props.friendslist && this.props.friendslist.map(item =>
									<li className="collection-item" key={item.id}>
										{item.nick}
									</li>
								)}
							</ul>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		profile: state.firebase.profile,
		auth: state.firebase.auth,
		friendslist: state.firestore.ordered.friendslist
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
			{ collection: 'users', doc: state.auth.uid ? state.auth.uid : '', subcollections: [{ collection: 'friends' }], storeAs: 'friendslist' }
	  ]
	})
)(FriendsList)
