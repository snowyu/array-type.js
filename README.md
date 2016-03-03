## array-type [![npm][npm-svg]][npm]

[![Build Status][travis-svg]][travis]
[![Code Climate][codeclimate-svg]][codeclimate]
[![Test Coverage][codeclimate-test-svg]][codeclimate-test]
[![downloads][npm-download-svg]][npm]
[![license][npm-license-svg]][npm]

[npm]: https://npmjs.org/package/array-type
[npm-svg]: https://img.shields.io/npm/v/array-type.svg
[npm-download-svg]: https://img.shields.io/npm/dm/array-type.svg
[npm-license-svg]: https://img.shields.io/npm/l/array-type.svg
[travis-svg]: https://img.shields.io/travis/snowyu/array-type.js/master.svg
[travis]: http://travis-ci.org/snowyu/array-type.js
[codeclimate-svg]: https://codeclimate.com/github/snowyu/array-type.js/badges/gpa.svg
[codeclimate]: https://codeclimate.com/github/snowyu/array-type.js
[codeclimate-test-svg]: https://codeclimate.com/github/snowyu/array-type.js/badges/coverage.svg
[codeclimate-test]: https://codeclimate.com/github/snowyu/array-type.js/coverage


The array type. See the [type-info](https://github.com/snowyu/type-info.js) for type info collections.

## Usage

```js
//register the array type to the TypeInfo..
require('array-type')
var TypeInfo = require('abstract-type')
//get the array type info:
var ArrayType = TypeInfo('array')
/*
//Just load array type only:
var ArrayTypeInfo = require('array-type')
var ArrayType = ArrayTypeInfo()
 */
var LimitedArrayType = TypeInfo('array', min:1, max:3)

var arr = ArrayType.create([1,2,3])
//var arr = ArrayType.createValue([1,2,3]) //it's the same.

console.log(arr)
//<type "array": "value":[1,2,3]>
console.log(arr.isValid())
//=true
console.log(arr.toJson()))
//='[1,2,3]'
console.log(arr.toJson({withType:true})))
//='{"value":[1,2,3],"name":"array"}'
console.log(LimitedArrayType.isValid([]))
//=false
console.log(LimitedArrayType.isValid([1]))
//=true
var n = arr.clone();
n.assign('aaa')
//=TypeError: "aaa" is an invalid array
```

## API

* The ArrayType Class
  * options:
    * min: the minimum length of the array. null or undefined means unlimited.
    * max: the maximum length of the array.

See [abstract-type](https://github.com/snowyu/abstract-type.js)

## TODO

+ `of` option to limit the element's type.
  * eg, `ArrayType of: 'String'`

## License

MIT
