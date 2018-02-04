var Cloudant = require('cloudant');
var cloudant;
var username = "ebe98143-2ad6-49e0-b02b-1421e5992290-bluemix";
var password = "9d141b7aa28624e16a9cfaae8954e68416aa86692d7ad6d2f55e6437cf759729";
var cloudant = Cloudant({account:username, password:password});
function init() {


    // Initialize Cloudant with settings from .env


}

exports.cloudant = cloudant;
exports.init = init;
