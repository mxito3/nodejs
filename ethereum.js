/*
 * @Author: YP
 * @Date:   2018-08-12 22:53:31
 * @Last Modified by:   YP
 * @Last Modified time: 2018-08-13 13:38:27
 */
var fs = require('fs');
var fileBuf;
var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


if (!web3.isConnected()) {

    console.log("failed");

} else {
    console.log("success");
    //console.log(web3);
    abi = [{ "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "test", "outputs": [{ "name": "", "type": "bytes1", "value": "0x" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "test0", "type": "bytes1[]" }], "name": "init", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }]
    address = '0x2DeAb2385FDE18c89E04b4DaC873895f8A7762B0';
    ourAddress = '0xDe6e8CE9f4Cd1Ee101523A7D7e8FC28aB8c559ba';
    ourPassword = 'domore0325';
    contract = getContract(abi, address);
    var timeBegin = (new Date()).getTime();
    fileBuf = fs.readFileSync('pushData.js');
    array = [];
    console.log(fileBuf.length);
    for (let i = 0; i < fileBuf.length; i++) {
        array.push(fileBuf[i]);
    }
    // var buffer = new Buffer(array);  字节数组转文本
    // fs.open('output.js', 'a', function(error, fd) {
    //     // console.log(fd);
    //     if (!error) {
    //         fs.write(fd, buffer, 0, buffer.length, 0, function(error, written, buffer) {
    //             if (!error) {
    //                 //console.log(buffer);
    //             }
    //         });
    //     }
    // });
    add(contract, ourAddress, ourPassword, array, timeBegin);
}
//

//console.log(fileBuf[i]);
function getContract(abi, address) {
    var contract = web3.eth.contract(abi).at(address);
    return contract;
}

function add(contract, from, fromPassword, array, timeBegin) {
    web3.personal.unlockAccount(from, fromPassword, 3000, function(error, result) {
        if (!error) {
            console.log("解锁成功");
            contract.init.sendTransaction(array, { from: from }, function(error, data) {
                var timeEnd = (new Date()).getTime();
                console.log("花费的时间是" + (timeEnd - timeBegin) / 1000 + "s");
                console.log("数据量是" + array.length + "字节");
                if (!error) {
                    console.log("交易发起成功，hash值是" + data);

                    return true;
                } else {

                    console.log(error);
                }
            });
        } else {
            console.log("解锁失败");
            console.log(error);
        }
    });
}