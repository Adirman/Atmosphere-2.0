export default function(window) {
  window.__DIP.eval = new Proxy(window.eval, {
    apply(t, g, a) {
      var thisArg = a[1];
      a = a[0];
      return realEval.apply(thisArg||window, a);
    }
  });

  const realEval = Object.getOwnPropertyDescriptor(window,'eval').value

  Window.prototype.eval = (function() {
    if (this === window) return window.__DIP.eval([...arguments], this);
    else return realEval.apply(this, arguments)
  })
}