var router = require('tower-router')
  , route = router.route;
//  , assert = require('component-assert');

describe('router', function(){
  beforeEach(router.clear);

  it('should build routes', function(){
    var calls = [];

    route('/')
      .use(function(context){
        calls.push('use');
        // context.redirect('/posts');
      })
      .on('request', function(context){
        calls.push('request');
      })

    router.start();
    router.stop();

    // assert('use' === calls[0]);
    // assert('request' === calls[1]);

    console.log(calls);
    //router.show('/posts');
    //router.show('/comments');
    //assert(1 == calls);
  });

  it('should redirect', function(){
    var calls = [];

    route('/users')
      .on('request', function(context){
        calls.push('users.request');

        context.redirect('/posts');
      });

    route('/posts')
      .on('request', function(context){
        calls.push('posts.request');
      });

    router.start();
    router.dispatch('/users');
    router.stop();

    console.log(calls);
  });
});