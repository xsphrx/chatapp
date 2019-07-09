import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import M from "materialize-css";

class SignUp extends Component {
	state = {
		email: '',
		nick: '',
		password: '',
		confirm: ''
	}

	onChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	onSubmit = (e) => {
		e.preventDefault();
		if(this.state.password === this.state.confirm){
			this.props.signUp(this.state);
		}
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
				{this.props.loading ?
					<div className="progress">
						<div className="indeterminate"></div>
					</div>
					:
					null
				}
				<div className="row">
					<form className="col s12">
						<h3>Sign Up</h3>
						<div className="row">
							<div className="input-field col s12">
								<input id="email" type="email" className="validate" onChange={this.onChange} />
								<label htmlFor="email">Email</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input id="nick" type="text" onChange={this.onChange} />
								<label htmlFor="nick">Nick</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input id="password" type="password" className="validate" onChange={this.onChange} />
								<label htmlFor="password">Password</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input id="confirm" type="password" onChange={this.onChange} />
								<label htmlFor="confirm">Password</label>
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
	console.log('sign up state => ', state)
	return {
		auth: state.firebase.auth,
		authError: state.auth.authError,
		loading: state.auth.loading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signUp: (newUser) => dispatch(signUp(newUser))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
