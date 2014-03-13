document.addEventListener('DOMContentLoaded', function() {
  hljs.initHighlightingOnLoad();
  var items = ['number', 'select', 'area', 'range', 'radio', 'checkbox', 'time', 'date', 'color', 'datetime', 'datetime-local', 'week', 'file', 'hidden', 'image'];
  for(var item in items) {
    var sb = SimpleBinder(items[item], function(e, t) {
      console.log(e.value);
    });
  }
});
