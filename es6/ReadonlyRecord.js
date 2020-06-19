import { fromEquals } from './Eq';
import { identity } from './function';
import { isNone, isSome, none, some as optionSome } from './Option';
/**
 * @category constructors
 * @since 2.5.0
 */
export function fromRecord(r) {
    return Object.assign({}, r);
}
/**
 * @category destructors
 * @since 2.5.0
 */
export function toRecord(r) {
    return Object.assign({}, r);
}
/**
 * @category instances
 * @since 2.5.0
 */
export function getShow(S) {
    return {
        show: function (r) {
            var elements = collect(function (k, a) { return JSON.stringify(k) + ": " + S.show(a); })(r).join(', ');
            return elements === '' ? '{}' : "{ " + elements + " }";
        }
    };
}
/**
 * Calculate the number of key/value pairs in a record
 *
 * @since 2.5.0
 */
export function size(r) {
    return Object.keys(r).length;
}
/**
 * Test whether a record is empty
 *
 * @since 2.5.0
 */
export function isEmpty(r) {
    return Object.keys(r).length === 0;
}
/**
 * @since 2.5.0
 */
export function keys(r) {
    return Object.keys(r).sort();
}
/**
 * Map a record into an array
 *
 * @example
 * import {collect} from 'fp-ts/lib/ReadonlyRecord'
 *
 * const x: { a: string, b: boolean } = { a: 'foo', b: false }
 * assert.deepStrictEqual(
 *   collect((key, val) => ({key: key, value: val}))(x),
 *   [{key: 'a', value: 'foo'}, {key: 'b', value: false}]
 * )
 *
 * @since 2.5.0
 */
export function collect(f) {
    return function (r) {
        // tslint:disable-next-line: readonly-array
        var out = [];
        for (var _i = 0, _a = keys(r); _i < _a.length; _i++) {
            var key = _a[_i];
            out.push(f(key, r[key]));
        }
        return out;
    };
}
/**
 * @category destructors
 * @since 2.5.0
 */
export var toReadonlyArray = collect(function (k, a) { return [k, a]; });
export function toUnfoldable(U) {
    return function (r) {
        var arr = toReadonlyArray(r);
        var len = arr.length;
        return U.unfold(0, function (b) { return (b < len ? optionSome([arr[b], b + 1]) : none); });
    };
}
export function insertAt(k, a) {
    return function (r) {
        if (r[k] === a) {
            return r;
        }
        var out = Object.assign({}, r);
        out[k] = a;
        return out;
    };
}
var _hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * @since 2.5.0
 */
export function hasOwnProperty(k, r) {
    return _hasOwnProperty.call(r, k);
}
export function deleteAt(k) {
    return function (r) {
        if (!_hasOwnProperty.call(r, k)) {
            return r;
        }
        var out = Object.assign({}, r);
        delete out[k];
        return out;
    };
}
/**
 * @since 2.5.0
 */
export function updateAt(k, a) {
    return function (r) {
        if (!hasOwnProperty(k, r)) {
            return none;
        }
        if (r[k] === a) {
            return optionSome(r);
        }
        var out = Object.assign({}, r);
        out[k] = a;
        return optionSome(out);
    };
}
/**
 * @since 2.5.0
 */
export function modifyAt(k, f) {
    return function (r) {
        if (!hasOwnProperty(k, r)) {
            return none;
        }
        var out = Object.assign({}, r);
        out[k] = f(r[k]);
        return optionSome(out);
    };
}
export function pop(k) {
    var deleteAtk = deleteAt(k);
    return function (r) {
        var oa = lookup(k, r);
        return isNone(oa) ? none : optionSome([oa.value, deleteAtk(r)]);
    };
}
export function isSubrecord(E) {
    return function (me, that) {
        if (that === undefined) {
            var isSubrecordE_1 = isSubrecord(E);
            return function (that) { return isSubrecordE_1(that, me); };
        }
        for (var k in me) {
            if (!_hasOwnProperty.call(that, k) || !E.equals(me[k], that[k])) {
                return false;
            }
        }
        return true;
    };
}
export function getEq(E) {
    var isSubrecordE = isSubrecord(E);
    return fromEquals(function (x, y) { return isSubrecordE(x)(y) && isSubrecordE(y)(x); });
}
export function getMonoid(S) {
    return {
        concat: function (x, y) {
            if (x === empty) {
                return y;
            }
            if (y === empty) {
                return x;
            }
            var keys = Object.keys(y);
            var len = keys.length;
            if (len === 0) {
                return x;
            }
            var r = Object.assign({}, x);
            for (var i = 0; i < len; i++) {
                var k = keys[i];
                r[k] = _hasOwnProperty.call(x, k) ? S.concat(x[k], y[k]) : y[k];
            }
            return r;
        },
        empty: empty
    };
}
export function lookup(k, r) {
    if (r === undefined) {
        return function (r) { return lookup(k, r); };
    }
    return _hasOwnProperty.call(r, k) ? optionSome(r[k]) : none;
}
/**
 * @since 2.5.0
 */
