var appClient = require("../cloudIOT.js").appClient;
var connected = require("../cloudIOT.js").connected;
var gv = require("../globalVars.js");
var cloudant = require("../db.js").cloudant;
var fs = require("fs");
var path = require("path");

function device(_deviceType, _deviceName) {
    this.deviceType = _deviceType;
    this.deviceName = _deviceName;
    var deviceData = {};

    var hj = { d: {} };


    var db = cloudant.db.use("html");
    function h(err, data) {
        hj.d = data.d;
        console.log(err);
        console.log(JSON.stringify(data.d));
    }
    this.h = h;
    db.get(this.deviceName, function (err, data) {
        h(err, data);
    });

    device.prototype.sendData = function (event, data) {
        var msg = {};
        msg.d = data;
        msg = JSON.stringify(msg);
        appClient.publishDeviceCommand(this.deviceType, this.deviceName, event, "json", msg);

        return connected;
    }

    function appClientHandler(deviceType, deviceId, eventType, format, payload) {
        console.log("Device Event from :: " + deviceType + " : " + deviceId + " of event " + eventType + " with payload : " + payload);

        if (deviceId == _deviceName) {
            deviceData = JSON.parse(payload).d;
            gv.modules_events.emit("device", deviceData, deviceId);
        }
    }
    function handler2(deviced, dn) {
        if (dn == _deviceName) {
            // deviceData = JSON.parse(payload).d;
            var msg = {};
            msg.d = deviced;
            msg = JSON.stringify(msg);
            console.log("device_in_p")
            appClient.publishDeviceCommand(_deviceType, _deviceName, "inData", "json", msg);
            // appClient.publishHTTPS(_deviceType, _deviceName, "inData", "json", msg). then (function onSuccess (argument) {
            //     console.log("Success");
            //     console.log(argument);
            // }, function onError (argument) {
        
            //     console.log("Fail");
            //     console.log(argument);
            // });
        
        }
    }
    appClient.on("connect", function () {
        console.log("subscribe")
        // appClient.subscribeToDeviceEvents("+", "+", "outData");
        appClient.subscribeToDeviceEvents(_deviceType, _deviceName, "+","json");
        appClient.on("deviceEvent", appClientHandler);
        gv.modules_events.on("device_in", handler2);

    })

    device.prototype.subscribe = function (ne) {

        appClient.subscribeToDeviceEvents(this.deviceType, this.deviceName, ne);
        appClient.on(ne, this.appClientHandler);
    }

    device.prototype.getData = function () {
        return deviceData;
    }

    device.prototype.setData = function (qw) {
        deviceData = qw;
        gv.modules_events.emit("device", deviceData, _deviceName);
    }

    device.prototype.parseInput = function (msg) {
        var data = msg;
        data.deviceName = this.deviceName;
        data.deviceType = this.deviceType;
        console.log(JSON.stringify(data));
        if (data.type == "switch") {
            deviceData[data.id] = data.value;
            var msgToSend = {};
            msgToSend.action = data.action;
            msgToSend.type = data.type;
            console.log(this.getData())
            gv.modules_events.emit("device_in", deviceData, this.deviceName);
        }
        else if (data.type == "button") {
            var msgToSend = {};
            msgToSend.action = data.action;
            msgToSend.type = data.type;
            console.log(this.getData())
            gv.modules_events.emit("device_in", deviceData, this.deviceName);
        }
        this.sendData("data", data);
    }

    device.prototype.pageHtml = function () {

        console.log(JSON.stringify(hj.d));

        var data = String(fs.readFileSync(path.join(__dirname, "device.html")));
        var btn = String(fs.readFileSync(path.join(__dirname, "button.html")));
        var sw = String(fs.readFileSync(path.join(__dirname, "switch.html")));
        var sen = String(fs.readFileSync(path.join(__dirname, "sensor.html")));
        // var config = JSON.parse(String(fs.readFileSync(path.join(__dirname, "test.json"))));
        var config = hj.d;
        data = data.replace(/{{tab1name}}/gmi, config["tab1"]["tab1name"]);
        data = data.replace(/{{tab2name}}/gmi, config["tab2"]["tab2name"]);
        data = data.replace(/{{tab3name}}/gmi, config["tab3"]["tab3name"]);
        var tab1 = "";
        for (var i = 0; i < config["tab1"]["body"].length; i++) {
            console.log(i);
            switch (config["tab1"]["body"][i]["type"]) {
                case "button":
                    var b = btn;

                    b = b.replace(/{{Text}}/gmi, config["tab1"]["body"][i]["name"]);
                    b = b.replace(/{{id}}/gmi, config["tab1"]["body"][i]["id"]);
                    tab1 += b;
                    break;
                case "switch":
                    var b = sw;
                    b = b.replace(/{{Text}}/gmi, config["tab1"]["body"][i]["name"]);
                    b = b.replace(/{{id}}/gmi, config["tab1"]["body"][i]["id"]);
                    tab1 += b;
                    break;
                case "sensor":
                    var b = sen;
                    b = b.replace(/{{Text}}/gmi, config["tab1"]["body"][i]["name"]);
                    b = b.replace(/{{id}}/gmi, config["tab1"]["body"][i]["id"]);
                    tab1 += b;
                    break;

                default:
                    //tab1 += config["tab1"]["body"][i]["val"];
                    break;
            }
        }

        data = data.replace(/{{tab1}}/gmi, tab1);

        var tab2 = "";
        console.log(config["tab2"]["body"].length)
        for (var i = 0; i < config["tab2"]["body"].length; i++) {
            switch (config["tab2"]["body"][i]["type"]) {
                case "button":
                    var b = btn;
                    b = b.replace(/{{Text}}/gmi, config["tab2"]["body"][i]["name"]);
                    b = b.replace(/{{id}}/gmi, config["tab2"]["body"][i]["id"]);

                    tab2 += b;
                    break;
                case "switch":
                    var b = sw;
                    b = b.replace(/{{Text}}/gmi, config["tab2"]["body"][i]["name"]);
                    b = b.replace(/{{id}}/gmi, config["tab2"]["body"][i]["id"]);

                    tab2 += b;
                    break;
                case "sensor":
                    var b = sen;
                    b = b.replace(/{{Text}}/gmi, config["tab2"]["body"][i]["name"]);
                    b = b.replace(/{{id}}/gmi, config["tab2"]["body"][i]["id"]);
                    tab2 += b;
                    break;

                default:
                    //tab2 += config["tab2"]["body"][i]["val"];
                    break;
            }
        }

        data = data.replace(/{{tab2}}/gmi, tab2);


        // var tab3 = "";
        // for (var i = 0; i < config["tab3"]["body"].length; i++) {
        //     switch (config["tab3"]["body"][i]["type"]) {
        //         case "button":
        //             var b = btn;
        //             b = b.replace(/{{Text}}/gmi, config["tab3"]["body"][i]["name"]);
        //             b = b.replace(/{{id}}/gmi, config["tab3"]["body"][i]["id"]);

        //             tab3 += b;
        //             break;
        //         case "switch":
        //             var b = sw;
        //             b = b.replace(/{{Text}}/gmi, config["tab3"]["body"][i]["name"]);
        //             b = b.replace(/{{id}}/gmi, config["tab3"]["body"][i]["id"]);
        //             tab3 += b;
        //             break;
        //         case "sensor":
        //             var b = sen;
        //             b = b.replace(/{{Text}}/gmi, config["tab3"]["body"][i]["name"]);
        //             b = b.replace(/{{id}}/gmi, config["tab3"]["body"][i]["id"]);
        //             tab3 += b;
        //             break;

        //         default:
        //             tab3 += config["tab3"]["body"][i]["val"];
        //             break;
        //     }
        // }

        // data = data.replace(/{{tab3}}/gmi, tab3);

        data = data.replace(/{{header}}/gmi, this.deviceName);

        // console.log(data);
        return data;
    }
}
// device.prototype.h = 


exports.device = device;