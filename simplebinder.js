(function () {
  window.SimpleBinder = function(collection, b, c) {
    // wrap `collection` in array
    if (typeof(collection) === 'string') {
      collection = [collection];
    }
    Array.prototype.slice.call(collection, 0).forEach(function(a) {
      // are we listening for something else?
      var watch = (typeof(b) === 'object' && b.watch) ? b.watch: 'value',
      change = (typeof(b) === 'object' && b.change) ? b.change: 'textContent',
      defaultValue = (typeof(b) === 'object' && b.defaultValue) ? b.defaultValue: false,
      // last arg is callback
      callback = (typeof(b) === 'function') ? b: c,
      targets, inputs, il, tl, evt, loadedModels = [], loadedControllers = [];

      var binder = function() {
        // create items
        if (typeof(a) === 'string') {
          newController(a);
          newModel(a);
        } else {
          newController(a.dataset.controller);
          newModel(a.dataset.controller);
        }
        makeInputs();
      };

      function rakeControllers() {
        inputs = document.querySelectorAll(loadedControllers.join(','));
        il = inputs.length;
      }

      function newController(contr) {
        loadedControllers.push('[data-controller="' + contr + '"]');
        rakeControllers();
      }

      function rakeModels() {
        targets = document.querySelectorAll(loadedModels.join(','));
        tl = targets.length;
      }

      function newModel(modl) {
        loadedModels.push('[data-model="' + modl + '"]');
        rakeModels();
      }

      function makeInputs() {
        for (var i = 0; i < il; i++) {
          // special inputs
          evt = (inputs[i].type === 'radio' || inputs[i].type === 'checkbox' || inputs[i].type.indexOf('select') !== -1) ? 'change': 'input';
          inputs[i].addEventListener(evt, handleChange);
        }
      }

      function handleChange() {
        for (var i = 0; i < tl; i++) {
          var value = this[watch].toString().trim();
          if (value.length === 0 && typeof(targets[i].dataset.default) !== 'undefined') {
            targets[i][change] = targets[i].dataset.default;
          } else if (!defaultValue) {
            targets[i][change] = value;
          } else {
            if (value.length > 0) {
              targets[i][change] = value;
            } else {
              targets[i][change] = defaultValue;
            }
          }
        }
        if (callback && typeof(callback) === 'function') {
          callback(this, targets[i]);
        }
      }

      binder.prototype.controllers = loadedControllers;

      binder.prototype.models = loadedModels;

      binder.prototype.destroy = function() {
        for (var i = 0; i < il; i++) {
          inputs[i].removeEventListener(evt, handleChange);
        }
      };

      binder.prototype.addModel = function(nmodel) {
        newModel(nmodel);
        makeInputs();
      };

      binder.prototype.addController = function(ncontroller) {
        newController(ncontroller);
        makeInputs();
      };

      return new binder;
    });
  };
})();