export var empty = {};
export function mapWithIndex(f) {
    return function (fa) { return mapWithIndex_(fa, f); };
}
export function map(f) {
    return mapWithIndex(function (_, a) { return f(a); });
}
export function reduceWithIndex(b, f) {
    return function (fa) { return reduceWithIndex_(fa, b, f); };
}
export function foldMapWithIndex(M) {
    var foldMapWithIndexM = foldMapWithIndex_(M);
    return function (f) { return function (fa) { return foldMapWithIndexM(fa, f); }; };
}
export function reduceRightWithIndex(b, f) {
    return function (fa) { return reduceRightWithIndex_(fa, b, f); };
}
/**
 * Create a record with one key/value pair
 *
 * @category constructors
 * @since 2.5.0
 */
export function singleton(k, a) {
    var _a;
    return _a = {}, _a[k] = a, _a;
}
export function traverseWithIndex(F) {
    var traverseWithIndexF = traverseWithIndex_(F);
    return function (f) { return function (ta) { return traverseWithIndexF(ta, f); }; };
}
export function traverse(F) {
    var traverseWithIndexF = traverseWithIndex(F);
    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
}
export function sequence(F) {
    return traverseWithIndex(F)(function (_, a) { return a; });
}
/**
 * @category Whitherable
 * @since 2.6.5
 */
export var wither = function (F) {
    var witherF = wither_(F);
    return function (f) { return function (ta) { return witherF(ta, f); }; };
};
/**
 * @category Whitherable
 * @since 2.6.5
 */
export var wilt = function (F) {
    var wiltF = wilt_(F);
    return function (f) { return function (ta) { return wiltF(ta, f); }; };
};
export function partitionMapWithIndex(f) {
    return function (fa) { return partitionMapWithIndex_(fa, f); };
}
export function partitionWithIndex(predicateWithIndex) {
    return function (fa) { return partitionWithIndex_(fa, predicateWithIndex); };
}
export function filterMapWithIndex(f) {
    return function (fa) { return filterMapWithIndex_(fa, f); };
}
export function filterWithIndex(predicateWithIndex) {
    return function (fa) { return filterWithIndex_(fa, predicateWithIndex); };
}
export function fromFoldable(M, F) {
    var fromFoldableMapM = fromFoldableMap(M, F);
    return function (fka) { return fromFoldableMapM(fka, identity); };
}
export function fromFoldableMap(M, F) {
    return function (ta, f) {
        return F.reduce(ta, {}, function (r, a) {
            var _a = f(a), k = _a[0], b = _a[1];
            r[k] = _hasOwnProperty.call(r, k) ? M.concat(r[k], b) : b;
            return r;
        });
    };
}
/**
 * @since 2.5.0
 */
export function every(predicate) {
    return function (r) {
        for (var k in r) {
            if (!predicate(r[k])) {
                return false;
            }
        }
        return true;
    };
}
/**
 * @since 2.5.0
 */
