var simulator="testing";

var driver =
{
    get: function (tagname) {
        //call driver
        $.getJSON("http://localhost:8080/stonescada/driver/t?get="+tagname, function (data) {
            return data;

        })

        if (tagname == "test")
            return simulator;


    },
    set: function (tagname, value) {
        //call driver
        if (tagname == "test")
            simulator = value;
    }
};
