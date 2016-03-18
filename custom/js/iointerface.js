// IO Server Settings - Interface to StoneSCADA's IO server
var ioInterface = {
    server: "http://localhost:8080/stonescada/",
    guri: "drivers/get=",
    suri: "drivers/set=",
    datatype: "json",
    type: "GET"
};

// Get Value of datapoint by unique id
function getValue(tagname) {
    var jsonValue = "na";
    io = ioInterface;
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