export function some(predicate) {
    return function (r) {
        for (var k in r) {
            if (predicate(r[k])) {
                return true;
            }
        }
        return false;
    };
}
export function elem(E) {
    return function (a, fa) {
        if (fa === undefined) {
            var elemE_1 = elem(E);
            return function (fa) { return elemE_1(a, fa); };
        }
        for (var k in fa) {
            if (E.equals(fa[k], a)) {
                return true;
            }
        }
        return false;
    };
}
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
var map_ = function (fa, f) {
    return mapWithIndex_(fa, function (_, a) { return f(a); });
};
var reduce_ = function (fa, b, f) {
    return reduceWithIndex_(fa, b, function (_, b, a) { return f(b, a); });
};
var foldMap_ = function (M) {
    var foldMapWithIndexM = foldMapWithIndex_(M);
    return function (fa, f) { return foldMapWithIndexM(fa, function (_, a) { return f(a); }); };
};
var reduceRight_ = function (fa, b, f) {
    return reduceRightWithIndex_(fa, b, function (_, a, b) { return f(a, b); });
};
var traverse_ = function (F) {
    var traverseWithIndexF = traverseWithIndex_(F);
    return function (ta, f) { return traverseWithIndexF(ta, function (_, a) { return f(a); }); };
};
var filter_ = function (fa, predicate) {
    return filterWithIndex_(fa, function (_, a) { return predicate(a); });
};
var filterMap_ = function (fa, f) { return filterMapWithIndex_(fa, function (_, a) { return f(a); }); };
var partition_ = function (fa, predicate) {
    return partitionWithIndex_(fa, function (_, a) { return predicate(a); });
};
var partitionMap_ = function (fa, f) {
    return partitionMapWithIndex_(fa, function (_, a) { return f(a); });
};
var mapWithIndex_ = function (fa, f) {
    var out = {};
    var keys = Object.keys(fa);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        out[key] = f(key, fa[key]);
    }
    return out;
};
var reduceWithIndex_ = function (fa, b, f) {
    var out = b;
    var ks = keys(fa);
    var len = ks.length;
    for (var i = 0; i < len; i++) {
        var k = ks[i];
        out = f(k, out, fa[k]);
    }
    return out;
};
var foldMapWithIndex_ = function (M) { return function (fa, f) {
    var out = M.empty;
    var ks = keys(fa);
    var len = ks.length;
    for (var i = 0; i < len; i++) {
        var k = ks[i];
        out = M.concat(out, f(k, fa[k]));
    }
    return out;
}; };
var reduceRightWithIndex_ = function (fa, b, f) {
    var out = b;
    var ks = keys(fa);
    var len = ks.length;
    for (var i = len - 1; i >= 0; i--) {
        var k = ks[i];
        out = f(k, fa[k], out);
    }
    return out;
};
var partitionMapWithIndex_ = function (fa, f) {
    var left = {};
    var right = {};
    var keys = Object.keys(fa);
    for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
        var key = keys_2[_i];
        var e = f(key, fa[key]);
        switch (e._tag) {
            case 'Left':
                left[key] = e.left;
                break;
            case 'Right':
                right[key] = e.right;
                break;
        }
    }
    return {
        left: left,
        right: right
    };
};
var partitionWithIndex_ = function (fa, predicateWithIndex) {
    var left = {};
    var right = {};
    var keys = Object.keys(fa);
    for (var _i = 0, keys_3 = keys; _i < keys_3.length; _i++) {
        var key = keys_3[_i];
        var a = fa[key];
        if (predicateWithIndex(key, a)) {
            right[key] = a;
        }
        else {
            left[key] = a;
        }
    }
    return {
        left: left,
        right: right
    };
};
var filterMapWithIndex_ = function (fa, f) {
    var r = {};
    var keys = Object.keys(fa);
    for (var _i = 0, keys_4 = keys; _i < keys_4.length; _i++) {
        var key = keys_4[_i];
        var optionB = f(key, fa[key]);
        if (isSome(optionB)) {
            r[key] = optionB.value;
        }
    }
    return r;
};
var filterWithIndex_ = function (fa, predicateWithIndex) {
    var out = {};
    var changed = false;
    for (var key in fa) {
        if (_hasOwnProperty.call(fa, key)) {
            var a = fa[key];
            if (predicateWithIndex(key, a)) {
                out[key] = a;
            }
            else {
                changed = true;
            }
        }
    }
    return changed ? out : fa;
};
var traverseWithIndex_ = function (F) { return function (ta, f) {
    var ks = keys(ta);
    if (ks.length === 0) {
        return F.of(empty);
    }
    var fr = F.of({});
    var _loop_1 = function (key) {
        fr = F.ap(F.map(fr, function (r) { return function (b) {
            r[key] = b;
            return r;
        }; }), f(key, ta[key]));
    };
    for (var _i = 0, ks_1 = ks; _i < ks_1.length; _i++) {
        var key = ks_1[_i];
        _loop_1(key);
    }
    return fr;
}; };
var wither_ = function (F) {
    var traverseF = traverse_(F);
    return function (wa, f) { return F.map(traverseF(wa, f), compact); };
};
var wilt_ = function (F) {
    var traverseF = traverse_(F);
    return function (wa, f) { return F.map(traverseF(wa, f), separate); };
};
/**
 * @category Filterable
 * @since 2.5.0
 */
