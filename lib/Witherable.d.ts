/**
 * `Witherable` represents data structures which can be _partitioned_ with effects in some `Applicative` functor.
 *
 * `wilt` signature (see `Compactable` `Separated`):
 *
 * ```ts
 * <F>(F: Applicative<F>) => <A, B, C>(wa: HKT<W, A>, f: (a: A) => HKT<F, Either<B, C>>) => HKT<F, Separated<HKT<W, B>, HKT<W, C>>>
 * ```
 *
 * `wither` signature:
 *
 * ```ts
 * <F>(F: Applicative<F>) => <A, B>(ta: HKT<W, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, HKT<W, B>>
 * ```
 *
 * Adapted from https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Witherable.purs
 *
 * @since 2.0.0
 */
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { Option } from './Option'
import { Traversable, Traversable1, Traversable2, Traversable2C, Traversable3 } from './Traversable'
import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import { Filterable, Filterable1, Filterable2, Filterable2C, Filterable3 } from './Filterable'
import { Either } from './Either'
import { Separated } from './Compactable'
/**
 * @since 3.0.0
 */
export interface Witherable<T> extends Traversable<T>, Filterable<T> {
  /**
   * Partition a structure with effects
   */
  readonly wilt: Wilt<T>
  /**
   * Filter a structure with effects
   */
  readonly wither: Wither<T>
}
/**
 * @since 2.0.0
 */
export interface Witherable1<T extends URIS> extends Traversable1<T>, Filterable1<T> {
  readonly wilt: Wilt1<T>
  readonly wither: Wither1<T>
}
/**
 * @since 2.0.0
 */
export interface Witherable2<T extends URIS2> extends Traversable2<T>, Filterable2<T> {
  readonly wilt: Wilt2<T>
  readonly wither: Wither2<T>
}
/**
 * @since 2.0.0
 */
export interface Witherable2C<T extends URIS2, TL> extends Traversable2C<T, TL>, Filterable2C<T, TL> {
  readonly wilt: Wilt2C<T, TL>
  readonly wither: Wither2C<T, TL>
}
/**
 * @since 2.0.0
 */
export interface Witherable3<T extends URIS3> extends Traversable3<T>, Filterable3<T> {
  readonly wilt: Wilt3<T>
  readonly wither: Wither3<T>
}
/**
 * @since 3.0.0
 */
export interface Wither<W> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    f: (a: A) => Kind3<F, R, E, Option<B>>
  ) => (ta: HKT<W, A>) => Kind3<F, R, E, HKT<W, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    f: (a: A) => Kind3<F, R, E, Option<B>>
  ) => (ta: HKT<W, A>) => Kind3<F, R, E, HKT<W, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    f: (a: A) => Kind2<F, E, Option<B>>
  ) => (ta: HKT<W, A>) => Kind2<F, E, HKT<W, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    f: (a: A) => Kind2<F, E, Option<B>>
  ) => (ta: HKT<W, A>) => Kind2<F, E, HKT<W, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(f: (a: A) => Kind<F, Option<B>>) => (ta: HKT<W, A>) => Kind<F, HKT<W, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, Option<B>>) => (ta: HKT<W, A>) => HKT<F, HKT<W, B>>
}
/**
 * @since 3.0.0
 */
export interface Wither1<W extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    f: (a: A) => Kind3<F, R, E, Option<B>>
  ) => (ta: Kind<W, A>) => Kind3<F, R, E, Kind<W, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    f: (a: A) => Kind3<F, R, E, Option<B>>
  ) => (ta: Kind<W, A>) => Kind3<F, R, E, Kind<W, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    f: (a: A) => Kind2<F, E, Option<B>>
  ) => (ta: Kind<W, A>) => Kind2<F, E, Kind<W, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    f: (a: A) => Kind2<F, E, Option<B>>
  ) => (ta: Kind<W, A>) => Kind2<F, E, Kind<W, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, Option<B>>
  ) => (ta: Kind<W, A>) => Kind<F, Kind<W, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, Option<B>>) => (ta: Kind<W, A>) => HKT<F, Kind<W, B>>
}
/**
 * @since 3.0.0
 */
