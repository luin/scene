(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'));
  } else {
    root.Scene = factory(root.jQuery);
  }
}(this, function ($) {
  var Scene;

  Scene = function(name, start, end) {
    Scene.SCENES[name] = {
      start: start,
      end: end || function () {}
    };
  };

  Scene.$ = function (name) {
    return $('.section.' + name);
  };

  Scene.SCENES = {};
  Scene.SCENES_CACHE = {};

  Scene.current = null;

  Scene.go = function(name, arg1, arg2, arg3) {
    if (Scene.current) {
      var $current = Scene.$(Scene.current);
      Scene.SCENES[Scene.current].end.call($current.replaceWith(Scene.SCENES_CACHE[Scene.current]));
    }
    Scene.current = name;
    var $new = Scene.$(name);
    Scene.SCENES_CACHE[name] = $new.prop('outerHTML');
    Scene.SCENES[name].start.call($new.addClass('active'), arg1, arg2, arg3);
    setTimeout(function() {
      $new.addClass('animation');
    }, 0);
  };

  $.fn.pop = function (name) {
    var result = this.data(name);
    this.removeData(name);
    return result;
  };

  $.fn.interval = function (body, duration) {
    var intervals = this.data('_intervals');
    if (!intervals) {
      intervals = [];
      this.data('_intervals', intervals);
    }
    var interval = setInterval(body.bind(this), duration);
    intervals.push(interval);
    return interval;
  };

  $.fn.timeout = function (body, duration) {
    var timeouts = this.data('_timeouts');
    if (!timeouts) {
      timeouts = [];
      this.data('_timeouts', timeouts);
    }
    var timeout = setTimeout(body.bind(this), duration);
    timeouts.push(timeout);
    return timeout;
  };

  $.fn.clear = function () {
    var i;
    // clear intervals
    var intervals = this.pop('_intervals');
    if (intervals) {
      for (i = 0; i < intervals.length; ++i) {
        clearInterval(intervals[i]);
      }
    }
    // clear timeouts
    var timeouts = this.pop('_timeouts');
    if (timeouts) {
      for (i = 0; i < timeouts.length; ++i) {
        clearTimeout(timeouts[i]);
      }
    }
    // clear bindings
    this.off();
    this.children().off();
    this.children().removeAttr('style').removeClass('is-active');
    return this;
  };

  return Scene;
}));
