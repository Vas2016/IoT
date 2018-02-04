var EventEmitter = require("events").EventEmitter;

var modules_events = new EventEmitter;

var modules_count = 0;
var modules = {};
var modules_index = [];

exports.modules = modules;
exports.modules_index = modules_index;
exports.modules_count = modules_count;
exports.modules_events = modules_events;