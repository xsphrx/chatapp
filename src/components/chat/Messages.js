import React, { Component } from 'react'


class Messages extends Component {

	componentDidUpdate(oldProps){
		const newProps = this.props
		if(oldProps.messages !== newProps.messages) {
			let last = this.props.messages.length - 1
			if (last > 5){
				last = String(last)
				this.refs[last].scrollIntoView()
			}
	  }
	}

	render() {
		return (
				<div ref="chat" className="chatContainer col s12 xl8 offset-xl2">
					{this.props.messages && [ ...this.props.messages].reverse().map((item, i) => {
						if(item.author == this.props.chatId){
							return (
								<div key={item.id} className="messageOuter" ref={i} align="middle">
										<div className="message grey lighten-5 black-text">
											{item.content}
										</div>
								</div>
							)
						}
						else if(item.author !== this.props.user){
							return (
								<div key={item.id} className="messageOuter" ref={i}>
									<div className="messageInner" >
										<span className="grey-text author">{item.author}</span>
										<div className="message grey darken-1 white-text">
											{item.content}
										</div>
									</div>
								</div>
							)
						}else {
							return (
								<div key={item.id} className="messageOuter" align="right" ref={i}>
									<div className="messageInner" >
										<div className="message teal lighten-1 white-text">
											{item.content}
										</div>
									</div>
								</div>
							)
						}
					})}
				</div>
		)
	}
}

export default Messages
