import * as assert from 'assert'
import * as C from '../src/Const'
import { eqNumber } from '../src/Eq'
import { identity, pipe } from '../src/function'
import * as I from '../src/Identity'
import * as M from '../src/Monoid'
import * as _ from '../src/NonEmptyArray'
import * as O from '../src/Option'
import { ordNumber } from '../src/Ord'
import { semigroupString, semigroupSum } from '../src/Semigroup'
import { showString } from '../src/Show'

describe('O.NonEmptyArray', () => {
  describe('instances', () => {
    describe('Traversable', () => {
      it('traverse', () => {
        const traverse = _.traverse(O.applicativeOption)((n: number) => (n > 1 ? O.some(n) : O.none))
        assert.deepStrictEqual(pipe([2, 3, 4], traverse), O.some([2, 3, 4]))
        assert.deepStrictEqual(pipe([1, 2, 3], traverse), O.none)
      })

      it('sequence', () => {
        const sequence = _.sequence(O.applicativeOption)
        assert.deepStrictEqual(sequence([O.some(1), O.some(2), O.some(3)]), O.some([1, 2, 3]))
        assert.deepStrictEqual(sequence([O.none, O.some(2), O.some(3)]), O.none)
      })
    })
  })

  it('head', () => {
    assert.deepStrictEqual(_.head([1, 2]), 1)
  })

  it('tail', () => {
    assert.deepStrictEqual(_.tail([1, 2]), [2])
  })

  it('map', () => {
    const double = (n: number) => n * 2
    assert.deepStrictEqual(pipe([1, 2], _.map(double)), [2, 4])
  })

  it('mapWithIndex', () => {
    const add = (i: number, n: number) => n + i
    assert.deepStrictEqual(pipe([1, 2], _.mapWithIndex(add)), [1, 3])
  })

  it('of', () => {
    assert.deepStrictEqual(_.of(1), [1])
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    const fns: _.NonEmptyArray<(a: number) => number> = [double, double]
    assert.deepStrictEqual(pipe(fns, _.ap([1, 2])), [2, 4, 2, 4])
  })

  it('chain', () => {
    const f = (a: number): _.NonEmptyArray<number> => [a, 4]
    assert.deepStrictEqual(pipe([1, 2], _.chain(f)), [1, 4, 2, 4])
  })

  it('extend', () => {
    const sum = _.fold(M.monoidSum)
    assert.deepStrictEqual(pipe([1, 2, 3, 4], _.extend(sum)), [10, 9, 7, 4])
  })

  it('extract', () => {
    assert.deepStrictEqual(_.nonEmptyArray.extract([1, 2, 3]), 1)
  })

  it('min', () => {
    assert.deepStrictEqual(_.min(ordNumber)([2, 1, 3]), 1)
    assert.deepStrictEqual(_.min(ordNumber)([3]), 3)
  })

  it('max', () => {
    assert.deepStrictEqual(_.max(ordNumber)([1, 2, 3]), 3)
    assert.deepStrictEqual(_.max(ordNumber)([1]), 1)
  })

  it('reduce', () => {
    assert.deepStrictEqual(
      pipe(
        ['a', 'b'],
        _.reduce('', (b, a) => b + a)
      ),
      'ab'
    )
  })

  it('foldMap', () => {
    assert.deepStrictEqual(pipe(['a', 'b', 'c'], _.foldMap(M.monoidString)(identity)), 'abc')
  })

  it('reduceRight', () => {
    assert.deepStrictEqual(
      pipe(
        ['a', 'b', 'c'],
        _.reduceRight('', (a, acc) => acc + a)
      ),
      'cba'
    )
  })

  it('fromArray', () => {
    assert.deepStrictEqual(_.fromArray([]), O.none)
    assert.deepStrictEqual(_.fromArray([1]), O.some([1]))
    assert.deepStrictEqual(_.fromArray([1, 2]), O.some([1, 2]))
  })

  it('getSemigroup', () => {
    const S = _.getSemigroup<number>()
    assert.deepStrictEqual(S.concat([1], [2]), [1, 2])
    assert.deepStrictEqual(S.concat([1, 2], [3, 4]), [1, 2, 3, 4])
  })

  it('getEq', () => {
    const S = _.getEq(eqNumber)
    assert.deepStrictEqual(S.equals([1], [1]), true)
    assert.deepStrictEqual(S.equals([1], [1, 2]), false)
  })

  it('group', () => {
    assert.deepStrictEqual(_.group(ordNumber)([]), [])

    assert.deepStrictEqual(_.group(ordNumber)([1, 2, 1, 1]), [[1], [2], [1, 1]])

    assert.deepStrictEqual(_.group(ordNumber)([1, 2, 1, 1, 3]), [[1], [2], [1, 1], [3]])
  })

  it('groupSort', () => {
    assert.deepStrictEqual(_.groupSort(ordNumber)([]), [])
    assert.deepStrictEqual(_.groupSort(ordNumber)([1, 2, 1, 1]), [[1, 1, 1], [2]])
  })

  it('last', () => {
    assert.deepStrictEqual(_.last([1, 2, 3]), 3)
    assert.deepStrictEqual(_.last([1]), 1)
  })

  it('init', () => {
    assert.deepStrictEqual(_.init([1, 2, 3]), [1, 2])
    assert.deepStrictEqual(_.init([1]), [])
  })

  it('sort', () => {
    assert.deepStrictEqual(_.sort(ordNumber)([3, 2, 1]), [1, 2, 3])
  })

  it('reverse', () => {
    assert.deepStrictEqual(_.reverse([1, 2, 3]), [3, 2, 1])
  })

  it('groupBy', () => {
    assert.deepStrictEqual(_.groupBy((_) => '')([]), {})
    assert.deepStrictEqual(_.groupBy(String)([1]), { '1': [1] })
    assert.deepStrictEqual(_.groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
      '3': ['foo', 'bar'],
      '6': ['foobar']
    })
  })

  it('insertAt', () => {
    const make = (x: number) => ({ x })
    const a1 = make(1)
    const a2 = make(1)
    const a3 = make(2)
    const a4 = make(3)
    assert.deepStrictEqual(_.insertAt(0, a4)([a1, a2, a3]), O.some([a4, a1, a2, a3]))
    assert.deepStrictEqual(_.insertAt(-1, a4)([a1, a2, a3]), O.none)
    assert.deepStrictEqual(_.insertAt(3, a4)([a1, a2, a3]), O.some([a1, a2, a3, a4]))
    assert.deepStrictEqual(_.insertAt(1, a4)([a1, a2, a3]), O.some([a1, a4, a2, a3]))
    assert.deepStrictEqual(_.insertAt(4, a4)([a1, a2, a3]), O.none)
  })

  it('updateAt', () => {
    const make2 = (x: number) => ({ x })
    const a1 = make2(1)
    const a2 = make2(1)
    const a3 = make2(2)
    const a4 = make2(3)
    const arr: _.NonEmptyArray<{ readonly x: number }> = [a1, a2, a3]
    assert.deepStrictEqual(_.updateAt(0, a4)(arr), O.some([a4, a2, a3]))
    assert.deepStrictEqual(_.updateAt(-1, a4)(arr), O.none)
    assert.deepStrictEqual(_.updateAt(3, a4)(arr), O.none)
    assert.deepStrictEqual(_.updateAt(1, a4)(arr), O.some([a1, a4, a3]))
    // should return the same reference if nothing changed
    const r1 = _.updateAt(0, a1)(arr)
    if (O.isSome(r1)) {
      assert.deepStrictEqual(r1.value, arr)
    } else {
      assert.fail('is not a O.Some')
    }
    const r2 = _.updateAt(2, a3)(arr)
    if (O.isSome(r2)) {
      assert.deepStrictEqual(r2.value, arr)
    } else {
      assert.fail('is not a O.Some')
    }
  })

  it('modifyAt', () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(_.modifyAt(1, double)(_.cons(1, [])), O.none)
    assert.deepStrictEqual(_.modifyAt(1, double)(_.cons(1, [2])), O.some(_.cons(1, [4])))
  })

  it('copy', () => {
    const nea1 = _.cons(1, [])
    const nea2 = _.copy(nea1)
    assert.deepStrictEqual(nea2, nea1)
    assert.deepStrictEqual(nea2 === nea1, false)
  })

  it('filter', () => {
    const make = (x: number) => ({ x })
    const a1 = make(1)
    const a2 = make(1)
    const a3 = make(2)
    assert.deepStrictEqual(_.filter(({ x }) => x !== 1)([a1, a2, a3]), O.some([a3]))
    assert.deepStrictEqual(_.filter(({ x }) => x !== 2)([a1, a2, a3]), O.some([a1, a2]))
    assert.deepStrictEqual(
      _.filter(({ x }) => {
        return !(x === 1 || x === 2)
      })([a1, a2, a3]),
      O.none
    )
    assert.deepStrictEqual(_.filter(({ x }) => x !== 10)([a1, a2, a3]), O.some([a1, a2, a3]))

    // refinements
    const actual1 = _.filter(O.isSome)([O.some(3), O.some(2), O.some(1)])
    assert.deepStrictEqual(actual1, O.some([O.some(3), O.some(2), O.some(1)]))
    const actual2 = _.filter(O.isSome)([O.some(3), O.none, O.some(1)])
    assert.deepStrictEqual(actual2, O.some([O.some(3), O.some(1)]))
  })

  it('filterWithIndex', () => {
    assert.deepStrictEqual(_.filterWithIndex((i) => i % 2 === 0)([1, 2, 3]), O.some([1, 3]))
    assert.deepStrictEqual(_.filterWithIndex((i, a: number) => i % 2 === 1 && a > 2)([1, 2, 3]), O.none)
  })

  it('reduceWithIndex', () => {
    assert.deepStrictEqual(
      pipe(
        ['a', 'b'],
        _.reduceWithIndex('', (i, b, a) => b + i + a)
      ),
      '0a1b'
    )
  })

  it('foldMapWithIndex', () => {
    assert.deepStrictEqual(
      pipe(
        ['a', 'b'],
        _.foldMapWithIndex(M.monoidString)((i, a) => i + a)
      ),
      '0a1b'
    )
  })

  it('reduceRightWithIndex', () => {
    assert.deepStrictEqual(
      pipe(
        ['a', 'b'],
        _.reduceRightWithIndex('', (i, a, b) => b + i + a)
      ),
      '1b0a'
    )
  })

  it('traverseWithIndex', () => {
    assert.deepStrictEqual(
      pipe(
        ['a', 'bb'],
        _.nonEmptyArray.traverseWithIndex(O.applicativeOption)((i, s) => (s.length >= 1 ? O.some(s + i) : O.none))
      ),
      O.some(['a0', 'bb1'])
    )
    assert.deepStrictEqual(
      pipe(
        ['a', 'bb'],
        _.nonEmptyArray.traverseWithIndex(O.applicativeOption)((i, s) => (s.length > 1 ? O.some(s + i) : O.none))
      ),
      O.none
    )

    // FoldableWithIndex compatibility
    const f = (i: number, s: string): string => s + i
    assert.deepStrictEqual(
      pipe(['a', 'bb'], _.foldMapWithIndex(M.monoidString)(f)),
      pipe(
        ['a', 'bb'],
        _.nonEmptyArray.traverseWithIndex(C.getApplicative(M.monoidString))((i, a) => C.make(f(i, a)))
      )
    )

    // FunctorWithIndex compatibility
    assert.deepStrictEqual(
      pipe(['a', 'bb'], _.mapWithIndex(f)),
      pipe(
        ['a', 'bb'],
        _.nonEmptyArray.traverseWithIndex(I.identity)((i, a) => I.identity.of(f(i, a)))
      )
    )
  })

  it('cons', () => {
    assert.deepStrictEqual(_.cons(1, [2, 3, 4]), [1, 2, 3, 4])
  })

  it('snoc', () => {
    assert.deepStrictEqual(_.snoc([1, 2, 3], 4), [1, 2, 3, 4])
  })

  it('getShow', () => {
    const S = _.getShow(showString)
    assert.deepStrictEqual(S.show(['a']), `["a"]`)
    assert.deepStrictEqual(S.show(['a', 'b', 'c']), `["a", "b", "c"]`)
  })

  it('alt / concat', () => {
    assert.deepStrictEqual(_.concat(['a'], []), ['a'])
    assert.deepStrictEqual(
      pipe(
        ['a'],
        _.alt(() => ['b'])
      ),
      ['a', 'b']
    )
  })

  it('foldMap', () => {
    const f = _.foldMap(semigroupSum)((s: string) => s.length)
    assert.deepStrictEqual(f(['a']), 1)
    assert.deepStrictEqual(f(['a', 'bb']), 3)
  })

  it('foldMapWithIndex', () => {
    const f = _.foldMapWithIndex(semigroupSum)((i: number, s: string) => s.length + i)
    assert.deepStrictEqual(f(['a']), 1)
    assert.deepStrictEqual(f(['a', 'bb']), 4)
  })

  it('fold', () => {
    const f = _.fold(semigroupString)
    assert.deepStrictEqual(f(['a']), 'a')
    assert.deepStrictEqual(f(['a', 'bb']), 'abb')
  })
})
