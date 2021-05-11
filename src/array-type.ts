/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
// import isString from 'util-ex/lib/is/type/string'
import isInteger from 'util-ex/lib/is/type/integer'
// import isArray   from 'util-ex/lib/is/type/array'

import {
  Type,
  register,
  defineProperties,
  ITypeObjectOptions,
} from 'abstract-type'

const isArray = Array.isArray
const ArrayMethods = Array.prototype
const symIterator = Symbol.iterator

export class ArrayType<T> extends Type {
  /**
   * Combines two or more arrays.
   * This method returns a new array without modifying any existing arrays.
   * @param items Additional arrays and/or items to add to the end of the array.
   */
  declare concat: (...items: (T | ConcatArray<T>)[]) => T[]
  declare copyWithin: Function
  declare fill: Function
  declare find: Function
  declare findIndex: Function
  /**
   * Returns the index of the last occurrence of a specified value in an array, or -1 if it is not present.
   * @param searchElement The value to locate in the array.
   * @param fromIndex The array index at which to begin searching backward. If fromIndex is omitted, the search starts at the last index in the array.
   */
  declare lastIndexOf: (searchElement: T, fromIndex?: number) => number
  /**
   * Removes the last element from an array and returns it.
   * If the array is empty, undefined is returned and the array is not modified.
   */
  declare pop: () => T
  /**
   * Appends new elements to the end of an array, and returns the new length of the array.
   * @param items New elements to add to the array.
   */
  declare push: (...items: T[]) => number
  /**
   * Reverses the elements in an array in place.
   * This method mutates the array and returns a reference to the same array.
   */
  declare reverse: () => T[]
  /**
   * Removes the first element from an array and returns it.
   * If the array is empty, undefined is returned and the array is not modified.
   */
  declare shift: () => T | undefined
  /**
   * Inserts new elements at the start of an array, and returns the new length of the array.
   * @param items Elements to insert at the start of the array.
   */
  declare unshift: (...items: T[]) => number
  /**
   * Returns a copy of a section of an array.
   * For both start and end, a negative index can be used to indicate an offset from the end of the array.
   * For example, -2 refers to the second to last element of the array.
   * @param start The beginning index of the specified portion of the array.
   * If start is undefined, then the slice begins at index 0.
   * @param end The end index of the specified portion of the array. This is exclusive of the element at the index 'end'.
   * If end is undefined, then the slice extends to the end of the array.
   */
  declare slice: (start?: number, end?: number) => T[]
  /**
   * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
   * @param start The zero-based location in the array from which to start removing elements.
   * @param deleteCount The number of elements to remove.
   * @param items Elements to insert into the array in place of the deleted elements.
   * @returns An array containing the elements that were deleted.
   */
  declare splice: (start: number, deleteCount?: number, ...items: T[]) => T[]

