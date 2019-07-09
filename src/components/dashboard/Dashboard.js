import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import M from "materialize-css";
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Friends from './Friends'
import FriendsList from './FriendsList'
import Chats from './Chats'


class Dashboard extends Component {
	state = {

	}

	resizeTab = () => {
		if(document.querySelector('.tabs-content.carousel')){
			document.querySelector('.tabs-content.carousel').style.height =  document.querySelector('.carousel-item.active').querySelector('#heightForTab').scrollHeight + 300 + "px";
		}
	}

	componentDidMount(){
		const elem = document.querySelector('.tabs');
		var instance = M.Tabs.init(elem, {swipeable: true, onShow: this.resizeTab});
		console.log(window.innerWidth>600)
	}

	componentDidUpdate(oldProps){
		this.resizeTab()
	}

	render() {
		if (!this.props.auth.uid) return <Redirect to='/signin' />
		return (
			<div className="container">

				{window.innerWidth < 992 ?
					<div className="row section">
						<ul className="tabs">
							<li className="tab col s2"><a href="#chatsTab">Chats</a></li>
							<li className="tab col s2"><a href="#friendsTab">Friends</a></li>
						</ul>

						<div>

								<div id="chatsTab">
									<Chats />
								</div>

							<div id="friendsTab">
								<Friends />
								<FriendsList />
							</div>

						</div>
					</div>
				:
					<div className="row">
						<div className="col s12 m6 chats">
							<Chats />
						</div>
						<div className="col s12 m5 offset-m1">
							<Friends />
							<FriendsList />
						</div>
					</div>
				}



			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		profile: state.firebase.profile,
		auth: state.firebase.auth,
		chats: state.firestore.ordered.chats
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect((state) => {
		return [

	  ]
	})
)(Dashboard)
