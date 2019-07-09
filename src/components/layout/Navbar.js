import React, { Component } from 'react';
import M from "materialize-css";
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import Loading from './../Loading'

class Navbar extends Component {

	componentDidMount() {
		var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
	}

	render() {
		return (
			<div>
				<nav className="grey darken-2 navbarDiv">
					<div className="nav-wrapper container">
						<NavLink className="brand-logo" to='/'>チャット</NavLink>
						<a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
						<ul className="right hide-on-med-and-down">
							{this.props.auth.uid ?
								<span>
									<li><NavLink to='/createchat'>Create Chat</NavLink></li>
									<li><a onClick={this.props.signOut}>Log out</a></li>
									<li><NavLink to='/profile'>{this.props.profile.nick}</NavLink></li>
								</span>
							:
								<span>
									<li><NavLink to='/signin'>Log in</NavLink></li>
									<li><NavLink to='/signup'>Sign up</NavLink></li>
								</span>
							}
						</ul>
					</div>
				</nav>
				<ul className="sidenav" id="mobile-demo">
					{this.props.auth.uid ?
						<span>
							<li><NavLink to='/createchat' className="sidenav-close">Create Chat</NavLink></li>
							<li><NavLink to='/' className="sidenav-close" onClick={this.props.signOut}>Log out</NavLink></li>
							<li><NavLink to='/profile' className="sidenav-close">{this.props.profile.nick}</NavLink></li>
						</span>
					:
						<span>
							<li><NavLink to='/signin' className="sidenav-close">Log in</NavLink></li>
							<li><NavLink to='/signup' className="sidenav-close">Sign up</NavLink></li>
						</span>
					}
				</ul>
				{this.props.loading ?
					<Loading />
					:
					null
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile,
		loading: state.loading.loading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
