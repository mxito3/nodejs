/*
* @Author: YP
* @Date:   2018-08-13 13:10:14
* @Last Modified by:   YP
* @Last Modified time: 2018-08-13 13:20:21
*/
//求文件流的hash值
var timeStart=(new Date()).getTime();
var crypto=require('crypto');
var fs=require('fs');
var buffer=fs.readFileSync('../Trace/InJS/app/javascript/index.js');
var fsHash=crypto.createHash('sha256');//sha1,sha256
var md5Result=fsHash.digest(buffer);
var timeEnd=(new Date()).getTime();
console.log(md5Result);
console.log("花费的时间是"+(timeEnd-timeStart)/1000+"s");
console.log("数据量大小是"+buffer.length+"字节");