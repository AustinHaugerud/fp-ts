/**
 * @since 2.0.0
 */
import { Applicative, Applicative1, Applicative2 } from './Applicative'
import { Apply, Apply1, Apply2 } from './Apply'
import { Functor, Functor1, Functor2 } from './Functor'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2 } from './Monad'
import { Reader } from './Reader'
/**
 * @since 2.0.0
 */
export interface ReaderT<M, R, A> {
  (r: R): HKT<M, A>
}
/**
 * @since 2.0.0
 */
export interface ReaderT1<M extends URIS, R, A> {
  (r: R): Kind<M, A>
}
/**
 * @since 2.0.0
 */
export interface ReaderT2<M extends URIS2, R, E, A> {
  (r: R): Kind2<M, E, A>
}
/**
 * @since 2.0.0
 */
export interface ReaderT3<M extends URIS3, R, U, E, A> {
  (r: R): Kind3<M, U, E, A>
}
/**
 * @since 3.0.0
 */
export declare function map<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderT2<F, R, E, A>) => ReaderT2<F, R, E, B>
export declare function map<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <R>(fa: ReaderT1<F, R, A>) => ReaderT1<F, R, B>
export declare function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <R>(fa: ReaderT<F, R, A>) => ReaderT<F, R, B>
/**
 * @since 3.0.0
 */
export declare function of<F extends URIS2>(F: Applicative2<F>): <R, E, A>(a: A) => ReaderT2<F, R, E, A>
export declare function of<F extends URIS>(F: Applicative1<F>): <R, A>(a: A) => ReaderT1<F, R, A>
export declare function of<F>(F: Applicative<F>): <R, A>(a: A) => ReaderT<F, R, A>
/**
 * @since 3.0.0
 */
export declare function ap<F extends URIS2>(
  F: Apply2<F>
): <R, E, A>(fa: ReaderT2<F, R, E, A>) => <B>(fab: ReaderT2<F, R, E, (a: A) => B>) => ReaderT2<F, R, E, B>
export declare function ap<F extends URIS>(
  F: Apply1<F>
): <R, A>(fa: ReaderT1<F, R, A>) => <B>(fab: ReaderT1<F, R, (a: A) => B>) => ReaderT1<F, R, B>
export declare function ap<F>(
  F: Apply<F>
): <R, A>(fa: ReaderT<F, R, A>) => <B>(fab: ReaderT<F, R, (a: A) => B>) => ReaderT<F, R, B>
/**
 * @since 3.0.0
 */
export declare function chain<F extends URIS2>(
  M: Monad2<F>
): <A, R, E, B>(f: (a: A) => ReaderT2<F, R, E, B>) => (fa: ReaderT2<F, R, E, A>) => ReaderT2<F, R, E, B>
export declare function chain<F extends URIS>(
  M: Monad1<F>
): <A, E, B>(f: (a: A) => ReaderT1<F, E, B>) => (fa: ReaderT1<F, E, A>) => ReaderT1<F, E, B>
export declare function chain<F>(
  M: Monad<F>
): <A, E, B>(f: (a: A) => ReaderT<F, E, B>) => (fa: ReaderT<F, E, A>) => ReaderT<F, E, B>
/**
 * @since 3.0.0
 */
export declare function asks<F extends URIS2>(F: Applicative2<F>): <R, E, A>(f: (r: R) => A) => ReaderT2<F, R, E, A>
export declare function asks<F extends URIS>(F: Applicative1<F>): <R, A>(f: (r: R) => A) => ReaderT1<F, R, A>
export declare function asks<F>(F: Applicative<F>): <R, A>(f: (r: R) => A) => ReaderT<F, R, A>
/**
 * @since 3.0.0
 */
export declare function fromReader<F extends URIS2>(
  F: Applicative2<F>
): <R, E, A>(fa: Reader<R, A>) => ReaderT2<F, R, E, A>
export declare function fromReader<F extends URIS>(F: Applicative1<F>): <R, A>(fa: Reader<R, A>) => ReaderT1<F, R, A>
export declare function fromReader<F>(F: Applicative<F>): <R, A>(fa: Reader<R, A>) => ReaderT<F, R, A>