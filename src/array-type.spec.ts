import 'jest-extended'
import 'boolean-type'

import { ArrayType, Type } from './'

describe('ArrayType', () => {
  const arr = new ArrayType()
  it('should be exist Array type', () => {
    expect(arr).toBeInstanceOf(ArrayType)
    expect(ArrayType.pathArray()).toEqual[('type', arr.name)]
    expect(arr.value).toBeUndefined()
  })

  describe('.from', () => {
    it('should from other array', () => {
      const expected = [6, 3, 3]
      const result = ArrayType.from(expected)
      expect(result.value).toEqual(expected)
    });
  });

  describe('range', () => {
    it('should not set the wrong range of Array', () => {
      expect(() => new ArrayType({ max: 'as' })).toThrow(
        'the max should be an integer'
      )
      expect(() => new ArrayType({ min: 'as' })).toThrow(
        'the min should be an integer'
      )
      expect(() => new ArrayType({ min: 5, max: 2 })).toThrow(
        'the max should be greater than min'
      )
      const result = arr.clone()
      result.max = 2
      expect(() => (result.min = 5)).toThrow('the min should be less than max')
    })
    it('should limit the range of ArrayType value', () => {
      const n = new ArrayType({ min: 2, max: 4 })
      expect(n.min).toStrictEqual(2)
      expect(n.max).toStrictEqual(4)
      expect(n.validate([1, 2])).toBeTrue()
      expect(n.validate([1, 2, 3])).toBeTrue()
      expect(n.validate([1, 2, 3, 4])).toBeTrue()
      expect(n.validate.bind(n, [1])).toThrow(
        'an invalid ' + ArrayType.prototype.name
      )
      expect(n.validate.bind(n, [1, 2, 3, 4, 5])).toThrow(
        'an invalid ' + ArrayType.prototype.name
      )
      expect(n.isValid([])).toBeFalse()
      expect(n.isValid([1, 2, 3, 4, 5])).toBeFalse()
    })
    it('should limit max ArrayType value', () => {
      const n = new ArrayType({ max: 3 })
      expect(n.validate([])).toBeTrue()
      expect(n.validate([1])).toBeTrue()
      expect(n.validate([1, 2])).toBeTrue()
      expect(n.validate([1, 2, 3])).toBeTrue()
      expect(n.validate.bind(n, [1, 2, 3, 4])).toThrow(
        'an invalid ' + ArrayType.prototype.name
      )
      expect(n.isValid([])).toBeTrue()
      expect(n.isValid([1, 2, 3, 4])).toBeFalse()
      expect(n.isValid([1, 2, 3, 4, 5])).toBeFalse()
    })
    it('should limit min ArrayType value', () => {
      const n = new ArrayType({ min: 2 })
      expect(n.validate([1, 2])).toBeTrue()
      expect(n.validate([1, 2, 3])).toBeTrue()
      expect(n.validate([1, 2, 3, 4])).toBeTrue()
      expect(n.validate([1, 2, 3, 4, 5])).toBeTrue()
      expect(n.validate.bind(n, [1])).toThrow(
        'an invalid ' + ArrayType.prototype.name
      )
      expect(n.isValid([])).toBeFalse()
    })
  })

  describe('validate', () => {
    it('should validate string ArrayType value', () => {
      expect(arr.validate('[123]')).toBeTrue()
      expect(arr.validate('[1,2,"s"]')).toBeTrue()
      expect(arr.validate([])).toBeTrue()
      expect(arr.validate.bind(arr, 'dsd')).toThrow(
        'an invalid ' + ArrayType.prototype.name
      )
    })
    it('should validate element type of an array', () => {
      const result = new ArrayType({ of: 'Boolean' })
      expect(result).toBeInstanceOf(ArrayType)
      expect(result.isValid([true, false, false, true])).toBeTrue()
      expect(result.isValid([true, 'noSuchBoolName', false, 'Ha'])).toBeFalse()
      expect(result.errors).toEqual([
        {
          message: 'is invalid',
          name: 'Boolean[1]',
        },
        {
          message: 'is invalid',
          name: 'Boolean[3]',
        },
      ])
    })
    it('should throw error if element type not exists', () => {
      expect(() => new ArrayType({ of: 'NoSuchType' })).toThrow(
        'the "of" option Error: No such type'
      )
    })
  })
  describe('clone', () => {
    it('should clone type', () => {
      const t = new ArrayType({ min: 1, max: 3 })
      const result = t.clone()
      expect(t.isSame(result)).toBeTrue()
    })
    it('should clone value', () => {
      const t = new ArrayType({ min: 1, max: 3 })
      const v = [5, 2]
      t.assign(v)
      const result = t.clone()
      expect(t.isSame(result)).toBeTrue()
      expect(t.value !== v).toBeTrue()
      expect(t.value !== result.value).toBeTrue()
      expect(t.value).toEqual(v)
      expect(result.value).toEqual(v)
    })
  })
  describe('iterator', () => {
    it('should for of array type', () => {
      const expected = new ArrayType<number>([5, 6, 2])
      const result = [] as number[]
      for (const item of expected) {
        result.push(item)
      }
      expect(result).toEqual(expected.value)
      result.length = 0
      for (const item of new ArrayType()) {
        result.push(item)
      }
      expect(result).toHaveLength(0)
    })
  })

  describe('length', () => {
    it('should get/set length', () => {
      const expected = new ArrayType<number>([5, 6, 2])
      expect(expected.length).toStrictEqual(3)
      expect(expected.value).toHaveLength(3)
      expected.length = 2
      expect(expected.length).toStrictEqual(2)
      expect(expected.value).toHaveLength(2)
      const result = new ArrayType()
      expect(result.length).toBeUndefined()
      result.length = 4
      expect(result.length).toBeUndefined()
    })
  })
  describe('sort', () => {
    it('should sort array', () => {
      const result = new ArrayType([6, 3, 7, 2, 0, 9])
      result.sort((a, b) => a - b)
      expect(result.value).toEqual([0, 2, 3, 6, 7, 9])
      new ArrayType().sort()
    })
  })

  describe('forEach', () => {
    it('should forEach array', () => {
      const v = new ArrayType('[3,4,1]')
      const result = [] as number[]
      v.forEach((item) => result.push(item))
      expect(result).toEqual([3, 4, 1])
    })
  })
})