  declare includes: Function
  /**
   * Returns the index of the first occurrence of a value in an array, or -1 if it is not present.
   * @param searchElement The value to locate in the array.
   * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
   */
  declare indexOf: (searchElement: T, fromIndex?: number) => number
  /**
   * Adds all the elements of an array into a string, separated by the specified separator string.
   * @param separator A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma.
   */
  declare join: (separator?: string) => string
  /**
   * Performs the specified action for each element in an array.
   * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
   * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   */
  declare forEach: (
    callbackfn: (value: T, index: number, array: T[]) => void,
    thisArg?: any
  ) => void
  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
   */
  declare filter: (
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ) => T[]
  declare flat: Function
  declare flatMap: Function
  /**
   * Calls a defined callback function on each element of an array, and returns an array that contains the results.
   * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   */
  declare map: <U>(
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: any
  ) => U[]
  /**
   * Determines whether all the members of an array satisfy the specified test.
   * @param predicate A function that accepts up to three arguments. The every method calls
   * the predicate function for each element in the array until the predicate returns a value
   * which is coercible to the Boolean value false, or until the end of the array.
   * @param thisArg An object to which the this keyword can refer in the predicate function.
   * If thisArg is omitted, undefined is used as the this value.
   */
  declare every: (
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ) => boolean | unknown
  /**
   * Determines whether the specified callback function returns true for any element of an array.
   * @param predicate A function that accepts up to three arguments. The some method calls
   * the predicate function for each element in the array until the predicate returns a value
   * which is coercible to the Boolean value true, or until the end of the array.
   * @param thisArg An object to which the this keyword can refer in the predicate function.
   * If thisArg is omitted, undefined is used as the this value.
   */
  declare some: (
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ) => boolean
  /**
   * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
   * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
   */
  declare reduce: <U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue?: U
  ) => U
  /**
   * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
   * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
   */
  declare reduceRight: (
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T,
    initialValue?: T
  ) => T
  // eslint-disable-next-line prettier/prettier
  declare toLocaleString: () => string
  declare [Symbol.iterator]: () => IterableIterator<T>
  /**
   * Returns an iterable of key, value pairs for every entry in the array
   */
  declare entries: () => IterableIterator<[number, T]>
  /**
   * Returns an iterable of keys in the array
   */
  declare keys: () => IterableIterator<number>
  /**
   * Returns an iterable of values in the array
   */
  declare values: () => IterableIterator<T>

  /**
   * the min array length
   */
  declare static min: number | undefined
  /**
   * the max array length
   */
  declare static max: number | undefined
  /**
   * the element type of the array
   */
  declare static of: string | undefined
  declare min: number | undefined
  declare max: number | undefined
  declare of: string | undefined
  declare _min: number
  declare _max: number

  static toValue<T>(aValue, aOptions?: ITypeObjectOptions): T[] | undefined {
    let result: T[] | undefined
    let vReqClone = aOptions?.assigned
    if (typeof aValue === 'string') {
      try {
        result = JSON.parse(aValue)
        vReqClone = false // do not clone the array value
      } catch (e) {}
    } else {
      result = aValue
    }
    if (isArray(result)) {
      if (vReqClone) result = result.slice()
    } else {
      result = vReqClone ? [] : undefined
    }
    return result
  }

  /**
   * Creates an array from an iterable object.
   * @param iterable An iterable object to convert to an array.
   */
  static from<T>(iterable: Iterable<T> | ArrayLike<T>): ArrayType<T>
  /**
   * Creates an array from an iterable object.
   * @param iterable An iterable object to convert to an array.
   * @param mapfn A mapping function to call on every element of the array.
   * @param thisArg Value of 'this' used to invoke the mapfn.
   */
  static from<T, U>(
    iterable: Iterable<T> | ArrayLike<T>,
    mapfn?: (v: T, k: number) => U,
    thisArg?: any
  ): ArrayType<T> {
    return new ArrayType(
      Array.from<T, U>(iterable as any, mapfn as any, thisArg)
    )
  }

  get length() {
    return this.value?.length
  }

  set length(value: number) {
    const v = this.value
    if (v != null) v.length = value
  }

  _validateMin(value: string | number) {
    if (value === undefined) return
    if (value > this._max)
      throw new TypeError('the min should be less than max:' + value)
    if (typeof value === 'string')
      try {
        value = parseInt(value)
      } catch (err) {}
    if (!isInteger(value)) throw new TypeError('the min should be an integer')
    return value
  }

  _validateMax(value: string | number) {
    if (value === undefined) return
    if (value < this._min)
      throw new TypeError('the max should be greater than min:' + value)
    if (typeof value === 'string')
      try {
        value = parseInt(value)
      } catch (err) {}
    if (!isInteger(value)) throw new TypeError('the max should be an integer')
    return value
  }

  _validateOf(value: string) {
    if (value === undefined) return
    const result = Type.get(value)
    if (!result)
      throw new TypeError('the "of" option Error: No such type:' + value)
    return result
  }

  _isValid(value) {
    return isArray(value)
  }

  _validate(aValue, aOptions) {
    const TheType = this.constructor as typeof ArrayType
    aValue = TheType.toValue(aValue)
    let result = this._isValid(aValue)
    if (result) {
      const vErrors: any[] = this.errors!
      const vMin = aOptions.min
      const vMax = aOptions.max
      let vLen = aValue.length
      let vOfType = aOptions.of ? aOptions.of : undefined
      if (vOfType) vOfType = new vOfType()
      if (vMin != null) {
        result = vLen >= vMin
        if (!result)
          this.error('should be equal or greater than minimum length: ' + vMin)
      }
      if (result && vMax != null) {
        result = vLen <= vMax
        if (!result)
          this.error('should be equal or less than maximum length: ' + vMax)
      }
      if (vOfType) {
        for (let idx = 0; idx < aValue.length; idx++) {
          const item = aValue[idx]
          result = vOfType.validate(item, false)
          if (!result) {
            vLen = vOfType.errors.length
            if (vLen)
              for (let i = 0; i < vLen; i++) {
                const e = vOfType.errors[i]
                let vName = vOfType.name + `[${idx}]`
                if (!(e.name[0] === '[' || vName === e.name)) {
                  vName += '.' + e.name
                }
                vErrors.push({ name: vName, message: e.message })
                vOfType.errors = []
              }
            else {
              vErrors.push({
                name: vOfType.name + `[${idx}]`,
                message: 'is invalid',
              })
            }
          }
        }
        if (vErrors.length) result = false
      }
    }
    return result
  }

  /**
   * Sorts an array in place.
   * This method mutates the array and returns a reference to the same array.
   * @param compareFn Function used to determine the order of the elements. It is expected to return
   * a negative value if first argument is less than second argument, zero if they're equal and a positive
   * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
   * ```ts
   * [11,2,22,1].sort((a, b) => a - b)
   * ```
   */
  sort(compareFn?: (a: T, b: T) => number): ArrayType<T> {
    const v = this.value
    if (v != null) ArrayMethods.sort.call(v, compareFn)
    return this
  }
}

