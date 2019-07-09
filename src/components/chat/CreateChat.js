import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import M from "materialize-css";
import { createChat } from './../../store/actions/chatActions'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'


class CreateChat extends Component {
	state = {
		chatName: '',
		members: []
	}

	componentDidMount() {
		const elems = document.querySelectorAll('.chips');
		const dataForAutocomplete = {}
		this.props.friendslist && this.props.friendslist.map(item => {
			dataForAutocomplete[item.nick] = null
		})
    this.instances = M.Chips.init(elems, {data: [{tag: 'Your friend'}, {tag: 'Another one'}], autocompleteOptions: {limit: Infinity, minLength: 3 }});
	}

	componentDidUpdate(oldProps){

	}

	onChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	onSubmit = (e) => {
		e.preventDefault();

		const loop = new Promise((resolve, reject) => {
			const arr = [this.props.profile.nick]
			this.instances[0].chipsData.forEach((item) => {
				if (item['tag'] !== 'Your friend' && item['tag'] !== 'Another one'){
					arr.push(item['tag'])
				}
			});
			this.setState({members: arr})
			resolve();
		})

		loop.then(() => {
			if(this.state.password === this.state.confirm){
				return this.props.createChat(this.state);
			}
		}).then(() => {
			if(this.props.chatError == null){
				this.props.history.push('/');
			}else{
				const toastHTML = '<span>' + this.props.chatError + '</span>';
				M.toast({html: toastHTML});
			}
		})
	}

	friendsloaded = () => {
		if(this.instances){
			const dataForAutocomplete = {}
			this.props.friendslist && this.props.friendslist.map(item => {
				dataForAutocomplete[item.nick] = null
			})
			console.log('loaded => ', dataForAutocomplete)
			this.instances[0].autocomplete.options.data = dataForAutocomplete
		}
	}



	render() {
		let {friendslist} = this.props
		if (friendslist !== null){
			this.friendsloaded()
		}
		return (
			<div className="container">
				<div className="row">
					<form className="col s12">
						<h3>Create Chat</h3>
						<div className="row">
							<div className="input-field col s12">
								<input id="chatName" type="text" onChange={this.onChange}/>
								<label htmlFor="chatName">Chat Name</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<div className="chips" onChange={()=>{this.setState({members: this.instances[0].chipsData})}}></div>
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
	console.log('create chat state => ', state)
	return {
		profile: state.firebase.profile,
		auth: state.firebase.auth,
		authError: state.auth.authError,
		friendslist: state.firestore.ordered.friendslistnew,
		chatError: state.chat.chatError
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createChat: (newChat) => dispatch(createChat(newChat))
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect((state) => {
		return [
			{ collection: 'users', doc: state.auth.uid ? state.auth.uid : '', subcollections: [{ collection: 'friends' }], storeAs: 'friendslistnew' }
	  ]
	})
)(CreateChat)
