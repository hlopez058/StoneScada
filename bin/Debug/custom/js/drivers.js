// IO Server Settings
var io = {
    server: "http://localhost:8080/stonescada/",
    guri: "drivers/get=",
    suri: "drivers/set=",
    datatype: "json",
    type: "GET"
};

// Create a driver with a taglist
var modbus =
    {
        tags: {
            MW: "test",
            MVAR: "test2"
        }
    };