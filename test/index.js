var router = require('tower-router')
  , route = router.route;
  //, assert = require('assert');

describe('router', function(){
  it('should build routes', function(){
    var calls = 0;

    route('/', 'index')
      .use(function(context){
        ++calls;
      });

    router.start();
    console.log(calls);
    //assert(1 == calls);
  });
});