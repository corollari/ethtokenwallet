const Web3 = require('web3');
const contractMap = require('eth-contract-metadata')
const ABIs = {
	ERC20 : require('./ABI/ERC20.json'),
	ERC721 : require('./ABI/ERC721.json'),
	ERC1155 : require('./ABI/ERC1155.json')
}

window.addEventListener('load', async () => {
	// Modern dapp browsers...
	if (window.ethereum) {
		window.web3 = new Web3(ethereum);
		try {
			// Request account access if needed
			await ethereum.enable();
			// Acccounts now exposed
			startDapp(web3);
		} catch (error) {
			// User denied account access...
			console.error("Access denied by user");
		}
	}
	// Legacy dapp browsers...
	else if (window.web3) {
		window.web3 = new Web3(web3.currentProvider);
		// Acccounts always exposed
		startDapp(web3);
	}
	// Non-dapp browsers...
	else {
		console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
	}
});

function startDapp(web3){
	for(contractAdress in contractMap){
		for(tokenType in ABIs){
			try{
				let contract = new web3.eth.Contract(ABIs[tokenType], contractAdress);
				//contract.methods[ABIs[tokenType]]().call()
			} catch(e){}
		}
	}
}

function imageElFor (address) {
  const metadata = iconMap[address]
  if (!('logo' in metadata)) {
    return false
  }
  const fileName = metadata.logo
  const path = `images/contract/${fileName}`
  const img = document.createElement('img')
  img.src = path
  img.style.width = '100%'
  return img
}
