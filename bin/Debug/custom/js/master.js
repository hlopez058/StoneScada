//==========================================>
// MAIN
//==========================================>
// Initialize Env.
$.support.cors = true;//Adds Transport Cross Platform Support

var taglist = modbus.tags;
var datapoints = modbus.tags;

processTaglist();


//==========================================>

// Load taglist into a datapoint structures
function processTaglist() {

    // clear array
    datapoints = [];

    //declare iterrator for id
    var i = 0;

    //walk through taglist 
    for (var key in taglist) {

        //check if object contaings property
        if (taglist.hasOwnProperty(key)) {

            //make the tagname the same as the tag listed value
            var tagname = taglist[key];

            //create datapoint object
            var datapoint = {id:i, tagname: taglist[key], val: "N", qual: "NA" };
            
            //add to array
            datapoints[key] = datapoint;

            i++;
        }
    }
}

// Update value of each tag in taglist object
// Use the ioserver settings to update the tags in the taglist
// this way the taglist can refresh all values in display
function updateTaglist(){

    var dplength = 0;
    //walk through array of datapoints
    for (var dpN in datapoints) {
  
        var dp = datapoints[dpN];

        //update datapoint value
        var dpVal = getValue(dp.tagname);

        //create proxy datapoint object, and update the val property
        var datapoint = { id: dp.id, tagname: dp.tagname, val: dpVal, qual: dp.qual };

        //update the array at given id
        datapoints[dpN] = datapoint;

        //update the div that the datapoint belongs too.
        if (document.getElementById("datapoint." + dpN) != null) {
            document.getElementById("datapoint." + dpN).innerHTML = dpN +":"+datapoint.val;
        }

        //alert(datapoint.tagname + "=" + datapoint.val);
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


