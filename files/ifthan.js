function table(scenary) {
    var row = $('<div>');
    row.attr("class", "row");
    row.attr("style", "padding: 10px;");
    row.hide();



    var scenaryId = $('<div>');
    scenaryId.attr("class", " col s1");
    scenaryId.html(scenary.id);
    row.append(scenaryId);

    var scenaryIf = $('<div>');
    scenaryIf.attr("class", " input-field col s5");
    scenaryIf.html(
          '<input style="margin:5px;" type="text" onchange="fin1(this)" class="validate" id="scen' + scenary.id + 'in1" ><label >Func</label>'
    );
    
    row.append(scenaryIf);

    


    var scenaryThan = $('<div>');
    scenaryThan.attr("class", " input-field col s5");
    scenaryThan.html(
          '<input style="margin:5px;" type="text" onchange="fin2(this)" class="validate" id="scen' + scenary.id + 'in2" /><label >Func</label>'
    );

    row.append(scenaryThan);
   
    row.fadeIn();

    $('#scens').prepend(row);
    $("#scen" + scenary.id + "in1").attr("value", scenary["if"]["func"]);
    $("#scen" + scenary.id + "in2").attr("value", scenary["then"]["func"]);

    
    
    

    
}
var scenaries_index = 0;
var scenaries = [];

function fin1(b) {
    var str = String(b.id);
    var n = Number(str.substring(str.indexOf("scen")+4, str.indexOf("in1")));
    scenaries[n]["if"]["func"] = b.value;
}

function fin2(b) {
    var str = String(b.id);
    var n = Number(str.substring(str.indexOf("scen")+4, str.indexOf("in2")));
    scenaries[n]["then"]["func"] = b.value;
}

// var xhr = new XMLHttpRequest();

// xhr.open('GET', 'alg/alg.json', true);

// xhr.send(); // (1)
socket.emit("getScen", "");


socket.on("s",function (dataInput) { // (3)
    // if (xhr.readyState != 4) return;

    // button.innerHTML = 'Готово!';

    

    scenaries = [];

    scenaries = dataInput.d;
    console.log(dataInput);

    scenaries_index = Number(scenaries.length);



    for (var index = 0; index < scenaries_index; index++) {
        
        var element = scenaries[index];
        element.id = index;
        table(element);
    }
});


function b1() {
    var scenar = {};
    scenar.id = scenaries_index;
    scenar["if"] = {};
    scenar["then"] = {}
    scenaries[scenaries_index] = scenar;
    table(scenaries[scenaries_index]);
    scenaries_index++;
    scenaries.count = scenaries_index;
    
}
function b2() {
    var d = {};
    d["d"] = scenaries;
    var dataOut = JSON.stringify(d)

    console.log(dataOut);

    socket.emit('scen',d);
}
