/**
 * @since 2.0.0
 */
import { Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { Chain2C } from './Chain'
import { ChainRec2C } from './ChainRec'
import { Comonad2 } from './Comonad'
import { Foldable2 } from './Foldable'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Semigroupoid2 } from './Semigroupoid'
import { Traversable2, PipeableTraverse2 } from './Traversable'
import { Functor2 } from './Functor'
/**
 * @category destructors
 * @since 2.0.0
 */
export declare const fst: <A, S>(sa: [A, S]) => A
/**
 * @category destructors
 * @since 2.0.0
 */
export declare const snd: <A, S>(sa: [A, S]) => S
/**
 * @category combinators
 * @since 2.0.0
 */
export declare const swap: <A, S>(sa: [A, S]) => [S, A]
/**
 * @category instances
 * @since 2.0.0
 */
export declare const getApply: <S>(S: Semigroup<S>) => Apply2C<URI, S>
/**
 * @category instances
 * @since 2.0.0
 */
export declare const getApplicative: <S>(M: Monoid<S>) => Applicative2C<URI, S>
/**
 * @category instances
 * @since 2.0.0
 */
export declare const getChain: <S>(S: Semigroup<S>) => Chain2C<URI, S>
/**
 * @category instances
 * @since 2.0.0
 */
export declare const getMonad: <S>(M: Monoid<S>) => Monad2C<URI, S>
/**
 * @category instances
 * @since 2.0.0
 */
export declare const getChainRec: <S>(M: Monoid<S>) => ChainRec2C<URI, S>
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: [A, E]) => [B, G]
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: [A, E]) => [A, G]
/**
 * @category Semigroupoid
 * @since 2.0.0
 */
export declare const compose: <E, A>(la: [A, E]) => <B>(ab: [B, A]) => [B, E]
/**
 * @category Extend
 * @since 2.0.0
 */
export declare const duplicate: <E, A>(ma: [A, E]) => [[A, E], E]
/**
 * @category Extend
 * @since 2.0.0
 */
export declare const extend: <E, A, B>(f: (wa: [A, E]) => B) => (wa: [A, E]) => [B, E]
/**
 * @category Extract
 * @since 2.6.2
 */
export declare const extract: <E, A>(wa: [A, E]) => A
/**
 * @category Foldable
 * @since 2.0.0
 */
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: [A, E]) => M
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: [A, E]) => [B, E]
/**
 * @category Foldable
 * @since 2.0.0
 */
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: [A, E]) => B
/**
 * @category Foldable
 * @since 2.0.0
 */
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: [A, E]) => B
/**
 * @since 2.6.3
 */
export declare const traverse: PipeableTraverse2<URI>
/**
 * @since 2.6.3
 */
export declare const sequence: Traversable2<URI>['sequence']
/**
 * @category instances
 * @since 2.0.0
 */
export declare const URI = 'Tuple'
/**
 * @category instances
 * @since 2.0.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: [A, E]
  }
}
/**
 * @category instances
 * @since 2.7.0
 */
export declare const functorTuple: Functor2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const bifunctorTuple: Bifunctor2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const semigroupoidTuple: Semigroupoid2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const comonadTuple: Comonad2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const foldableTuple: Foldable2<URI>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const traversableTuple: Traversable2<URI>
/**
 * @category instances
 * @since 2.0.0
 */
export declare const tuple: Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2<URI> & Traversable2<URI>
