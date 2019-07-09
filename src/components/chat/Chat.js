import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import M from "materialize-css";
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Messages from './Messages'
import { addMessage } from './../../store/actions/chatActions'
import Options from './Options'
import { sendEos, reset } from './../../store/actions/blockchainActions'

class Chat extends Component {
	state = {
		chatId: this.props.match.params.id,
		content: '',
		options: false
	}

	componentDidMount() {
		var fixedActionBtn = document.querySelector('.fixed-action-btn');
    M.FloatingActionButton.init(fixedActionBtn, {
      direction: 'left'
    });
		this.resizeChat();
	}

	onChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
		this.resizeChat()
	}

	_handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e)
    }
  }

	onSubmit = (e) => {
		e.preventDefault();
		this.props.addMessage(this.state)
		this.setState({content: ''})
		this.chatMessage.value = '';
		this.resizeChat();
	}

	showOptions = () => {
		this.setState({options: true})
	}




	resizeChat = () => {

		const textarea = document.querySelector('.chat-textarea')

		textarea.style.height = "";
		textarea.style.height = Math.min(textarea.scrollHeight, 70) + "px";



		const navbarHeight = document.querySelector('.navbarDiv').offsetHeight
		const messageInputHeight = document.querySelector('.chat-textarea').offsetHeight
		const height = `calc(98vh - ${navbarHeight}px - ${messageInputHeight}px)`;
		console.log('height', height)
		document.querySelector('.chat').style.height = height
		console.log('navbarHeight', navbarHeight, 'messageInputHeight', messageInputHeight)
		console.log(document.querySelector('.chat').style)
	}

	render() {

		const { messages } = this.props;

		return (
			<div className="chat">

				<nav className="nav-extended">
					<div className="nav-content">
						<a className="btn-floating btn-small halfway-fab waves-effect waves-light teal" onClick={this.showOptions}>
							<i className="material-icons small">expand_more</i>
						</a>
					</div>
				</nav>

				{this.state.options ?
					<Options close={() => {this.setState({options: false})}} users={this.props.users} sendEos={(to, amount) => this.props.sendEos(to, amount, this.props.match.params.id)} loading={this.props.loading} error={this.props.blockchain.error} completed={this.props.blockchain.completed} reset={this.props.reset} currentUser={this.props.profile}/>
				:
					null
				}


				<div className="messages">
					<Messages messages={messages} user={this.props.profile.nick} chatId={this.props.match.params.id} />
				</div>
	      <div className="messageInput">


          <textarea ref={chatMessage => { this.chatMessage = chatMessage }} className="chat-textarea grey lighten-2 text-black" id="content" placeholder="message..." onChange={this.onChange} value={this.state.content} onKeyDown={this._handleKeyDown}></textarea>
					<div className="messageInput-btnOuter">
					<i className="material-icons small messageInput-btnInner" onClick={this.onSubmit}>send</i>
					</div>


	      </div>



			</div>
		)
	}
}

const mapStateToProps = (state) => {
	console.log('here => ', state)
	return {
		profile: state.firebase.profile,
		auth: state.firebase.auth,
		messages: state.firestore.ordered.messages,
		users: state.firestore.ordered.users,
		blockchain: state.blockchain,
		loading: state.loading.loading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addMessage: (newMessage) => dispatch(addMessage(newMessage)),
		sendEos: (to, amount, chatId) => dispatch(sendEos(to, amount, chatId)),
		reset: () => dispatch(reset())
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect((state) => {
		return [
				{ collection: 'chats', doc: state.match.params.id, storeAs: 'chatDetails' },
				{ collection: 'chats', doc: state.match.params.id, subcollections: [{ collection: 'messages' }], limit: 30, orderBy: ['createdAt', 'desc'], storeAs: 'messages' },
				{ collection: 'chats', doc: state.match.params.id, subcollections: [{ collection: 'users' }], storeAs: 'users'}
	  ]
	})
)(Chat)
