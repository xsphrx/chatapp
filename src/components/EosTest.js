import { Api, JsonRpc, RpcError } from 'eosjs';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs2';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import M from "materialize-css";
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'


class EosTest extends Component {
	state = {

	}

	componentDidMount() {
		console.log('im here')

		ScatterJS.plugins( new ScatterEOS() );
		const endpoint = 'http://localhost:8888';
		const network = ScatterJS.Network.fromJson({
		    blockchain:'eos',
		    chainId:'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
		    host:'localhost',
		    port:8888,
		    protocol:'http'
		});
		this.rpc = new JsonRpc(endpoint);

		// First we need to connect to the user's Scatter.
		ScatterJS.scatter.connect('My-App').then(connected => {

		    // If the user does not have Scatter or it is Locked or Closed this will return false;
		    if(!connected) return false;

		    const scatter = ScatterJS.scatter;

		    // Now we need to get an identity from the user.
		    // We're also going to require an account that is connected to the network we're using.
		    const requiredFields = { accounts:[network] };
		    scatter.getIdentity(requiredFields).then(async () => {

		        // Always use the accounts you got back from Scatter. Never hardcode them even if you are prompting
		        // the user for their account name beforehand. They could still give you a different account.
		        const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');

		        // You can pass in any additional options you want into the eosjs reference.

						console.log(account)

		        // Get a proxy reference to eosjs which you can use to sign transactions with a user's Scatter.
		        const eos = scatter.eos(network, Api, { rpc: this.rpc });

		        // ----------------------------
		        // Now that we have an identity,
		        // an EOSIO account, and a reference
		        // to an eosjs object we can send a transaction.
		        // ----------------------------


		        // Never assume the account's permission/authority. Always take it from the returned account.
		        const transactionOptions = { authorization:[`${account.name}@${account.authority}`] };

						console.log(account.name, account.authority)


						const resultWithConfig = await eos.transact(
			      {
			        actions: [
			          {
			            account: process.env.REACT_APP_EOS_CONTRACT_NAME,
			            name: 'hi',
			            authorization: [
			              {
			                actor: account.name,
			                permission: account.authority
			              }
			            ],
			            data: {
			              nm: 'haha'
			            }
			          }
			        ]
			      },
			      {
			        blocksBehind: 3,
			        expireSeconds: 30
			      }).then(res => {
							console.log(res)
						})



		        // eos.transfer(account.name, 'helloworld', '1.0000 EOS', 'memo', transactionOptions).then(trx => {
		        //     // That's it!
		        //     console.log(`Transaction ID: ${trx.transaction_id}`);
		        // }).catch(error => {
		        //     console.error(error);
		        // });

		    }).catch(error => {
		        // The user rejected this request, or doesn't have the appropriate requirements.
		        console.error(error);
		    });
		});



	}

	componentDidUpdate(oldProps){
	}



	render() {
		return (
			<div className="container">
				{process.env.REACT_APP_EOS_CONTRACT_NAME}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		profile: state.firebase.profile,
		auth: state.firebase.auth
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
)(EosTest)
