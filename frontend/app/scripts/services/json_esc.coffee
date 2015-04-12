angular.module 'services'

.factory 'jsonEsc', ->
  return (input)->
    _.escape JSON.stringify input
