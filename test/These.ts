import * as assert from 'assert'
import { eqNumber } from '../src/Eq'
import { identity, pipe } from '../src/function'
import { monoidString, monoidSum } from '../src/Monoid'
import { none, option, some } from '../src/Option'
import { semigroupString } from '../src/Semigroup'
import { showString } from '../src/Show'
import * as _ from '../src/These'

describe('These', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number) => n * 2
      assert.deepStrictEqual(pipe(_.left(2), _.map(double)), _.left(2))
      assert.deepStrictEqual(pipe(_.right(2), _.map(double)), _.right(4))
      assert.deepStrictEqual(pipe(_.both(1, 2), _.map(double)), _.both(1, 4))
    })

    it('bimap', () => {
      const len = (s: string): number => s.length
      const double = (n: number): number => n * 2
      assert.deepStrictEqual(pipe(_.left('a'), _.bimap(len, double)), _.left(1))
      assert.deepStrictEqual(pipe(_.right(2), _.bimap(len, double)), _.right(4))
      assert.deepStrictEqual(pipe(_.both('foo', 1), _.bimap(len, double)), _.both(3, 2))
    })

    it('mapLeft', () => {
      const len = (s: string): number => s.length
      assert.deepStrictEqual(pipe(_.left('a'), _.mapLeft(len)), _.left(1))
      assert.deepStrictEqual(pipe(_.right(2), _.mapLeft(len)), _.right(2))
      assert.deepStrictEqual(pipe(_.both('foo', 1), _.mapLeft(len)), _.both(3, 1))
    })

    it('reduce', () => {
      assert.deepStrictEqual(
        pipe(
          _.left('b'),
          _.reduce('a', (b, a) => b + a)
        ),
        'a'
      )
      assert.deepStrictEqual(
        pipe(
          _.right('b'),
          _.reduce('a', (b, a) => b + a)
        ),
        'ab'
      )
      assert.deepStrictEqual(
        pipe(
          _.both(1, 'b'),
          _.reduce('a', (b, a) => b + a)
        ),
        'ab'
      )
    })

    it('foldMap', () => {
      assert.deepStrictEqual(pipe(_.right('a'), _.foldMap(monoidString)(identity)), 'a')
      assert.deepStrictEqual(pipe(_.left(1), _.foldMap(monoidString)(identity)), '')
      assert.deepStrictEqual(pipe(_.both(1, 'a'), _.foldMap(monoidString)(identity)), 'a')
    })

    it('reduceRight', () => {
      const f = (a: string, acc: string) => acc + a
      assert.deepStrictEqual(pipe(_.right('a'), _.reduceRight('', f)), 'a')
      assert.deepStrictEqual(pipe(_.left(1), _.reduceRight('', f)), '')
      assert.deepStrictEqual(pipe(_.both(1, 'a'), _.reduceRight('', f)), 'a')
    })

    it('traverse', () => {
      const traverse = _.traverse(option)((n: number) => (n > 1 ? some(n) : none))
      assert.deepStrictEqual(pipe(_.left('a'), traverse), some(_.left('a')))
      assert.deepStrictEqual(pipe(_.right(2), traverse), some(_.right(2)))
      assert.deepStrictEqual(pipe(_.right(1), traverse), none)
      assert.deepStrictEqual(pipe(_.both('a', 2), traverse), some(_.both('a', 2)))
      assert.deepStrictEqual(
        pipe(
          _.both('a', 1),
          _.traverse(option)((n) => (n >= 2 ? some(n) : none))
        ),
        none
      )
    })

    it('sequence', () => {
      const sequence = _.sequence(option)
      assert.deepStrictEqual(sequence(_.left('a')), some(_.left('a')))
      assert.deepStrictEqual(sequence(_.right(some(1))), some(_.right(1)))
      assert.deepStrictEqual(sequence(_.right(none)), none)
      assert.deepStrictEqual(sequence(_.both('a', some(1))), some(_.both('a', 1)))
      assert.deepStrictEqual(sequence(_.both('a', none)), none)
    })
  })

  it('chain', () => {
    const M = _.getMonad(monoidString)
    const f = (n: number) => (n >= 2 ? (n <= 5 ? _.right(n * 2) : _.both('bar', n)) : _.left('bar'))
    assert.deepStrictEqual(M.chain(_.left('foo'), f), _.left('foo'))
    assert.deepStrictEqual(M.chain(_.right(2), f), _.right(4))
    assert.deepStrictEqual(M.chain(_.right(1), f), _.left('bar'))
    assert.deepStrictEqual(M.chain(_.right(6), f), _.both('bar', 6))
    assert.deepStrictEqual(M.chain(_.both('foo', 2), f), _.both('foo', 4))
    assert.deepStrictEqual(M.chain(_.both('foo', 1), f), _.left('foobar'))
    assert.deepStrictEqual(M.chain(_.both('foo', 6), f), _.both('foobar', 6))
  })

  it('getEq', () => {
    const { equals } = _.getEq(eqNumber, eqNumber)
    assert.deepStrictEqual(equals(_.left(2), _.left(2)), true)
    assert.deepStrictEqual(equals(_.left(2), _.left(3)), false)
    assert.deepStrictEqual(equals(_.left(3), _.left(2)), false)
    assert.deepStrictEqual(equals(_.left(2), _.right(2)), false)
    assert.deepStrictEqual(equals(_.left(2), _.both(2, 2)), false)
    assert.deepStrictEqual(equals(_.right(2), _.right(2)), true)
    assert.deepStrictEqual(equals(_.right(2), _.right(3)), false)
    assert.deepStrictEqual(equals(_.right(3), _.right(2)), false)
    assert.deepStrictEqual(equals(_.right(2), _.both(2, 2)), false)
    assert.deepStrictEqual(equals(_.both(2, 2), _.both(2, 2)), true)
    assert.deepStrictEqual(equals(_.both(2, 3), _.both(3, 2)), false)
  })

  it('getSemigroup', () => {
    const { concat } = _.getSemigroup(monoidString, monoidSum)
    assert.deepStrictEqual(concat(_.left('a'), _.left('b')), _.left('ab'))
    assert.deepStrictEqual(concat(_.left('a'), _.right(2)), _.both('a', 2))
    assert.deepStrictEqual(concat(_.right(2), _.left('a')), _.both('a', 2))
    assert.deepStrictEqual(concat(_.left('a'), _.both('b', 2)), _.both('ab', 2))
    assert.deepStrictEqual(concat(_.both('b', 2), _.left('a')), _.both('ba', 2))
    assert.deepStrictEqual(concat(_.right(3), _.right(2)), _.right(5))
    assert.deepStrictEqual(concat(_.right(3), _.both('b', 2)), _.both('b', 5))
    assert.deepStrictEqual(concat(_.both('b', 2), _.right(3)), _.both('b', 5))
    assert.deepStrictEqual(concat(_.both('a', 3), _.both('b', 2)), _.both('ab', 5))
  })

  it('getMonad', () => {
    const double = (n: number) => n * 2
    const F = _.getMonad(semigroupString)
    const fab = F.of(double)
    const fa = F.of(1)
    assert.deepStrictEqual(F.ap(fab, fa), F.of(2))
  })

  it('fold', () => {
    const double = (n: number) => n * 2
    const len = (s: string) => s.length
    const f = (s: string, n: number) => len(s) + double(n)
    const fold = _.fold(len, double, f)
    assert.deepStrictEqual(fold(_.left('foo')), 3)
    assert.deepStrictEqual(fold(_.right(1)), 2)
    assert.deepStrictEqual(fold(_.both('foo', 1)), 5)
  })

  it('toTuple', () => {
    assert.deepStrictEqual(pipe(_.left('b'), _.toTuple('a', 1)), ['b', 1])
    assert.deepStrictEqual(pipe(_.right(2), _.toTuple('a', 1)), ['a', 2])
    assert.deepStrictEqual(pipe(_.both('b', 2), _.toTuple('a', 1)), ['b', 2])
  })

  it('getLeft', () => {
    assert.deepStrictEqual(_.getLeft(_.left('a')), some('a'))
    assert.deepStrictEqual(_.getLeft(_.right(1)), none)
    assert.deepStrictEqual(_.getLeft(_.both('a', 1)), some('a'))
  })

  it('getRight', () => {
    assert.deepStrictEqual(_.getRight(_.left('a')), none)
    assert.deepStrictEqual(_.getRight(_.right(1)), some(1))
    assert.deepStrictEqual(_.getRight(_.both('a', 1)), some(1))
  })

  it('leftOrBoth', () => {
    assert.deepStrictEqual(_.leftOrBoth('a')(none), _.left('a'))
    assert.deepStrictEqual(_.leftOrBoth('a')(some(1)), _.both('a', 1))
  })

  it('rightOrBoth', () => {
    assert.deepStrictEqual(_.rightOrBoth(1)(none), _.right(1))
    assert.deepStrictEqual(_.rightOrBoth(1)(some('a')), _.both('a', 1))
  })

  it('getLeftOnly', () => {
    assert.deepStrictEqual(_.getLeftOnly(_.left('a')), some('a'))
    assert.deepStrictEqual(_.getLeftOnly(_.right(1)), none)
    assert.deepStrictEqual(_.getLeftOnly(_.both('a', 1)), none)
  })

  it('getRightOnly', () => {
    assert.deepStrictEqual(_.getRightOnly(_.left('a')), none)
    assert.deepStrictEqual(_.getRightOnly(_.right(1)), some(1))
    assert.deepStrictEqual(_.getRightOnly(_.both('a', 1)), none)
  })

  it('fromOptions', () => {
    assert.deepStrictEqual(_.fromOptions(none, none), none)
    assert.deepStrictEqual(_.fromOptions(some('a'), none), some(_.left('a')))
    assert.deepStrictEqual(_.fromOptions(none, some(1)), some(_.right(1)))
    assert.deepStrictEqual(_.fromOptions(some('a'), some(1)), some(_.both('a', 1)))
  })

  it('isLeft', () => {
    assert.deepStrictEqual(_.isLeft(_.left(1)), true)
    assert.deepStrictEqual(_.isLeft(_.right(1)), false)
    assert.deepStrictEqual(_.isLeft(_.both('1', 1)), false)
  })

  it('isRight', () => {
    assert.deepStrictEqual(_.isRight(_.left(1)), false)
    assert.deepStrictEqual(_.isRight(_.right(1)), true)
    assert.deepStrictEqual(_.isRight(_.both('1', 1)), false)
  })

  it('isBoth', () => {
    assert.deepStrictEqual(_.isBoth(_.left(1)), false)
    assert.deepStrictEqual(_.isBoth(_.right(1)), false)
    assert.deepStrictEqual(_.isBoth(_.both('1', 1)), true)
  })

  it('getShow', () => {
    const S = _.getShow(showString, showString)
    assert.deepStrictEqual(S.show(_.left('a')), `left("a")`)
    assert.deepStrictEqual(S.show(_.right('a')), `right("a")`)
    assert.deepStrictEqual(S.show(_.both('a', 'b')), `both("a", "b")`)
  })

  it('swap', () => {
    assert.deepStrictEqual(_.swap(_.left('a')), _.right('a'))
    assert.deepStrictEqual(_.swap(_.right('a')), _.left('a'))
    assert.deepStrictEqual(_.swap(_.both('a', 1)), _.both(1, 'a'))
  })
})
