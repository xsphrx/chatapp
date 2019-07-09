import { Api, JsonRpc, RpcError } from 'eosjs';

import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs2';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import M from "materialize-css";
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
const JsSignatureProvider = require('eosjs/dist/eosjs-jssig').default;

class EosKnights extends Component {
	state = {

	}

	componentDidMount() {
		console.log('im here')



	}

	startAction = async () => {
		var formData  = new FormData();
		formData.append('block_num_or_id', '62262177');
		const rawResponse = await fetch('https://eos.eoscafeblock.com/v1/chain/get_block', {
			method: 'POST',
			headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
			body: JSON.stringify({block_num_or_id: 62267883})
		});
		const content = await rawResponse.json();
		console.log(content);

		// console.log('action started')
		//
		// const defaultPrivateKey = "5KJbwJPM6RLpC7Eh8NzoJp9EQnbi1wbGqmtme2dPBRHho4eS9S4";
		// const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
		//
		// const account = 'eosknightsio';
		// const name = 'rebirth3';
		//
		// const rpc = new JsonRpc('https://eos.greymass.com:443', { fetch });
		//
		// const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
		//
		//
		// (async () => {
		//   const result = await api.transact({
		//     actions: [{
		//       account: account,
		//       name: name,
		//       authorization: [{
		//         actor: 'j2iztkeybjq1',
		//         permission: 'active',
		//       }],
		//       data: {
		//         from: 'j2iztkeybjq1',
		// 				season: 0,
		//
		//       },
		//     }]
		//   }, {
		//     blocksBehind: 3,
		//     expireSeconds: 30,
		//   });
		//   console.dir(result);
		// })();

	}


	render() {
		return (
			<div className="container">
				<a className="waves-effect waves-light btn" onClick={this.startAction}>Start Action</a>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {

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
)(EosKnights)