export interface Wither2<W extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B>(
    f: (a: A) => Kind3<F, R, FE, Option<B>>
  ) => <WE>(ta: Kind2<W, WE, A>) => Kind3<F, R, FE, Kind2<W, WE, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => <WE>(ta: Kind2<W, WE, A>) => Kind2<F, FE, Kind2<W, WE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => <WE>(ta: Kind2<W, WE, A>) => Kind2<F, FE, Kind2<W, WE, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, Option<B>>
  ) => <WE>(ta: Kind2<W, WE, A>) => Kind<F, Kind2<W, WE, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, Option<B>>) => <WE>(ta: Kind2<W, WE, A>) => HKT<F, Kind2<W, WE, B>>
}
/**
 * @since 3.0.0
 */
export interface Wither2C<W extends URIS2, WE> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B>(
    f: (a: A) => Kind3<F, R, FE, Option<B>>
  ) => (ta: Kind2<W, WE, A>) => Kind3<F, R, FE, Kind2<W, WE, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => (ta: Kind2<W, WE, A>) => Kind2<F, FE, Kind2<W, WE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => (ta: Kind2<W, WE, A>) => Kind2<F, FE, Kind2<W, WE, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, Option<B>>
  ) => (ta: Kind2<W, WE, A>) => Kind<F, Kind2<W, WE, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, Option<B>>) => (ta: Kind2<W, WE, A>) => HKT<F, Kind2<W, WE, B>>
}
/**
 * @since 3.0.0
 */
export interface Wither3<W extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <A, FR, FE, B>(
    f: (a: A) => Kind3<F, FR, FE, Option<B>>
  ) => <WR, WE>(ta: Kind3<W, WR, WE, A>) => Kind3<F, FR, FE, Kind3<W, WR, WE, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => <WR, WE>(ta: Kind3<W, WR, WE, A>) => Kind2<F, FE, Kind3<W, WR, WE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => <WR, WE>(ta: Kind3<W, WR, WE, A>) => Kind2<F, FE, Kind3<W, WR, WE, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, Option<B>>
  ) => <WR, WE>(ta: Kind3<W, WR, WE, A>) => Kind<F, Kind3<W, WR, WE, B>>
  <F>(F: Applicative<F>): <A, B>(
    f: (a: A) => HKT<F, Option<B>>
  ) => <WR, WE>(ta: Kind3<W, WR, WE, A>) => HKT<F, Kind3<W, WR, WE, B>>
}
/**
 * @since 3.0.0
 */
export interface Wilt<W> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B, C>(
    f: (a: A) => Kind3<F, R, E, Either<B, C>>
  ) => (wa: HKT<W, A>) => Kind3<F, R, E, Separated<HKT<W, B>, HKT<W, C>>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B, C>(
    f: (a: A) => Kind3<F, R, E, Either<B, C>>
  ) => (wa: HKT<W, A>) => Kind3<F, R, E, Separated<HKT<W, B>, HKT<W, C>>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B, C>(
    f: (a: A) => Kind2<F, E, Either<B, C>>
  ) => (wa: HKT<W, A>) => Kind2<F, E, Separated<HKT<W, B>, HKT<W, C>>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B, C>(
    f: (a: A) => Kind2<F, E, Either<B, C>>
  ) => (wa: HKT<W, A>) => Kind2<F, E, Separated<HKT<W, B>, HKT<W, C>>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C>(
    f: (a: A) => Kind<F, Either<B, C>>
  ) => (wa: HKT<W, A>) => Kind<F, Separated<HKT<W, B>, HKT<W, C>>>
  <F>(F: Applicative<F>): <A, B, C>(
    f: (a: A) => HKT<F, Either<B, C>>
  ) => (wa: HKT<W, A>) => HKT<F, Separated<HKT<W, B>, HKT<W, C>>>
}
/**
 * @since 3.0.0
 */
