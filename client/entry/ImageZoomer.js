// Generated by CoffeeScript 1.10.0
var DEVICE_PIXEL_RATIO, ImageZoomer, TRANSITION_DURATION, getElementPositionAndSize,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1;

getElementPositionAndSize = require('../utils/getElementPositionAndSize');

TRANSITION_DURATION = 500;

ImageZoomer = (function() {
  var activated_once, active_zoomer;

  active_zoomer = null;

  function ImageZoomer(el) {
    this.zoomOut = bind(this.zoomOut, this);
    this.zoomIn = bind(this.zoomIn, this);
    this._el = el;
    this._buildEl();
    this._bindEvents();
    this._el.dataset.is_zoomed = false;
    this._el.dataset.zoom_enabled = true;
    this._is_transitioning = false;
    this._is_zoomed = false;
    this._zoom_count = 0;
  }

  ImageZoomer.prototype._buildEl = function() {
    var zoomer, zoomer_image;
    zoomer = document.createElement('div');
    zoomer.className = 'ImageZoomer';
    zoomer_image = document.createElement('img');
    zoomer_image.className = '_Image';
    zoomer.appendChild(zoomer_image);
    this._ui = {
      image: this._el.querySelector('._Image'),
      caption: this._el.querySelector('._Caption'),
      zoomer: zoomer,
      zoomer_image: zoomer_image
    };
    this._ui.image.style.cursor = 'zoom-in';
    this._ui.zoomer.style.cursor = 'zoom-out';
    return this._ui.zoomer.dataset.is_zoomed = false;
  };

  ImageZoomer.prototype._bindEvents = function() {
    this._ui.image.addEventListener('click', this.zoomIn);
    return this._ui.zoomer.addEventListener('click', (function(_this) {
      return function() {
        return _this.zoomOut(false);
      };
    })(this));
  };

  ImageZoomer.prototype.zoomIn = function() {
    var aspect_ratio, height, left, ref, scale, top, width, window_aspect_ratio;
    if (this._is_transitioning || this._is_zoomed) {
      return;
    }
    active_zoomer = this;
    this._is_transitioning = true;
    aspect_ratio = Number(this._el.dataset.aspect_ratio);
    ref = getElementPositionAndSize(this._ui.image), left = ref.left, top = ref.top, width = ref.width, height = ref.height;
    top -= window.pageYOffset;
    left -= window.pageXOffset;
    scale = aspect_ratio < 1 ? window.innerHeight / height : window.innerWidth / width;
    this._ui.zoomer_image.style.left = left + "px";
    this._ui.zoomer_image.style.top = top + "px";
    this._ui.zoomer_image.style.position = 'absolute';
    this._ui.zoomer.style.width = window.innerWidth + "px";
    this._ui.zoomer.style.height = window.innerHeight + "px";
    this._ui.zoomer.style.left = '0px';
    this._ui.zoomer.style.top = '0px';
    this._ui.zoomer.style.position = 'fixed';
    this._ui.zoomer_image.style.transitionProperty = 'opacity, transform';
    this._ui.zoomer_image.style.transitionDuration = TRANSITION_DURATION + "ms";
    this._ui.zoomer_image.style.transform = "translate3d(0,0,0) scale3d(1,1,1)";
    this._ui.zoomer.style.transitionProperty = 'background-color';
    this._ui.zoomer.style.transitionDuration = TRANSITION_DURATION + "ms";
    this._ui.zoomer.style.backgroundColor = 'rgba(255,255,255,0.0)';
    this._ui.zoomer.dataset.is_zoomed = true;
    window_aspect_ratio = window.innerWidth / window.innerHeight;
    document.body.appendChild(this._ui.zoomer);
    this._ui.zoomer_image.style.width = width + "px";
    this._ui.zoomer_image.style.height = height + "px";
    return this._loadLargeImage(aspect_ratio, scale, (function(_this) {
      return function(selected_size) {
        var _left, _scale, _top;
        _this._zoom_count += 1;
        if (window_aspect_ratio > aspect_ratio) {
          _scale = window.innerHeight / height;
        } else {
          _scale = window.innerWidth / width;
        }
        _top = -1 * top + (window.innerHeight - height) / 2;
        _left = -1 * left + (window.innerWidth - width) / 2;
        _this._ui.zoomer_image.style.transform = "translate3d(" + _left + "px," + _top + "px,0) scale3d(" + _scale + "," + _scale + ",1)";
        _this._ui.zoomer.style.backgroundColor = 'rgba(255,255,255,0.9)';
        setTimeout(function() {
          _this._is_transitioning = false;
          return _this._is_zoomed = true;
        }, TRANSITION_DURATION);
      };
    })(this));
  };

  ImageZoomer.prototype.zoomOut = function(use_opacity) {
    if (use_opacity == null) {
      use_opacity = false;
    }
    if (this._is_transitioning || !this._is_zoomed) {
      return;
    }
    if (use_opacity) {
      this._ui.zoomer_image.style.opacity = 0;
    } else {
      this._ui.zoomer_image.style.transform = 'translate3d(0,0,0) scale3d(1,1,1)';
    }
    this._ui.zoomer.style.backgroundColor = 'rgba(255,255,255,0)';
    return setTimeout((function(_this) {
      return function() {
        _this._ui.zoomer.remove();
        active_zoomer = null;
        _this._is_zoomed = false;
        _this._ui.zoomer.dataset.is_zoomed = false;
        _this._ui.zoomer_image.style.opacity = 1;
        return _this._ui.zoomer_image.style.transform = 'translate3d(0,0,0) scale3d(1,1,1)';
      };
    })(this), TRANSITION_DURATION);
  };

  ImageZoomer.prototype._loadLargeImage = function(aspect_ratio, scale, callback) {
    var resulting_width, selected_size, src;
    if (this._ui.zoomer_image.src) {
      setTimeout((function(_this) {
        return function() {
          _this._ui.zoomer_image.style.opacity = 1;
          return callback();
        };
      })(this), 1);
      return;
    }
    this._ui.zoomer_image.style.opacity = 0;
    if (aspect_ratio < 1) {
      resulting_width = window.innerHeight * DEVICE_PIXEL_RATIO * aspect_ratio;
    } else {
      resulting_width = window.innerWidth * DEVICE_PIXEL_RATIO;
    }
    if (resulting_width > 1300) {
      src = this._el.dataset.src_2560;
      selected_size = '2560';
      console.info('ImageZoomer: selecting 2560');
    }
    if (!src && resulting_width > 700) {
      src = this._el.dataset.src_1280;
      selected_size = '1280';
      console.info('ImageZoomer: selecting 1280');
    }
    if (!src) {
      src = this._el.dataset.src_640;
      selected_size = '640';
      console.info('ImageZoomer: selecting 640');
    }
    this._ui.zoomer_image.addEventListener('load', (function(_this) {
      return function() {
        _this._ui.zoomer_image.style.opacity = 1;
        return setTimeout(function() {
          return callback(selected_size);
        }, TRANSITION_DURATION);
      };
    })(this));
    return this._ui.zoomer_image.src = src;
  };

  activated_once = false;

  ImageZoomer.activate = function() {
    var el, els, i, len, results;
    if (!activated_once) {
      activated_once = true;
      window.addEventListener('scroll', function() {
        return active_zoomer != null ? active_zoomer.zoomOut(true) : void 0;
      });
    }
    els = document.querySelectorAll('[data-zoomable="true"]');
    results = [];
    for (i = 0, len = els.length; i < len; i++) {
      el = els[i];
      if (el.dataset.zoom_enabled !== 'true') {
        results.push(new ImageZoomer(el));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  return ImageZoomer;

})();

module.exports = ImageZoomer;

require('../client_modules').register('ImageZoomer', module.exports);
