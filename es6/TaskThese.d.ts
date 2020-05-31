/**
 * @since 2.4.0
 */
import { Bifunctor2 } from './Bifunctor'
import { Functor2 } from './Functor'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad2C } from './Monad'
import { MonadTask2C } from './MonadTask'
import { Semigroup } from './Semigroup'
import * as T from './Task'
import * as TH from './These'
import These = TH.These
import Task = T.Task
/**
 * @since 2.4.0
 */
export declare const URI = 'TaskThese'
/**
 * @since 2.4.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: TaskThese<E, A>
  }
}
/**
 * @since 2.4.0
 */
export interface TaskThese<E, A> extends Task<These<E, A>> {}
/**
 * @since 2.4.0
 */
export declare const left: <E = never, A = never>(e: E) => TaskThese<E, A>
/**
 * @since 2.4.0
 */
export declare const right: <E = never, A = never>(a: A) => TaskThese<E, A>
/**
 * @since 2.4.0
 */
export declare const both: <E, A>(e: E, a: A) => TaskThese<E, A>
/**
 * @since 2.4.0
 */
export declare function rightIO<E = never, A = never>(ma: IO<A>): TaskThese<E, A>
/**
 * @since 2.4.0
 */
export declare function leftIO<E = never, A = never>(me: IO<E>): TaskThese<E, A>
/**
 * @since 2.4.0
 */
export declare const leftTask: <E = never, A = never>(me: Task<E>) => TaskThese<E, A>
/**
 * @since 2.4.0
 */
export declare const rightTask: <E = never, A = never>(ma: Task<A>) => TaskThese<E, A>
/**
 * @since 2.4.0
 */
export declare const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskThese<E, A>
/**
 * @since 2.4.0
 */
export declare const fold: <E, B, A>(
  onLeft: (e: E) => Task<B>,
  onRight: (a: A) => Task<B>,
  onBoth: (e: E, a: A) => Task<B>
) => (fa: TaskThese<E, A>) => Task<B>
/**
 * @since 3.0.0
 */
export declare const toTuple: <E, A>(e: () => E, a: () => A) => (fa: TaskThese<E, A>) => Task<[E, A]>
/**
 * @since 2.4.0
 */
export declare const swap: <E, A>(fa: TaskThese<E, A>) => TaskThese<A, E>
/**
 * @since 2.4.0
 */
export declare function getSemigroup<E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<TaskThese<E, A>>
/**
 * @since 2.4.0
 */
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskThese<E, A>) => TaskThese<E, B>
/**
 * @since 3.0.0
 */
export declare const functorTaskThese: Functor2<URI>
/**
 * @since 2.4.0
 */
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: TaskThese<E, A>) => TaskThese<G, B>
/**
 * @since 2.4.0
 */
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: TaskThese<E, A>) => TaskThese<G, A>
/**
 * @since 3.0.0
 */
export declare const bifunctorTaskThese: Bifunctor2<URI>
/**
 * @since 2.4.0
 */
export declare function getMonad<E>(S: Semigroup<E>): Monad2C<URI, E> & MonadTask2C<URI, E>