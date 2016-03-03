isInteger       = require 'util-ex/lib/is/type/integer'
isString        = require 'util-ex/lib/is/type/string'
isArray         = require 'util-ex/lib/is/type/array'
Attributes      = require 'abstract-type/lib/attributes'
Type            = require 'abstract-type'
register        = Type.register
aliases         = Type.aliases

# Some methods extract from: https://github.com/datejs/Datejs
module.exports = class ArrayType
  register ArrayType
  aliases ArrayType, 'array'

  constructor: ->
    return super

  $attributes: Attributes
    min:
      type: 'integer'
      assigned: '_min' # the internal property name for min.
      assign: (value, dest)->
        value = dest.validateMin(value) if dest instanceof ArrayType
        value
    max:
      type: 'integer'
      assigned: '_max'
      assign: (value, dest)->
        value = dest.validateMax(value) if dest instanceof ArrayType
        value
    of:
      type: 'string'
      assigned: '_of'
      assign: (value, dest)->
        value = dest.validateOf(value) if dest instanceof ArrayType
        value

  # used by Json and assign().
  # convert a string to internal value.
  toValue: (aValue, aOptions)->
    if isString aValue
      try result = JSON.parse aValue
    else
      result = aValue
    result
  validateMin: (value)->
    throw new TypeError 'the min should be less than max:' + value if value > @_max
    try value = parseInt(value) if isString value
    throw new TypeError 'the min should be an integer' unless isInteger value
    value
  validateMax: (value)->
    throw new TypeError 'the max should be greater than min:' + value if value < @_min
    try value = parseInt(value) if isString value
    throw new TypeError 'the max should be an integer' unless isInteger value
    value
  validateOf: (value)->
    result = Type value
    throw new TypeError 'the of option Error: No such type:' + value unless result
    result
  _isValid: (value)-> isArray(value)
  _validate: (aValue, aOptions)->
    aValue = @toValue(aValue)
    result = @_isValid aValue
    if result
      if aOptions
        vMin = aOptions.min
        vMax = aOptions.max
        vLen = aValue.length
        vOfType = Type(aOptions.of) if aOptions.of
        if vMin?
          result = vLen >= vMin
          if not result
            @error 'should be equal or greater than minimum length: ' + vMin
        if result and vMax?
          result = vLen <= vMax
          if not result
            @error 'should be equal or less than maximum length: ' + vMax
        if vOfType then for item, idx in aValue
          result = vOfType.validate item, false
          unless result
            vLen = vOfType.errors.length
            if vLen
              for i in [0...vLen]
                e = vOfType.errors[i]
                vName = vOfType.name+"[#{idx}]"
                unless e.name[0] is '[' or vName is e.name
                  vName += '.' + e.name
                @errors.push name: vName, message: e.message
              vOfType.errors = []
            else
              @errors.push name: vOfType.name+"[#{idx}]", message: "is invalid"

    result

