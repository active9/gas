var gas = require("../lib/gas.js")({
    capacity: "999",
    ticks: "0"
});

var x = 1000;
var burn = 0;
var i = 0;
console.log("Running Gas Burn Tests");

while (i<x) {
    gas.try(function (err) {
        if (err) {
            console.log("Gas Failure:", err);
            gas.explode();
        } else {
            burn++;
            console.log("Burning..");
        }
    });
    i++;
}