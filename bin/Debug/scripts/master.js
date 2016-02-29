$.support.cors = true;//Adds Transport Cross Platform Support

//IO Server Settings
var io = {
    server: "http://localhost:8080/stonescada/",
    guri: "drivers/get=",
    suri: "drivers/set=",
    datatype: "json",
    type:"GET"
};

$(document).ready(function () {

   

})

var result = "na";

function postProcessing(data) {
    var json = $.parseJSON(data);
    result = json.value;
}

function getValue(tagname) {
    $.ajax({
        url: io.server + io.guri + tagname,
        type: io.type,
        dataType: io.datatype,
        cache: false,
        success: postProcessing,
        async: true,
        error: function (jqXHR, textStatus, errorThrown) {
            result = errorThrown;
        }
    });
};

var myVar;

myVar = setInterval(function () { getValue("test"); alert(result); }, 1000);

function drv_Set(tagname, value) {
    var result = "na";
    $.ajax({
        async: false,
        type: io.type,
        url: io.server + io.suri + tagname +":"+value,
        dataType: io.datatype,
        success: function (data) {
            var json = $.parseJSON(data);
            result = json.value;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console(errorThrown);
        }
    });
    return result;
}

////Create Driver Object
//var driver =
//{
//    // link a client side pull to the ioservers
//    // rest service for a driver 'get' command
//    get:"",
//    // link a client side push to the ioservers
//    // rest service for a driver 'set' command
//    set:""
//};
