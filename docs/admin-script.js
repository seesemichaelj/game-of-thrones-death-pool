
let haveWeb3 = false;


let artifact;
let contract;
let instance;
let lastAddress;

function close() {
  instance.close.sendTransaction((err, result) => {
    console.log(err);
    console.log(result);
  });
}

function open() {
  instance.open.sendTransaction((err, result) => {
    console.log(err);
    console.log(result);
  });
}

function complete() {
  instance.complete.sendTransaction((err, result) => {
    console.log(err);
    console.log(result);
  });
}

function allowClaiming() {
  instance.allowClaiming.sendTransaction((err, result) => {
    console.log(err);
    console.log(result);
  });
}

function contractChanged() {
  const contractAddress = $("#pool_contract").val();
  if (contractAddress === lastAddress) {
    return;
  }
  lastAddress = contractAddress;
  let isValid = true;
  isValid = isValid && contractAddress.startsWith("0x");
  isValid = isValid && contractAddress.length === 42;
  isValid = isValid && haveWeb3;

  if (isValid) {
    instance = contract.at(contractAddress);
  }
}

window.addEventListener('load', function() {
  const contractAddress = getUrlParameter("contract");
  if (contractAddress) {
    $("#pool_contract").val(contractAddress);
  }

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3js = new Web3(web3.currentProvider);
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  web3js.eth.defaultAccount = web3js.eth.accounts[0];
  erc20 = web3js.eth.contract(erc20abi);

  $.getJSON("GOTDeathPool.json?v=1", (data) => {
    artifact = data;

    contract = web3js.eth.contract(artifact.abi);
  
    // Now you can start your app & access web3 freely:
    haveWeb3 = true;
    contractChanged();
  });
})

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
