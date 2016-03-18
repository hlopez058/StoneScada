//==========================================>
// MAIN
//==========================================>

//Adds Transport Cross Platform Support
$.support.cors = true;

// use taglist to generate datapoints
// taglist is defined in drivers.js file
var datapoints = processTaglist(MODBUS);
//------------------------------------------/>

//==========================================>
// Functions
//==========================================>

// Load taglist into a datapoint structures
function processTaglist(taglist) {

    // clear array
    var datapoints = [];

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

    return datapoints;
}

// Loop through datapoints, update and refresh screen
function updateDatapoints(){

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

        //update the div that the datapoint belongs too if it exists
        if (document.getElementById("datapoint." + dpN) != null) {
            document.getElementById("datapoint." + dpN).innerHTML = dpN +":"+datapoint.val;
        }

        //alert(datapoint.tagname + "=" + datapoint.val);
    }
}

// Timed auto-refresh of screen
var myClock;
myClock = setInterval(
    function () { updateDatapoints();  }, 1000);
//------------------------------------------/>


