import { Compactable2, Separated } from './Compactable'
import { Either } from './Either'
import { Eq } from './Eq'
import { Filterable2 } from './Filterable'
import { FilterableWithIndex2C } from './FilterableWithIndex'
import { Foldable, Foldable1, Foldable2, Foldable3 } from './Foldable'
import { Predicate, Refinement } from './function'
import { Functor2 } from './Functor'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { Magma } from './Magma'
import { Monoid } from './Monoid'
import * as O from './Option'
import { Ord } from './Ord'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { TraversableWithIndex2C } from './TraversableWithIndex'
import { Unfoldable, Unfoldable1 } from './Unfoldable'
import { Witherable2C } from './Witherable'
import Option = O.Option
/**
 * @category constructors
 * @since 2.5.0
 */
export declare function fromMap<K, A>(m: Map<K, A>): ReadonlyMap<K, A>
/**
 * @category destructors
 * @since 2.5.0
 */
export declare function toMap<K, A>(m: ReadonlyMap<K, A>): Map<K, A>
/**
 * @category instances
 * @since 2.5.0
 */
export declare function getShow<K, A>(SK: Show<K>, SA: Show<A>): Show<ReadonlyMap<K, A>>
/**
 * Calculate the number of key/value pairs in a map
 *
 * @since 2.5.0
 */
export declare function size<K, A>(d: ReadonlyMap<K, A>): number
/**
 * Test whether or not a map is empty
 *
 * @since 2.5.0
 */
export declare function isEmpty<K, A>(d: ReadonlyMap<K, A>): boolean
/**
 * Test whether or not a key exists in a map
 *
 * @since 2.5.0
 */
export declare function member<K>(
  E: Eq<K>
): {
  (k: K): <A>(m: ReadonlyMap<K, A>) => boolean
  <A>(k: K, m: ReadonlyMap<K, A>): boolean
}
/**
 * Test whether or not a value is a member of a map
 *
 * @since 2.5.0
 */
export declare function elem<A>(
  E: Eq<A>
): {
  (a: A): <K>(m: ReadonlyMap<K, A>) => boolean
  <K>(a: A, m: ReadonlyMap<K, A>): boolean
}
/**
 * Get a sorted array of the keys contained in a map
 *
 * @since 2.5.0
 */
export declare function keys<K>(O: Ord<K>): <A>(m: ReadonlyMap<K, A>) => ReadonlyArray<K>
/**
 * Get a sorted array of the values contained in a map
 *
 * @since 2.5.0
 */
export declare function values<A>(O: Ord<A>): <K>(m: ReadonlyMap<K, A>) => ReadonlyArray<A>
/**
 * @since 2.5.0
 */
export declare function collect<K>(
  O: Ord<K>
): <A, B>(f: (k: K, a: A) => B) => (m: ReadonlyMap<K, A>) => ReadonlyArray<B>
/**
 * Get a sorted of the key/value pairs contained in a map
 *
 * @category destructors
 * @since 2.5.0
 */
export declare function toReadonlyArray<K>(O: Ord<K>): <A>(m: ReadonlyMap<K, A>) => ReadonlyArray<readonly [K, A]>
/**
 * Unfolds a map into a list of key/value pairs
 *
 * @category destructors
 * @since 2.5.0
 */
export declare function toUnfoldable<K, F extends URIS>(
  ord: Ord<K>,
  U: Unfoldable1<F>
): <A>(d: ReadonlyMap<K, A>) => Kind<F, readonly [K, A]>
export declare function toUnfoldable<K, F>(
  ord: Ord<K>,
  U: Unfoldable<F>
): <A>(d: ReadonlyMap<K, A>) => HKT<F, readonly [K, A]>
/**
 * Insert or replace a key/value pair in a map
 *
 * @category combinators
 * @since 2.5.0
 */
export declare function insertAt<K>(E: Eq<K>): <A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => ReadonlyMap<K, A>
/**
 * Delete a key and value from a map
 *
 * @category combinators
 * @since 2.5.0
 */
export declare function deleteAt<K>(E: Eq<K>): (k: K) => <A>(m: ReadonlyMap<K, A>) => ReadonlyMap<K, A>
/**
 * @since 2.5.0
 */
export declare function updateAt<K>(E: Eq<K>): <A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => Option<ReadonlyMap<K, A>>
/**
 * @since 2.5.0
 */
export declare function modifyAt<K>(
  E: Eq<K>
): <A>(k: K, f: (a: A) => A) => (m: ReadonlyMap<K, A>) => Option<ReadonlyMap<K, A>>
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 2.5.0
 */
export declare function pop<K>(E: Eq<K>): (k: K) => <A>(m: ReadonlyMap<K, A>) => Option<readonly [A, ReadonlyMap<K, A>]>
/**
 * Lookup the value for a key in a `Map`.
 * If the result is a `Some`, the existing key is also returned.
 *
 * @since 2.5.0
 */
