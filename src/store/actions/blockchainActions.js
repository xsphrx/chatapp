import { Api, JsonRpc, RpcError } from 'eosjs';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs2';

export const sendEos = (to, amount, chatId) => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		dispatch({ type: 'LOADING_START' })
		const state = getState();
		const firestore = getFirestore();
		const nick = getState().firebase.profile.nick
		let eosUsername = ''
		amount = (Number(amount)).toFixed(4);

		firestore.get({ collection: 'users', doc: to }).then(q => {
			if (q.data().hasOwnProperty('eosUsername')) {
				eosUsername = q.data().eosUsername;
			}else {
				dispatch({ type: 'EOS_USERNAME_NOT_FOUND' });
				dispatch({ type: 'LOADING_END' });
			}
		}).then(() => {
			if(eosUsername == ''){
				return;
			}

			console.log('to', to, 'amount', amount, 'chatId', chatId)

			ScatterJS.plugins( new ScatterEOS() );
			const endpoint = 'https://eos.greymass.com:443';
			const network = ScatterJS.Network.fromJson({
			    blockchain:'eos',
			    chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
			    host: 'https://eos.greymass.com',
			    port: 443,
			    protocol:'https'
			});
			const rpc = new JsonRpc(endpoint);

			ScatterJS.scatter.connect('Chatto').then(async connected => {

			    if(!connected) {
						dispatch({ type: 'SCATTER_NOT_OPENED' });
						dispatch({ type: 'LOADING_END' });
						return;
					}


					const scatter = ScatterJS.scatter;

			    const requiredFields = { accounts:[network] };
			    scatter.getIdentity(requiredFields).then(() => {

			        const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
			        const eos = scatter.eos(network, Api, { rpc: rpc });
			        const transactionOptions = { authorization:[`${account.name}@${account.authority}`] };

							eos.transact(
				      {
				        actions: [
				          {
				            account: 'eosio.token',
				            name: 'transfer',
				            authorization: [
				              {
				                actor: account.name,
				                permission: account.authority
				              }
				            ],
				            data: {
				              from: account.name,
											to: eosUsername,
											quantity: amount + ' EOS',
											memo: ''
				            }
				          }
				        ]
				      },
				      {
				        blocksBehind: 3,
				        expireSeconds: 30
				      }).then(res => {




								console.log(res)
								const trace = res.processed.action_traces[0]
								const data = trace.act.data
								const content = 'Action: ' + trace.act.name + ', from: ' + data.from + ', quantity: ' + data.quantity + ', to: ' + data.to + ', at: ' + trace.block_time + '.';

								firestore.collection('chats').doc(chatId).collection('messages').add({
									author: chatId,
									content: content,
									createdAt: new Date()
								}).then(() => {
									dispatch({ type: 'TRANSACTION_COMPLETE' })
									dispatch({ type: 'LOADING_END' });
								}).catch(err => {
									dispatch({ type: 'BLOCKCHAIN_ERROR', err })
									dispatch({ type: 'LOADING_END' });
								})







							}).catch(error => {
									error = JSON.stringify(error)
					        dispatch({ type: 'BLOCKCHAIN_ERROR', error })
									dispatch({ type: 'LOADING_END' });
					    })

			    })



			});
		})




		// firestore.collection('chats').doc(newMessage.chatId).collection('messages').add({
		// 	author: nick,
		// 	content: newMessage.content,
		// 	createdAt: new Date()
		// }).then(() => {
		// 	dispatch({ type: 'ADD_MESSAGE' })
		// }).catch(err => {
		// 	dispatch({ type: 'ADD_MESSAGE_ERROR', err })
		// })
	}
}


export const reset = () => {
	return (dispatch) => {
		dispatch({ type: 'BLOCKCHAIN_RESET' });
	}
}
