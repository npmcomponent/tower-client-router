var router = require('tower-router')
  , route = router.route;
  //, assert = require('assert');

describe('router', function(){
  it('should build routes', function(){
    route('/', 'index')
      .use(function(context){
        console.log('here!');
      })
      .handle = function(context) {
        console.log(context)
      }

    router.start();
  });
});