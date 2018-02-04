

var cloudant = require("./db.js").cloudant;
var gv = require("./globalVars");
// Remove any existing database called "alice".
var scens = [];
var qwe = {};
var db = cloudant.db.use('scenary');

var scenary = db.get('s', function (err, data) {
    scens = data.d;
    qwe = data;
    var oldResult = [];
    gv.modules_events.on("device", function (dd, name) {
        for (var i = 0; i < scens.length; i++) {

            var res = false;
            var c = scens[i]["if"].func;
            eval(c);
            if (res == true && res != oldResult[i]) {
                var c2 = scens[i]["then"].func;
                eval(c2);
            }
            oldResult[i] = res;

        }

    });
});


function saveScenaries(data) {
    scens = data;
    db.destroy(qwe._id, qwe._rev, function (err, data) {
        console.log('Error:', err);
        console.log('Data:', data);
        db.insert({ _id: "s", d: scens }, function (err, data) {
            console.log("Error:", err);
            console.log("Data:", data);

        });
    });

}


function getS() {
    return scens;
}
exports.getS = getS;
exports.saveScenaries = saveScenaries;