import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
	return (
		<div>
			<li><a onClick={props.signOut}>Log out</a></li>
			<li><NavLink className="btn btn-floating red" to='/'>NN</NavLink></li>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	}
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
