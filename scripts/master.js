// Initialize Env.
$.support.cors = true;//Adds Transport Cross Platform Support

// IO Server Settings
var io = {
    server: "http://localhost:8080/stonescada/",
    guri: "drivers/get=",
    suri: "drivers/set=",
    datatype: "json",
    taglisturi:"taglist.json",
    type:"GET"
};

// Get taglist array
// Read in the taglist object so that it
// can be referenced in code later on.
var taglist = function () {
    $.ajax({
        url: io.taglisturi,
        type: io.type,
        dataType: io.datatype,
        cache: false,
        success: function (data) {
            var json = $.parseJSON(data);
            return json;
        },
        async: true,
        error: function (jqXHR, textStatus, errorThrown) {
            return errorThrown;
        }
    });
};

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
            taglist[key] = newVal;
            alert(taglist[key]);
        }
    }
}

function getValue(tagname) {
    $.ajax({
        url: io.server + io.guri + tagname,
        type: io.type,
        dataType: io.datatype,
        cache: false,
        success: function (data) {
            var json = $.parseJSON(data);
            return json.value;
        },
        async: true,
        error: function (jqXHR, textStatus, errorThrown) {
            return errorThrown;
        }
    });
};

var myClock;
myClock = setInterval(
    function () { updateTaglist();  }, 1000);


