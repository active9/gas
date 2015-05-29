var gas = require("../lib/gas.js")();

console.log("Running Gas Type Check Tests");

// TEST A
var testa = function() { };
    if (gas.typeof(testa,"function")) 
	console.log("Test A: Passed");
    else 
	console.log("Test A: Failed");

// TEST B
var testb = 11;
    if (gas.typeof(testb,"number")) 
	console.log("Test B: Passed");
    else 
	console.log("Test B: Failed");

// TEST C
var testc = null;
    if (gas.typeof(testc,"object")) 
	console.log("Test C: Passed");
    else 
	console.log("Test C: Failed");

// TEST D
var testd = "Hello Test World";
    if (gas.typeof(testd,"string")) 
	console.log("Test D: Passed");
    else 
	console.log("Test D: Failed");
