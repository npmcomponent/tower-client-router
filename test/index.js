var router = require('tower-router')
  , route = router.route;
  //, assert = require('assert');

describe('router', function(){
  it('should build routes', function(){
    route('/posts', 'index')
      .use(function(context){
        console.log('here!');
      })

    router.start();
  });
});