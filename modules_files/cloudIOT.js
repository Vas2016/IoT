var Client = require("ibmiotf");
var gv = require("./globalVars.js");

var appClientConfig = {
    "org": "ezvric",
    "domain": "internetofthings.ibmcloud.com",
    "id": "ezvric",
    "auth-key": "a-ezvric-3t3ycyivfu",
    "auth-token": "y7t*J!6ReR-q4UwXBN"
}
var connected = false

var appClient = new Client.IotfApplication(appClientConfig);

appClient.connect();

appClient.on("connect", function () {
    console.log("iot OK");
    connected = true;
    
    //Add your code here
});

exports.appClient = appClient;
exports.connected = connected;