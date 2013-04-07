# Tower Client Router

- https://github.com/visionmedia/page.js/blob/master/index.js
- https://developer.mozilla.org/en-US/docs/DOM/Manipulating_the_browser_history
- https://github.com/component/set
- https://github.com/visionmedia/node-methods

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

## License

MIT