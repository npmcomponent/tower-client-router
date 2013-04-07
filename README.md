# Tower Client Router

- https://github.com/visionmedia/page.js/blob/master/index.js
- https://developer.mozilla.org/en-US/docs/DOM/Manipulating_the_browser_history
- https://github.com/component/set
- https://github.com/visionmedia/node-methods
- https://github.com/component/reactive/blob/master/examples/hide.html
- https://github.com/component/reactive/blob/master/examples/form.html

## Installation

```bash
component install tower/router
```

## Example

```js
var router = require('tower-router')
  , route = router.route;

route('/posts')
  .on('enter', function(context){
    context.render('posts');
  });

router.start();
```

## TODO

```js
/**
 * Refresh the page if there is an unhandled error.
 * 
 * @see https://github.com/visionmedia/page.js/blob/master/index.js
 */

function unhandled(context) {
  if (window.location.pathname + window.location.search == context.canonicalPath) return;
  exports.stop();
  window.location = context.canonicalPath;
}
```

Move these into [parts](https://github.com/part):

```js
/**
 * Go back `i` in history.
 *
 * @api public
 */

exports.back = function(i){
  i ? window.history.go(-i) : history.back();
}

/**
 * Go forward `i` in history.
 *
 * @api public
 */

exports.forward = function(i){
  i ? window.history.go(i) : history.forward();
}

```

## License

MIT