export declare function lookupWithKey<K>(
  E: Eq<K>
): {
  (k: K): <A>(m: ReadonlyMap<K, A>) => Option<readonly [K, A]>
  <A>(k: K, m: ReadonlyMap<K, A>): Option<readonly [K, A]>
}
/**
 * Lookup the value for a key in a `Map`.
 *
 * @since 2.5.0
 */
export declare function lookup<K>(
  E: Eq<K>
): {
  (k: K): <A>(m: ReadonlyMap<K, A>) => Option<A>
  <A>(k: K, m: ReadonlyMap<K, A>): Option<A>
}
/**
 * Test whether or not one `Map` contains all of the keys and values contained in another `Map`
 *
 * @since 2.5.0
 */
export declare function isSubmap<K, A>(
  SK: Eq<K>,
  SA: Eq<A>
): {
  (that: ReadonlyMap<K, A>): (me: ReadonlyMap<K, A>) => boolean
  (me: ReadonlyMap<K, A>, that: ReadonlyMap<K, A>): boolean
}
/**
 * @since 2.5.0
 */
export declare const empty: ReadonlyMap<never, never>
/**
 * @category instances
 * @since 2.5.0
 */
export declare function getEq<K, A>(SK: Eq<K>, SA: Eq<A>): Eq<ReadonlyMap<K, A>>
/**
 * Gets `Monoid` instance for Maps given `Semigroup` instance for their values
 *
 * @category instances
 * @since 2.5.0
 */
export declare function getMonoid<K, A>(SK: Eq<K>, SA: Semigroup<A>): Monoid<ReadonlyMap<K, A>>
/**
 * Create a map with one key/value pair
 *
 * @category constructors
 * @since 2.5.0
 */
export declare function singleton<K, A>(k: K, a: A): ReadonlyMap<K, A>
/**
 * Create a map from a foldable collection of key/value pairs, using the
 * specified `Magma` to combine values for duplicate keys.
 *
 * @category constructors
 * @since 2.5.0
 */
export declare function fromFoldable<F extends URIS3, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable3<F>
): <R, E>(fka: Kind3<F, R, E, readonly [K, A]>) => ReadonlyMap<K, A>
export declare function fromFoldable<F extends URIS2, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable2<F>
): <E>(fka: Kind2<F, E, readonly [K, A]>) => ReadonlyMap<K, A>
export declare function fromFoldable<F extends URIS, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable1<F>
): (fka: Kind<F, readonly [K, A]>) => ReadonlyMap<K, A>
export declare function fromFoldable<F, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable<F>
): (fka: HKT<F, readonly [K, A]>) => ReadonlyMap<K, A>
/**
 * @category Compactable
 * @since 2.5.0
 */
export declare const compact: <K, A>(fa: ReadonlyMap<K, O.Option<A>>) => ReadonlyMap<K, A>
/**
 * @category Filterable
 * @since 2.5.0
 */
export declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
  <A>(predicate: Predicate<A>): <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, A>
}
/**
 * @category Filterable
 * @since 2.5.0
 */
export declare const filterMap: <A, B>(f: (a: A) => Option<B>) => <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.5.0
 */
export declare const map: <A, B>(f: (a: A) => B) => <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
/**
 * @category Filterable
 * @since 2.5.0
 */
export declare const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): <K>(
    fa: ReadonlyMap<K, A>
  ) => Separated<ReadonlyMap<K, A>, ReadonlyMap<K, B>>
  <A>(predicate: Predicate<A>): <K>(fa: ReadonlyMap<K, A>) => Separated<ReadonlyMap<K, A>, ReadonlyMap<K, A>>
}
/**
 * @category Filterable
 * @since 2.5.0
 */
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => <K>(fa: ReadonlyMap<K, A>) => Separated<ReadonlyMap<K, B>, ReadonlyMap<K, C>>
/**
 * @category Compactable
 * @since 2.5.0
 */
export declare const separate: <K, A, B>(
  fa: ReadonlyMap<K, Either<A, B>>
) => Separated<ReadonlyMap<K, A>, ReadonlyMap<K, B>>
/**
 * @category instances
 * @since 2.5.0
 */
export declare const URI = 'ReadonlyMap'
/**
 * @category instances
 * @since 2.5.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: ReadonlyMap<E, A>
  }
}
/**
 * @category instances
 * @since 2.5.0
 */
export declare function getFilterableWithIndex<K = never>(): FilterableWithIndex2C<URI, K, K>
/**
 * @category instances
 * @since 2.5.0
 */
export declare function getWitherable<K>(O: Ord<K>): Witherable2C<URI, K> & TraversableWithIndex2C<URI, K, K>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const functorMap: Functor2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const compactableMap: Compactable2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const filterableMap: Filterable2<URI>
/**
 * @category instances
 * @since 2.5.0
 */
export declare const readonlyMap: Filterable2<URI>
