// Initialize Env.
$.support.cors = true;//Adds Transport Cross Platform Support

// IO Server Settings
var io = {
    server: "http://localhost:8080/stonescada/",
    guri: "drivers/get=",
    suri: "drivers/set=",
    datatype: "json",
    type:"GET"
};


var taglist = modbus.tags;

// Update value of each tag in taglist object
// Use the ioserver settings to update the tags in the taglist
// this way the taglist can refresh all values in display
function updateTaglist(){
    //walk through taglist and update
    for (var key in taglist) {
        if (taglist.hasOwnProperty(key)) {
            //get the value of the tag
            var newVal = getValue(taglist[key]);
            //update tag info
            //taglist[key] = newVal;
            alert(taglist[key] + "=" + newVal);
        }
    }
}

function getValue(tagname) {
    var jsonValue = "na";
    $.ajax({
        url: io.server + io.guri + tagname,
        type: io.type,
        dataType: io.datatype,
        cache: false,
        success: function (data) {
            var json = $.parseJSON(data);
            jsonValue = json.value;
        },
        async: false,
        error: function (jqXHR, textStatus, errorThrown) {
            jsonValue = errorThrown;
        }
    });

    return jsonValue;
};

var myClock;
myClock = setInterval(
    function () { updateTaglist();  }, 1000);