export var filter = function (predicate) { return function (fa) { return filter_(fa, predicate); }; };
/**
 * @category Filterable
 * @since 2.5.0
 */
export var filterMap = function (f) { return function (fa) { return filterMap_(fa, f); }; };
/**
 * @category Foldable
 * @since 2.5.0
 */
export var foldMap = function (M) {
    var foldMapM = foldMap_(M);
    return function (f) { return function (fa) { return foldMapM(fa, f); }; };
};
/**
 * @category Filterable
 * @since 2.5.0
 */
export var partition = function (predicate) { return function (fa) { return partition_(fa, predicate); }; };
/**
 * @category Filterable
 * @since 2.5.0
 */
export var partitionMap = function (f) { return function (fa) { return partitionMap_(fa, f); }; };
/**
 * @category Foldable
 * @since 2.5.0
 */
export var reduce = function (b, f) { return function (fa) {
    return reduce_(fa, b, f);
}; };
/**
 * @category Foldable
 * @since 2.5.0
 */
export var reduceRight = function (b, f) { return function (fa) { return reduceRight_(fa, b, f); }; };
/**
 * @category Compactable
 * @since 2.5.0
 */
export var compact = function (fa) {
    var r = {};
    var keys = Object.keys(fa);
    for (var _i = 0, keys_5 = keys; _i < keys_5.length; _i++) {
        var key = keys_5[_i];
        var optionA = fa[key];
        if (isSome(optionA)) {
            r[key] = optionA.value;
        }
    }
    return r;
};
/**
 * @category Compactable
 * @since 2.5.0
 */
export var separate = function (fa) {
    var left = {};
    var right = {};
    var keys = Object.keys(fa);
    for (var _i = 0, keys_6 = keys; _i < keys_6.length; _i++) {
        var key = keys_6[_i];
        var e = fa[key];
        switch (e._tag) {
            case 'Left':
                left[key] = e.left;
                break;
            case 'Right':
                right[key] = e.right;
                break;
        }
    }
    return {
        left: left,
        right: right
    };
};
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.5.0
 */
export var URI = 'ReadonlyRecord';
/**
 * @category instances
 * @since 2.7.0
 */
export var functorRecord = {
    URI: URI,
    map: map_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var functorWithIndexRecord = {
    URI: URI,
    map: map_,
    mapWithIndex: mapWithIndex_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var foldableRecord = {
    URI: URI,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var foldableWithIndexRecord = {
    URI: URI,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    reduceWithIndex: reduceWithIndex_,
    foldMapWithIndex: foldMapWithIndex_,
    reduceRightWithIndex: reduceRightWithIndex_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var compactableRecord = {
    URI: URI,
    compact: compact,
    separate: separate
};
/**
 * @category instances
 * @since 2.7.0
 */
export var filterableRecord = {
    URI: URI,
    map: map_,
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var filterableWithIndexRecord = {
    URI: URI,
    map: map_,
    mapWithIndex: mapWithIndex_,
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    filterMapWithIndex: filterMapWithIndex_,
    filterWithIndex: filterWithIndex_,
    partitionMapWithIndex: partitionMapWithIndex_,
    partitionWithIndex: partitionWithIndex_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var traversableRecord = {
    URI: URI,
    map: map_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence
};
/**
 * @category instances
 * @since 2.7.0
 */
export var traversableWithIndexRecord = {
    URI: URI,
    map: map_,
    mapWithIndex: mapWithIndex_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    reduceWithIndex: reduceWithIndex_,
    foldMapWithIndex: foldMapWithIndex_,
    reduceRightWithIndex: reduceRightWithIndex_,
    traverse: traverse_,
    sequence: sequence,
    traverseWithIndex: traverseWithIndex_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var witherableRecord = {
    URI: URI,
    map: map_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    wither: wither_,
    wilt: wilt_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.5.0
 */
export var readonlyRecord = {
    URI: URI,
    map: map_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    mapWithIndex: mapWithIndex_,
    reduceWithIndex: reduceWithIndex_,
    foldMapWithIndex: foldMapWithIndex_,
    reduceRightWithIndex: reduceRightWithIndex_,
    filterMapWithIndex: filterMapWithIndex_,
    filterWithIndex: filterWithIndex_,
    partitionMapWithIndex: partitionMapWithIndex_,
    partitionWithIndex: partitionWithIndex_,
    traverseWithIndex: traverseWithIndex_,
    wither: wither_,
    wilt: wilt_
};
