"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomBool = exports.randomRange = exports.randomInt = exports.random = void 0;
/**
 * @since 2.0.0
 */
var IO_1 = require("./IO");
var function_1 = require("./function");
/**
 * Returns a random number between 0 (inclusive) and 1 (exclusive). This is a direct wrapper around JavaScript's
 * `Math.random()`.
 *
 * @since 2.0.0
 */
exports.random = function () { return Math.random(); };
/**
 * Takes a range specified by `low` (the first argument) and `high` (the second), and returns a random integer uniformly
 * distributed in the closed interval `[low, high]`. It is unspecified what happens if `low > high`, or if either of
 * `low` or `high` is not an integer.
 *
 * @since 2.0.0
 */
function randomInt(low, high) {
    return function_1.pipe(exports.random, IO_1.map(function (n) { return Math.floor((high - low + 1) * n + low); }));
}
exports.randomInt = randomInt;
/**
 * Returns a random number between a minimum value (inclusive) and a maximum value (exclusive). It is unspecified what
 * happens if `maximum < minimum`.
 *
 * @since 2.0.0
 */
function randomRange(min, max) {
    return function_1.pipe(exports.random, IO_1.map(function (n) { return (max - min) * n + min; }));
}
exports.randomRange = randomRange;
/**
 * Returns a random boolean value with an equal chance of being `true` or `false`
 *
 * @since 2.0.0
 */
exports.randomBool = 
/*#__PURE__*/
function_1.pipe(exports.random, IO_1.map(function (n) { return n < 0.5; }));