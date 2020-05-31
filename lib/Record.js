"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.record = exports.separate = exports.compact = exports.reduceRight = exports.reduce = exports.partitionMap = exports.partition = exports.foldMap = exports.filterMap = exports.filter = exports.elem = exports.some = exports.every = exports.fromFoldableMap = exports.fromFoldable = exports.filterWithIndex = exports.filterMapWithIndex = exports.partitionWithIndex = exports.partitionMapWithIndex = exports.sequence = exports.traverse = exports.traverseWithIndex = exports.singleton = exports.reduceRightWithIndex = exports.foldMapWithIndex = exports.reduceWithIndex = exports.map = exports.mapWithIndex = exports.empty = exports.lookup = exports.getMonoid = exports.getEq = exports.isSubrecord = exports.pop = exports.modifyAt = exports.updateAt = exports.deleteAt = exports.hasOwnProperty = exports.insertAt = exports.toUnfoldable = exports.toArray = exports.collect = exports.keys = exports.isEmpty = exports.size = exports.getShow = exports.URI = void 0;
var RR = require("./ReadonlyRecord");
/* tslint:disable:readonly-array */
/**
 * @since 2.0.0
 */
exports.URI = 'Record';
/**
 * @since 2.0.0
 */
exports.getShow = RR.getShow;
/**
 * Calculate the number of key/value pairs in a record
 *
 * @since 2.0.0
 */
exports.size = RR.size;
/**
 * Test whether a record is empty
 *
 * @since 2.0.0
 */
exports.isEmpty = RR.isEmpty;
/**
 * @since 2.0.0
 */
exports.keys = RR.keys;
/**
 * Map a record into an array
 *
 * @example
 * import {collect} from 'fp-ts/lib/Record'
 *
 * const x: { a: string, b: boolean } = { a: 'foo', b: false }
 * assert.deepStrictEqual(
 *   collect((key, val) => ({key: key, value: val}))(x),
 *   [{key: 'a', value: 'foo'}, {key: 'b', value: false}]
 * )
 *
 * @since 2.0.0
 */
exports.collect = RR.collect;
/**
 * @since 2.0.0
 */
exports.toArray = RR.toReadonlyArray;
function toUnfoldable(U) {
    return RR.toUnfoldable(U);
}
exports.toUnfoldable = toUnfoldable;
function insertAt(k, a) {
    return RR.insertAt(k, a);
}
exports.insertAt = insertAt;
/**
 * @since 2.0.0
 */
exports.hasOwnProperty = RR.hasOwnProperty;
function deleteAt(k) {
    return RR.deleteAt(k);
}
exports.deleteAt = deleteAt;
/**
 * @since 2.0.0
 */
exports.updateAt = RR.updateAt;
/**
 * @since 2.0.0
 */
exports.modifyAt = RR.modifyAt;
function pop(k) {
    return RR.pop(k);
}
exports.pop = pop;
/**
 * Test whether one record contains all of the keys and values contained in another record
 *
 * @since 2.0.0
 */
exports.isSubrecord = RR.isSubrecord;
function getEq(E) {
    return RR.getEq(E);
}
exports.getEq = getEq;
function getMonoid(S) {
    return RR.getMonoid(S);
}
exports.getMonoid = getMonoid;
/**
 * Lookup the value for a key in a record
 *
 * @since 2.0.0
 */
exports.lookup = RR.lookup;
/**
 * @since 2.0.0
 */
exports.empty = {};
function mapWithIndex(f) {
    return RR.mapWithIndex(f);
}
exports.mapWithIndex = mapWithIndex;
function map(f) {
    return RR.map(f);
}
exports.map = map;
function reduceWithIndex(b, f) {
    return RR.reduceWithIndex(b, f);
}
exports.reduceWithIndex = reduceWithIndex;
function foldMapWithIndex(M) {
    return RR.foldMapWithIndex(M);
}
exports.foldMapWithIndex = foldMapWithIndex;
function reduceRightWithIndex(b, f) {
    return RR.reduceRightWithIndex(b, f);
}
exports.reduceRightWithIndex = reduceRightWithIndex;
/**
 * Create a record with one key/value pair
 *
 * @since 2.0.0
 */
exports.singleton = RR.singleton;
function traverseWithIndex(F) {
    return RR.traverseWithIndex(F);
}
exports.traverseWithIndex = traverseWithIndex;
function traverse(F) {
    return RR.traverse(F);
}
exports.traverse = traverse;
function sequence(F) {
    return RR.sequence(F);
}
exports.sequence = sequence;
function partitionMapWithIndex(f) {
    return RR.partitionMapWithIndex(f);
}
exports.partitionMapWithIndex = partitionMapWithIndex;
function partitionWithIndex(predicateWithIndex) {
    return RR.partitionWithIndex(predicateWithIndex);
}
exports.partitionWithIndex = partitionWithIndex;
function filterMapWithIndex(f) {
    return RR.filterMapWithIndex(f);
}
exports.filterMapWithIndex = filterMapWithIndex;
function filterWithIndex(predicateWithIndex) {
    return RR.filterWithIndex(predicateWithIndex);
}
exports.filterWithIndex = filterWithIndex;
function fromFoldable(M, F) {
    return RR.fromFoldable(M, F);
}
exports.fromFoldable = fromFoldable;
function fromFoldableMap(M, F) {
    return RR.fromFoldableMap(M, F);
}
exports.fromFoldableMap = fromFoldableMap;
/**
 * @since 2.0.0
 */
exports.every = RR.every;
/**
 * @since 2.0.0
 */
exports.some = RR.some;
/**
 * @since 2.0.0
 */
exports.elem = RR.elem;
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.filter = RR.filter;
/**
 * @since 2.0.0
 */
exports.filterMap = RR.filterMap;
/**
 * @since 2.0.0
 */
exports.foldMap = RR.foldMap;
/**
 * @since 2.0.0
 */
exports.partition = RR.partition;
/**
 * @since 2.0.0
 */
exports.partitionMap = RR.partitionMap;
/**
 * @since 2.0.0
 */
exports.reduce = RR.reduce;
/**
 * @since 2.0.0
 */
exports.reduceRight = RR.reduceRight;
/**
 * @since 2.0.0
 */
exports.compact = RR.compact;
/**
 * @since 2.0.0
 */
exports.separate = RR.separate;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
exports.record = 
/*#__PURE__*/
(function () {
    return __assign(__assign({}, RR.readonlyRecord), { URI: exports.URI });
})();