var router = require('tower-router')
  , route = router.route
  , assert = require('component-assert');

describe('router', function(){
  beforeEach(router.clear);
  
  afterEach(function(){
    router.replace('/');
  });

  it('should build routes', function(){
    var calls = [];

    route('/')
      .use(function(context){
        calls.push('use');
      })
      .on('request', function(context){
        calls.push('request');
      })

    router.start();
    router.stop();

    assert('use' === calls[0]);
    assert('request' === calls[1]);
  });

  it('should transition', function(done){
    var calls = [];

    route('/users', 'users.index')
      .on('request', function(context){
        calls.push('users.request')

        setTimeout(function(){
          context.transition('posts.index');
        }, 1);
      });

    route('/posts', 'posts.index')
      .on('request', function(context){
        calls.push('posts.request');

        assert('users.request' === calls[0]);
        assert('posts.request' === calls[1]);

        done();
      });

    router.start();
    router.dispatch('/users');
    router.stop();
  });

  it('should redirect', function(done){
    var calls = [];

    route('/users')
      .on('request', function(context){
        calls.push('users.request');

        context.redirect('/posts');
      });

    route('/posts')
      .on('request', function(context){
        calls.push('posts.request');

        assert('users.request' === calls[0]);
        assert('posts.request' === calls[1]);

        done();
      });

    router.start();
    router.dispatch('/users');
    router.stop();
  });
});