angular.module 'filters'

.filter 'zipper', ->
  return (input, varName)->
    varName ||= 'payload'
    input ||= []
    # lets deal with single selection for now
    unless _.isEmpty input
      _.reduce input[0].zipper, (accum, key)->
        accum + "[#{JSON.stringify key}]"
      , varName
    else
      'Please select something'
