var gas = require("../lib/gas.js")({
	capacity: "1",
	ticks: "0"
});

console.log("Running Gas Tests");
console.log("GAS Capacity:", gas.capacity);

gas.try(function (err) {
	if (err) {
		console.log("Gas Failure:", err);
		gas.explode();
	} else {
		console.log("There is gas in it!");
	}
});

gas.try(function (err) {
	if (err) {
		console.log("Gas Failure:", err);
		gas.explode();
	} else {
		console.log("There ain't no gas in it!");
	}
});

gas.try(function (err) {
	if (err) {
		console.log("Gas Failure:", err);
		gas.explode();
	} else {
		console.log("I should never run.");
	}
});