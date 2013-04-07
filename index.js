
/**
 * Module dependencies
 */

var route = require('tower-route')
  , Context = require('tower-context')
  , routing = require('tower-routing')
  , series = require('part-async-series');

/**
 * Expose `router`.
 */

var exports = module.exports = router;

/**
 * Expose `route`.
 */

exports.route = route;

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
 * Router as middleware.
 */

function router(context, next) {
  exports.dispatch(context, next);
}

/**
 * Expose `dispatch`.
 */

exports.dispatch = routing.dispatch;

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
  // be wary of location protocol == file:
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
  var context = new Context({
      path: path
    , state: state
  });

  if (false !== dispatch) exports.dispatch(context);
  if (!context.unhandled) context.pushState();
  return context;
};

/**
 * Replace `path` with optional `state` object.
 *
 * @param {String} path
 * @param {Object} state
 * @api public
 */

exports.replace = function(path, state, dispatch){
  var context = new Context({
      path: path
    , state: state
  });

  if (null == dispatch) dispatch = true;
  if (dispatch) exports.dispatch(context);
  context.save();
  return context;
};

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

  view(name).appendTo('body');
}

Context.prototype.save = function(){

}

Context.prototype.redirect = function(path){
  exports.replace(path);
  return this;
}

/**
 * Transition to a new route.
 *
 * This first exits out of the current route,
 * then enters into the new one.
 *
 * @param {String} name   Name of the route.
 * @api public
 */

Context.prototype.transition = function(name){
  // TODO: use the `queue` module, or somehow better configure.
  series(this, this.route.actions['exit'], this, function(){
    exports.dispatch(route(name));
  });
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