export interface Wilt1<W extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B, C>(
    f: (a: A) => Kind3<F, R, E, Either<B, C>>
  ) => (wa: Kind<W, A>) => Kind3<F, R, E, Separated<Kind<W, B>, Kind<W, C>>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B, C>(
    f: (a: A) => Kind3<F, R, E, Either<B, C>>
  ) => (wa: Kind<W, A>) => Kind3<F, R, E, Separated<Kind<W, B>, Kind<W, C>>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B, C>(
    f: (a: A) => Kind2<F, E, Either<B, C>>
  ) => (wa: Kind<W, A>) => Kind2<F, E, Separated<Kind<W, B>, Kind<W, C>>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B, C>(
    f: (a: A) => Kind2<F, E, Either<B, C>>
  ) => (wa: Kind<W, A>) => Kind2<F, E, Separated<Kind<W, B>, Kind<W, C>>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C>(
    f: (a: A) => Kind<F, Either<B, C>>
  ) => (wa: Kind<W, A>) => Kind<F, Separated<Kind<W, B>, Kind<W, C>>>
  <F>(F: Applicative<F>): <A, B, C>(
    f: (a: A) => HKT<F, Either<B, C>>
  ) => (wa: Kind<W, A>) => HKT<F, Separated<Kind<W, B>, Kind<W, C>>>
}
/**
 * @since 3.0.0
 */
export interface Wilt2<W extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B, C>(
    f: (a: A) => Kind3<F, R, FE, Either<B, C>>
  ) => <WE>(wa: Kind2<W, WE, A>) => Kind3<F, R, FE, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B, C>(
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => <WE>(wa: Kind2<W, WE, A>) => Kind2<F, FE, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B, C>(
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => <WE>(wa: Kind2<W, WE, A>) => Kind2<F, FE, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C>(
    f: (a: A) => Kind<F, Either<B, C>>
  ) => <WE>(wa: Kind2<W, WE, A>) => Kind<F, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F>(F: Applicative<F>): <A, B, C>(
    f: (a: A) => HKT<F, Either<B, C>>
  ) => <WE>(wa: Kind2<W, WE, A>) => HKT<F, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
}
/**
 * @since 3.0.0
 */
export interface Wilt2C<W extends URIS2, WE> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B, C>(
    f: (a: A) => Kind3<F, R, FE, Either<B, C>>
  ) => (wa: Kind2<W, WE, A>) => Kind3<F, R, FE, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B, C>(
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => (wa: Kind2<W, WE, A>) => Kind2<F, FE, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B, C>(
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => (wa: Kind2<W, WE, A>) => Kind2<F, FE, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C>(
    f: (a: A) => Kind<F, Either<B, C>>
  ) => (wa: Kind2<W, WE, A>) => Kind<F, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F>(F: Applicative<F>): <A, B, C>(
    f: (a: A) => HKT<F, Either<B, C>>
  ) => (wa: Kind2<W, WE, A>) => HKT<F, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
}
/**
 * @since 3.0.0
 */
export interface Wilt3<W extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <A, FR, FE, B, C>(
    f: (a: A) => Kind3<F, FR, FE, Either<B, C>>
  ) => <WR, WE>(wa: Kind3<W, WR, WE, A>) => Kind3<F, FR, FE, Separated<Kind3<W, WR, WE, B>, Kind3<W, WR, WE, C>>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B, C>(
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => <WR, WE>(wa: Kind3<W, WR, WE, A>) => Kind2<F, FE, Separated<Kind3<W, WR, WE, B>, Kind3<W, WR, WE, C>>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B, C>(
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => <WR, WE>(wa: Kind3<W, WR, WE, A>) => Kind2<F, FE, Separated<Kind3<W, WR, WE, B>, Kind3<W, WR, WE, C>>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C>(
    f: (a: A) => Kind<F, Either<B, C>>
  ) => <WR, WE>(wa: Kind3<W, WR, WE, A>) => Kind<F, Separated<Kind3<W, WR, WE, B>, Kind3<W, WR, WE, C>>>
  <F>(F: Applicative<F>): <A, B, C>(
    f: (a: A) => HKT<F, Either<B, C>>
  ) => <WR, WE>(wa: Kind3<W, WR, WE, A>) => HKT<F, Separated<Kind3<W, WR, WE, B>, Kind3<W, WR, WE, C>>>
}