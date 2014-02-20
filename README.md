*This repository is a mirror of the [component](http://component.io) module [tower/client-router](http://github.com/tower/client-router). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/tower-client-router`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*
# Tower Client Router

## Installation

```bash
$ component install tower/client-router
```

## Example

```js
var router = require('tower-router')
var route = router.route;

route('/posts', function(context){
  alert('!');
});

router.start();
```

## License

MIT