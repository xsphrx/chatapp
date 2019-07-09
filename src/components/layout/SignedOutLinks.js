import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
	return (
		<div>
			<li><NavLink to='/'>Log in</NavLink></li>
			<li><NavLink to='/'>Sign up</NavLink></li>
		</div>
	)
}

export default SignedOutLinks
