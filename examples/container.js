var gas = require("../lib/gas.js")();

console.log("Running Gas Container Tests");

// Container Exists
gas.container("Container", function() {

    gas.line("exists as a method", function() {
        if (gas.typeof(gas.container,"function"))
        return gas.pass();
        else
        return gas.fail();
    });

    gas.line("can mock a container method", function() {
        if (gas.mock("container",function(){return true;}))
        return gas.pass();
        else
        return gas.fail('Failed mocking the gas container method');
    });

});

// Line Exists
gas.container("Line", function() {

    gas.line("exists as a method", function() {
        if (gas.typeof(gas.line,"function"))
        return gas.pass();
        else
        return gas.fail();
    });

    gas.line("can mock a line method", function() {
        if (gas.mock("line",function(){return true;}))
        return gas.pass();
        else
        return gas.fail('Failed mocking the gas line method');
    });

});
