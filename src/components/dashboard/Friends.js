import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import M from "materialize-css";
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { findFriend, addFriend } from './../../store/actions/friendsActions'


class Friends extends Component {
	state = {
		nick: ''
	}

	componentDidUpdate(oldProps){
		const newProps = this.props
		
		if(oldProps.addedFriend != newProps.addedFriend ) {
			var toastHTML = '<span>' + newProps.addedFriend + ' was added to your friends list!</span><button class="btn-flat toast-action">Undo</button>';
			M.toast({html: toastHTML});
	  }
		if(oldProps.addingError !== newProps.addingError && newProps.addingError !== false){
			var toastHTML = '<span>' + newProps.addingError + '</span>';
			M.toast({html: toastHTML});
		}
	}

	componentDidMount() {
	}

	findFriends = (e) => {
		this.props.findFriend(this.nickInput.value)
		const dataForAutocomplete = {}
		this.props.matchedFriends && this.props.matchedFriends.map(item => {
			dataForAutocomplete[item] = null
		})
		var el = document.querySelector('.autocomplete');
		this.autocomplete = M.Autocomplete.init(el);
		this.autocomplete.updateData(dataForAutocomplete);
	}

	_handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			this.onSubmit(e)
		}
	}

	onSubmit = (e) => {
		if (this.nickInput.value.length > 2) {
			this.props.addFriend(this.nickInput.value)
			this.nickInput.value = ''
		}
	}


	render() {
		return (
			<div className="container section">
				<div className="row">
			    <div className="col s12">
			        <div className="input-field col s12">
			          <i className="material-icons prefix addFriendButton" onClick={this.onSubmit}>person_add</i>
								{this.state.nick}
			          <input type="text" id="autocomplete-input" className="autocomplete" onChange={this.findFriends} onKeyDown={this._handleKeyDown} ref={(nickInput) => { this.nickInput = nickInput }} autoComplete="off" />

			          <label htmlFor="autocomplete-input">Find friends</label>
			        </div>
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
		matchedFriends: state.friends.matchedFriends,
		addedFriend: state.friends.addedFriend,
		addingError: state.friends.addingError
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		findFriend: (nick) => dispatch(findFriend(nick)),
		addFriend: (nick) => dispatch(addFriend(nick))
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect((state) => {
		return [

	  ]
	})
)(Friends)
