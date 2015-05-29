/*
 * gas - Garbage Aggregation System
 */

function gas (options) {
	var ticks,capacity;
	if (typeof options =="undefined")
		options = {};
	if (typeof options.capacity !=="undefined") {
		capacity = options.capacity;
	} else {
		capacity = 20;
	}
	if (typeof options.ticks !=="undefined") {
		ticks = options.ticks;
	} else {
		ticks = 0;
	}

	return {
		"capacity": capacity,
		"ticks": ticks,
		"ticker": function() { this.ticks++; ticks = this.ticks; },

		/*
		 * try - try encapsulation with catch error throwing
		 */
		"try": function(fn) {
			this.ticker();

			if (this.ticks>this.capacity) {
				throw this.blowup();
			}
			try {
				fn();
			} catch (e) {
				this.fire(fn,e);
			}
		},


		/*
		 * pump - handle an error directly
		 */
		"pump": function(err,fn) {
			return fn(err);
		},


		/*
		 * propagate - push the error to the client
		 */
		"propagate": function(err) {
			return err;
		},


		/*
		 * retry - retry an operation
		 */
		"retry": function(fn) {
			this.try(fn());
		},


		/*
		 * fire - fires the function with error callback
		 */
		"fire": function(fn,err) {
			fn(err);
		},


		/*
		 * blowup - an un handleable error
		 */
		"blowup": function() {
			return new Error("Out Of Gas At Marker: "+ this.ticks);
		},


		/*
		 * explode - exits the program
		 */
		"explode": function() {
			process.exit(1);
		},


		/*
		 * log - log an error
		 */
		"log": function(err) {
			console.log(err);
		},

		/*
		 * typeof - checks the type of a passed far
		 */
		"typeof": function(variable,typecheck) {
			if (typeof variable == typecheck)
				return true;
			else
				return false;
		},

	}
}

module.exports = gas;