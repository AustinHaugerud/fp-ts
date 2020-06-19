/**
 * @since 2.0.0
 */
import { Functor2 } from './Functor'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
/**
 * @category model
 * @since 2.0.0
 */
export interface Writer<W, A> {
  (): [A, W]
}
/**
 * Appends a value to the accumulator
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const tell: <W>(w: W) => Writer<W, void>
/**
 * Modifies the result to include the changes to the accumulator
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const listen: <W, A>(fa: Writer<W, A>) => Writer<W, [A, W]>
/**
 * Applies the returned function to the accumulator
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const pass: <W, A>(fa: Writer<W, [A, (w: W) => W]>) => Writer<W, A>
/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const listens: <W, B>(f: (w: W) => B) => <A>(fa: Writer<W, A>) => Writer<W, [A, B]>
/**
 * Modify the final accumulator value by applying a function
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const censor: <W>(f: (w: W) => W) => <A>(fa: Writer<W, A>) => Writer<W, A>
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: Writer<E, A>) => Writer<E, B>
/**
 * @category instances
 * @since 2.0.0
 */
export declare const URI = 'Writer'
/**
 * @category instances
 * @since 2.0.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Writer<E, A>
  }
}
/**
 * @category instances
 * @since 2.0.0
 */
export declare function getMonad<W>(M: Monoid<W>): Monad2C<URI, W>
/**
 * @category instances
 * @since 2.7.0
 */
export declare const functorWriter: Functor2<URI>
/**
 * @category instances
 * @since 2.0.0
 */
export declare const writer: Functor2<URI>
/**
 * @since 2.0.0
 */
export declare const evalWriter: <W, A>(fa: Writer<W, A>) => A
/**
 * @since 2.0.0
 */
export declare const execWriter: <W, A>(fa: Writer<W, A>) => W
