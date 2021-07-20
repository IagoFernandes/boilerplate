const Web3 = require('web3');
const data = require('./env.json');

const web3Test = new Web3(data.endpoint);
const instance = new web3Test.eth.Contract(data.registerDocumentAbi, data.RegisterDocumentAddress);
var Promise = require('bluebird');

async function ler (num) {
    let response = await instance.methods.readDocument(num).call();
    console.log(response);
}

async function escrever () {
    let account = web3Test.eth.accounts.wallet.add(data.privateKey);
    let response = await instance.methods.insertDocument('03',['01, 02']).send({
        from: account.address,
        gas: '100000'
    });
    console.log(response);
    let nounce = await web3Test.eth.getTransaction(response.transactionHash);
    console.log(nounce.nonce);
    
}

async function multi_escrita () {
    let account = web3Test.eth.accounts.wallet.add(data.privateKey);
    let response = await instance.methods.insertDocument('10',['101, 102']).send({
        from: account.address,
        gas: '100000'
    });
    console.log(response);
    response = await instance.methods.insertDocument('11',['111, 112']).send({
        from: account.address,
        gas: '100000'
    });
    console.log(response);
    response = await instance.methods.insertDocument('12',['121, 122']).send({
        from: account.address,
        gas: '100000'
    });
    console.log(response);
}

async function loop(num) {
    let aux = num;
    let transaction = '';
    let account = web3Test.eth.accounts.wallet.add(data.privateKey);
    let nounce = 0;
    for (let index = 0; index < 3; index++){
        if(nounce == 0){
            transaction = await instance.methods.insertDocument(aux,["x" + aux, "xx" + aux]).send({
                from: account.address,
                gas: '100000'
            });
            nounce = await web3Test.eth.getTransaction(transaction.transactionHash);
            nounce++;
            //console.log(transaction);
            aux++;
        }else{
            transaction = await instance.methods.insertDocument(aux,["x" + aux, "xx" + aux]).send({
                from: account.address,
                gas: '100000',
                nonce: nounce
            });
            nounce++;
        }

    }
    aux = num;
    let response = '';
    for (let index= 0; index < 3; index++){
        response = await ler(aux);
        console.log(response);
        aux++;
    }
}



/* let aux = 10;
var promises = []; 
let account = web3Test.eth.accounts.wallet.add(data.privateKey);
let nounce = '';
for (i = 0; i < 3; i++){
    if(nounce == ''){
        promises.push(instance.methods.insertDocument(aux,["x" + aux, "xx" + aux]).send({
             from: account.address,
             gas: '200000',
         }));
         aux++;

    }else{

    }
}

Promise.all(promises).then(function(results) {
   ler(10);
   ler(11);
   ler(12);
});
 */

async function getNonce() {
    let account = web3Test.eth.accounts.wallet.add(data.privateKey);
    let response = await instance.methods.insertDocument('51', ['52', '53']).send({
        from: account.address,
        gas: '100000'
    });
    let nonce = await web3Test.eth.getTransactionCount(account.address);
    console.log(nonce);
    nonce++;
    response = await instance.methods.insertDocument('52', ['53', '54']).send({
        from: account.address,
        gas: '100000',
        nonce: nonce
    });
    
}

getNonce();