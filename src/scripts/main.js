document.addEventListener('DOMContentLoaded', function() {
  hljs.initHighlightingOnLoad();
  var items = ['number', 'select', 'area', 'range', 'radio', 'checkbox', 'time', 'date', 'color', 'datetime', 'datetime-local', 'week', 'file', 'hidden', 'image'];
  var sb = [];
  for (var i = 0; i < items.length; i++) {
    sb[i] = SimpleBinder(items[i], function(e, t) {
      console.log(e.value);
    });
  }
  var checkbox = SimpleBinder('checked', {
    watch: 'checked' // what controller attribute are we watching?
  });
});
