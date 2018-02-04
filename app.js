
var gv = require('./modules_files/globalVars.js');

var cloudIOT = require("./modules_files/cloudIOT.js");
var cloudant = require("./modules_files/db.js").db;
require("./modules_files/db.js").init();



var Device = require('./modules_files/modulesDev/device.js').device;
var scenary = require("./modules_files/scenary.js");
// var Client = require("ibmiotf");
// var appClientConfig = {
//     "org": "ezvric",
//     "domain": "internetofthings.ibmcloud.com",
//     "id": "ezvric",
//     "auth-key": "a-ezvric-3t3ycyivfu",
//     "auth-token": "y7t*J!6ReR-q4UwXBN"
// }

// var appClient = new Client.IotfApplication(appClientConfig);

// appClient.connect();

// appClient.on("connect", function () {
//     console.log("iot OK");
    
//     //Add your code here
// });
// // cloudIOT.start();
// gv["home1"] = {};
// gv["home1"].update = function () {
//     appClient.
//         publishHTTPS("testHome", "home1", "update", "json", { d: { 'temp': 28 } }).then(function onSuccess(argument) {
//             console.log("Success");
//             console.log(argument);
//         }, function onError(argument) {

//             console.log("Fail");
//             console.log(argument);
//         });
// }

gv.modules["home1"] = new Device("testHome", "home1");
gv.modules_count = 1;
gv.modules_index[0] = "home1";

var dd = {"sen1":30, "sen2":50};

gv.modules["home1"].setData(dd);
setTimeout(function () {
    console.log("40");
    dd = gv.modules["home1"].getData();
    dd.sen1 = 40;
    gv.modules["home1"].setData(dd);
}, 5000);
setTimeout(function () {
    console.log("41");
    dd = gv.modules["home1"].getData();
    dd.sen1 = 41;
    gv.modules["home1"].setData(dd);
}, 8000);
setTimeout(function () {
    console.log("28");
    dd = gv.modules["home1"].getData();
    dd.sen1 = 28;
    gv.modules["home1"].setData(dd);
}, 9000);
setTimeout(function () {

    console.log("40");
    dd = gv.modules["home1"].getData();
    dd.sen1 = 40;
    gv.modules["home1"].setData(dd);
}, 15000);
var expressServer = require("./expressServer");

expressServer.startExpress(8080); 

