import { identity, unsafeCoerce } from './function';
/**
 * @category constructors
 * @since 2.0.0
 */
export var make = unsafeCoerce;
/**
 * @category instances
 * @since 2.0.0
 */
export function getShow(S) {
    return {
        show: function (c) { return "make(" + S.show(c) + ")"; }
    };
}
/**
 * @category instances
 * @since 2.0.0
 */
export var getEq = identity;
/**
 * @category instances
 * @since 2.6.0
 */
export var getOrd = identity;
/**
 * @category instances
 * @since 2.6.0
 */
export var getBounded = identity;
/**
 * @category instances
 * @since 2.6.0
 */
export var getSemigroup = identity;
/**
 * @category instances
 * @since 2.6.0
 */
export var getMonoid = identity;
/**
 * @category instances
 * @since 2.6.0
 */
export var getSemiring = identity;
/**
 * @category instances
 * @since 2.6.0
 */
export var getRing = identity;
/**
 * @category instances
 * @since 2.6.0
 */
export var getHeytingAlgebra = identity;
/**
 * @category instances
 * @since 2.6.0
 */
export var getBooleanAlgebra = identity;
/**
 * @category instances
 * @since 2.0.0
 */
export function getApply(S) {
    return {
        URI: URI,
        _E: undefined,
        map: map_,
        ap: function (fab, fa) { return make(S.concat(fab, fa)); }
    };
}
/**
 * @category instances
 * @since 2.0.0
 */
export function getApplicative(M) {
    var A = getApply(M);
    return {
        URI: URI,
        _E: undefined,
        map: A.map,
        ap: A.ap,
        of: function () { return make(M.empty); }
    };
}
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
var contramap_ = unsafeCoerce;
var map_ = unsafeCoerce;
var bimap_ = function (fea, f) { return make(f(fea)); };
var mapLeft_ = function (fea, f) { return make(f(fea)); };
/**
 * @category Contravariant
 * @since 2.0.0
 */
export var contramap = function (f) { return function (fa) { return contramap_(fa, f); }; };
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export var map = function (f) { return function (fa) { return map_(fa, f); }; };
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.6.2
 */
export var bimap = function (f, g) { return function (fa) {
    return bimap_(fa, f, g);
}; };
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.6.2
 */
export var mapLeft = function (f) { return function (fa) { return mapLeft_(fa, f); }; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
export var URI = 'Const';
/**
 * @category instances
 * @since 2.7.0
 */
export var functorConst = {
    URI: URI,
    map: map_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var contravariantConst = {
    URI: URI,
    contramap: contramap_
};
/**
 * @category instances
 * @since 2.7.0
 */
export var bifunctorConst = {
    URI: URI,
    bimap: bimap_,
    mapLeft: mapLeft_
};
/**
 * @category instances
 * @since 2.0.0
 */
export var const_ = {
    URI: URI,
    map: map_,
    contramap: contramap_,
    bimap: bimap_,
    mapLeft: mapLeft_
};
