import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import M from "materialize-css";
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { setEosUsername } from '../../store/actions/profileActions'


class Profile extends Component {
	state = {

	}

	componentDidMount(){

	}

	showProps = () => {
		console.log(this.props)
	}

	setEosUsername = () => {
		this.props.setEosUsername(this.eosUsername.value);
		this.eosUsername.value = '';
	}


	render() {
		if (!this.props.auth.uid) return <Redirect to='/signin' />
		return (
			<div className="container">
				<div className="row section">
					<h5>Eos account name:</h5>
					<div className="input-field col s12">
						<i className="material-icons prefix">account_circle</i>
						<input ref={eosUsername => { this.eosUsername = eosUsername }} id="eosUsername" type="text" className="validate" placeholder={this.props.profile.eosUsername} />
						<span className="helper-text" data-error="wrong" data-success="right">Add your Eos username</span>
					</div>
					<div className="center-align">
						<button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.setEosUsername}>Set
						<i className="material-icons right">change_history</i>
						</button>
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
		userProfile: state.userProfile
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setEosUsername: (eosUsername) => dispatch(setEosUsername(eosUsername))
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect((state) => {
		return [

	  ]
	})
)(Profile)