const vArrayMethodNames = Object.getOwnPropertyNames(ArrayMethods).filter(
  (name) =>
    [
      'constructor',
      'valueOf',
      'toJSON',
      'sort',
      'map',
      'entries',
      'keys',
      'values',
    ].indexOf(name) === -1 && typeof ArrayMethods[name] === 'function'
)
vArrayMethodNames.forEach((name) => {
  ArrayType.prototype[name] = (function (aName) {
    return function () {
      const v = this.value
      /* istanbul ignore else */
      if (v != null) {
        // const result = Array.prototype[aName].apply(v, arguments)
        return Array.prototype[aName].apply(v, arguments)
      }
    }
  })(name)
})

const vArrayIterators = ['entries', 'keys', 'values', symIterator]
vArrayIterators.forEach((name) => {
  ArrayType.prototype[name] = (function (aName) {
    return function () {
      const v = this.value
      return v != null
        ? ArrayMethods[aName].call(v)
        : {
            next() {
              return { done: true }
            },
          }
    }
  })(name)
})
// const vArrayThisReturn = ['sort']
// vArrayThisReturn.forEach((name) => {
//   ArrayType.prototype[name] = (function (aName) {
//     return function () {
//       const v = this.value
//       if (v != null) ArrayMethods[aName].apply(v, arguments)
//       return this
//     }
//   })(name)
// })

defineProperties(ArrayType, {
  min: {
    type: 'Number',
    // the internal property name for min.
    assigned: '_min',
    assign(value, dest) {
      /* istanbul ignore else */
      if (dest instanceof ArrayType) value = dest._validateMin(value)
      return value
    },
  },
  max: {
    type: 'Number',
    assigned: '_max',
    assign(value, dest) {
      /* istanbul ignore else */
      if (dest instanceof ArrayType) value = dest._validateMax(value)
      return value
    },
  },
  of: {
    type: 'string',
    assigned: '_of',
    assign(value, dest) {
      if (dest instanceof ArrayType) value = dest._validateOf(value)
      return value
    },
  },
})

register(ArrayType, { alias: 'array' })
