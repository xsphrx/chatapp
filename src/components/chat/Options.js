import React, { Component } from 'react'
import M from "materialize-css";


class Options extends Component {
	state = {
		sendEos: false,
		header: 'Options'
	}

	componentDidMount(){
		const optionsModal = document.querySelector('.modal')
		const options = M.Modal.init(optionsModal, {onCloseEnd: this.props.close, endingTop: '10%'})
		options.open()
		console.log(this.props.users)
		this.props.reset();
		console.log(this.props.user)
	}

	showSelect = async () => {
		const wait = await this.setState({sendEos: true, header: 'Send Eos'})

		const select = document.querySelector('.friendSelect')
		const selectInstance = M.FormSelect.init(select, );

	}

	sendEos = () => {
		if (this.eosAmount.value == '') {
			M.toast({html: 'Please enter a valid amount!'})
		}else {
			this.props.sendEos(this.friendSelected[this.friendSelected.selectedIndex].dataset.id, this.eosAmount.value)
		}
	}

	render() {
		return (
				<div>
					<div id="modal1" className="modal modalOptions">

						{this.props.loading ?
							<div className="progress">
								<div className="indeterminate"></div>
							</div>
						: null}

						<div className="modal-content">
							<h4>{this.state.header}</h4>
							{this.state.sendEos ?
								<div>

									<h5>to:</h5>

									<select className="friendSelect"  ref={(friendSelected) => { this.friendSelected = friendSelected }}>
										<option value="" disabled defaultValue>Who do you want to send money to?</option>
										{this.props.users.map((user, i) => {
											if(user.nick != this.props.currentUser.nick){
												return (
													<option value={i} key={i} data-id={user.id}>
														{user.nick}
													</option>
												)
											}
										})}
									</select>

									<h5>amount:</h5>

									<div className="input-field">
					          <input id="eosAmount" type="number"  ref={(eosAmount) => { this.eosAmount = eosAmount }} />
					          <label htmlFor="eosAmount">eos amount</label>
					        </div>

									<a className="waves-effect waves-light btn" onClick={this.sendEos}>Send</a>

								</div>
							:
								<p>
									<a className="waves-effect waves-teal btn-flat" onClick={this.showSelect}>Send EOS</a>
								</p>
							}

							{this.props.error != null ?
								<h6 className="center-align section red-text">{this.props.error}</h6>
							: null}
							{this.props.completed != null ?
								<h6 className="center-align section green-text">{this.props.completed}</h6>
							: null}

						</div>
					</div>
				</div>
		)
	}
}

export default Options
