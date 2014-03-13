var SimpleBinder = function(a, b, c) {
  // are we listening for something else?
  var watch = (typeof(b) === 'object') ? b.watch: 'value';
  var change = (typeof(b) === 'object') ? b.change: 'textContent';
  // last arg is callback
  var callback = (typeof(b) === 'function') ? b: c;
  var targets, inputs, il, tl, evt;
  var loadedModels = [];
  var loadedControllers = [];

  var binder = function() {
    // create items
    newController(a);
    newModel(a);
    makeInputs();
  };

  // function remove(arr, item) {
  //   var index = arr.indexOf(item);
  //   if (index > -1) {
  //     arr.splice(index, 1);
  //   }
  // }

  function rakeControllers(arr) {
    inputs = document.querySelectorAll(loadedControllers.join(','));
    il = inputs.length;
  }

  function newController(contr) {
    loadedControllers.push('[data-controller="' + contr + '"]');
    rakeControllers();
  }

  function rakeModels(arr) {
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
      evt = (inputs[i].type === 'radio' || inputs[i].type.indexOf('select') !== -1) ? 'change': 'input';
      inputs[i].addEventListener(evt, handleChange);
    }
  }

  function handleChange() {
    if (this.type !== 'checkbox') {
      for (var i = 0; i < tl; i++) {
        targets[i][change] = this[watch];
      }
      callback(this, targets[i]);
    }
  }

  // function destroyOne(ritem) {
  //   var gets = document.querySelectorAll(ritem);
  //   for (var i = 0; i < gets.length; i++) {
  //     var e = (gets[i].type === 'radio' || gets[i].type.indexOf('select') !== -1) ? 'change': 'input';
  //     gets[i].removeEventListener(e, handleChange);
  //   }
  // }

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

  // binder.prototype.removeModel = function(nmodel) {
  //   remove(loadedModels, '[data-model="' + nmodel + '"]');
  //   rakeModels();
  //   makeInputs();
  // };

  // binder.prototype.removeController = function(ncontroller) {
  //   var q = '[data-controller="' + ncontroller + '"]';
  //   destroyOne(q);
  //   remove(loadedControllers, q);
  //   rakeControllers();
  //   makeInputs();
  // };

  return new binder;
};
