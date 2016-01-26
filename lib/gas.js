/*
 * gas - Garbage Aggregation System
 */

function gas (options) {
    var ticks,capacity,lastreason,lastcontainer,lastline;
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
    if (typeof options.containers !=="undefined") {
        containers = options.containers;
    } else {
        containers = 0;
    }
    if (typeof options.passes !=="undefined") {
        passes = options.passes;
    } else {
        passes = 0;
    }
    if (typeof options.fails !=="undefined") {
        fails = options.fails;
    } else {
        fails = 0;
    }

    return {
        "containers": containers,
        "passes": passes,
        "fails": fails,
        "pass": function() { return "Passed"; },
        "fail": function(reason) {
            if (!reason) {
                reason = lastreason;
            }
            lastreason = reason;
            console.log(" x -", reason); return "Failed";
        },
        "capacity": capacity,
        "ticks": ticks,
        "ticker": function() { this.ticks++; ticks = this.ticks; },

        /*
         * container - add a gas container for a fuel line
         */
        "container": function(desc,cb) {
            if (!desc) {
                desc = lastcontainer;
            }
            lastcontainer = desc;
            this.passes = this.fails = 0;
            console.log("\n "+ desc);
            console.log(" |---------------------------------------------------------");
            cb();
            var totalTests = Math.ceil(this.passes)+Math.ceil(this.fails);
            console.log(" |\n * --------------------------------------------------------\n * "+ totalTests +" lines ran.\n * --------------------------------------------------------");
            if (this.fails>0) {
                console.log(" = X [FAILED] "+ this.fails +" Tests Failed!");
            } else {
                console.log(" = √ [PASSED]");
            }
            containers++;
        },

        /*
         * line - add a gas line much like describe
         */
        "line": function(desc,cb) {
            if (!desc) {
                desc = lastline;
            }
            lastline = desc;
            var passed = cb();
            var pass = "x";
            if (passed==="Passed") {
                pass = "√";
                this.passes++;
            } else {
                this.fails++;
            }
            console.log(" | "+ pass +" "+desc, passed);
        },

        /*
         * mock - mock a method
         */
        "mock": function(method,cb) {
            return this.mock.prototype.method = cb;
        },

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
            if (typeof variable === typecheck)
                return true;
            else
                return false;
        },

    }
}

module.exports = gas;
