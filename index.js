
/**
 * Module dependencies
 */

var route = require('tower-route')
  , Context = require('tower-context');

/**
 * Perform initial dispatch.
 */

var dispatch = true;

/**
 * Running flag.
 */

var running = false;

/**
 * Modern flag (for hash/history api).
 */

var modern = !!(history && history.pushState);

/**
 * Event handler for `onpopstate` or `hashchange`.
 */

var onchange;

/**
 * Event name.
 */

var event = modern ? 'onpopstate' : 'hashchange';

/**
 * Callback functions.
 */

exports.callbacks = [];

/**
 * Expose `route`.
 */

exports.route = route;

/**
 * When a route is created, add it to the router.
 */

route.on('define', function(_route){
  exports.use(function(context, next){
    _route.handle(context, next);
  });
});

/**
 * Bind `onpopstate` or `hashchange` event handler.
 *
 * @api public
 */

exports.start = function(d){
  if (running) return;
  running = true;
  dispatch = false !== d;
  window.addEventListener(event, onchange);
  exports.replace(location.pathname + location.search);
};

/**
 * Unbind `onpopstate` or `hashchange` event handler.
 *
 * @api public
 */

exports.stop = function(){
  running = false;
  window.removeEventListener(event, onchange);
};

/**
 * Show `path` with optional `state` object.
 *
 * This is the same as if the server got a request.
 *
 * @param {String} path
 * @param {Object} state
 * @param {Boolean} dispatch
 * @api public
 */

exports.show = function(path, state, dispatch){
  var ctx = new Context(path, state);
  if (false !== dispatch) exports.dispatch(ctx);
  if (!ctx.unhandled) ctx.pushState();
  return ctx;
};

exports.handle = exports.transition = exports.show;

/**
 * Replace `path` with optional `state` object.
 *
 * @param {String} path
 * @param {Object} state
 * @api public
 */

exports.replace = function(path, state, dispatch){
  var ctx = new Context(path, state);
  if (null == dispatch) dispatch = true;
  if (dispatch) exports.dispatch(ctx);
  ctx.save();
  return ctx;
};

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

/**
 * Add middleware
 *
 * @param {Function} fn
 * @api public
 */

exports.use = function(fn){
  exports.callbacks.push(fn);
}

/**
 * Dispatch the given `ctx`.
 *
 * @param {Object} ctx
 * @api private
 */

exports.dispatch = function(url){
  var i = 0;

  function next() {
    var fn = exports.callbacks[i++];
    if (!fn) return unhandled(url);
    fn(url, next);
  }

  next();
}

if (modern) { // for browsers supporting history.pushState
  Context.prototype.pushState = function(){
    history.pushState(this.state, this.title, this.canonicalPath);
  };

  Context.prototype.replaceState = function(){
    history.replaceState(this.state, this.title, this.canonicalPath);
  }
  
  onchange = function onpopstate(e){
    if (e.state) exports.replace(e.state.path, e.state);
  }
} else { // for IE7/8
  Context.prototype.replaceState = Context.prototype.pushState = function(){
    window.location.hash = '#' + this.canonicalPath;
    document.title = this.title;
  }

  onchange = function onhashchange(e){
    // e.newURL.split(hash)[1];
    exports.replace(e.oldURL.split('#')[1]);
    return false;
  };
}

/**
 * Additional initializer functionality.
 *
 * @api private
 */

Context.prototype.init = function(options){
  this.title = document.title;
  this.state = options.state || {};
}

/**
 * Render a template.
 *
 * @param {String} name
 * @param {Object} options
 * @api public
 */

Context.prototype.render = function(name, options){
  if ('object' == typeof name) options = name;
  options || (options = {});

  // https://github.com/component/reactive/blob/master/examples/hide.html
  // https://github.com/component/reactive/blob/master/examples/form.html

  view(name).appendTo('body');
}

Context.prototype.save = function(){
  
}

/**
 * Refresh the page if there is an unhandled error.
 * 
 * @see https://github.com/visionmedia/page.js/blob/master/index.js
 */

function unhandled(ctx) {
  if (window.location.pathname + window.location.search == ctx.canonicalPath) return;
  exports.stop();
  window.location = ctx.canonicalPath;
}