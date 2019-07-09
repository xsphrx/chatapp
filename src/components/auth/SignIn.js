import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import M from "materialize-css";

class SignIn extends Component {
	state = {
		email: '',
		password: ''
	}

	onChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	onSubmit = (e) => {
		e.preventDefault();
		this.props.signIn(this.state);
	}

	componentDidUpdate(oldProps){
		const newProps = this.props
		if(newProps.authError !== null && oldProps.authError !== newProps.authError) {
			var toastHTML = '<span>' + newProps.authError + '</span>';
			M.toast({html: toastHTML});
		}
	}

	render() {
		if (this.props.auth.uid) return <Redirect to='/' />
		return (
			<div className="container">
				<div className="row">
					<form className="col s12">
						<h3>Sign In</h3>
						<div className="row">
							<div className="input-field col s12">
								<input id="email" type="email" className="validate" onChange={this.onChange} />
								<label htmlFor="email">Email</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input id="password" type="password" className="validate" onChange={this.onChange} />
								<label htmlFor="password">Password</label>
							</div>
						</div>
						<button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.onSubmit}>Submit
							<i className="material-icons right">send</i>
						</button>
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		loading: state.loading.loading,
		authError: state.auth.authError
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (creds) => dispatch(signIn(creds))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
