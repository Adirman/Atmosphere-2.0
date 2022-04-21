var _window = window;

export default function(window = _window) {

  var domain = Object.getOwnPropertyDescriptor(window.Document.prototype, 'domain')

  try {  
      Object.defineProperty(window.document, 'domain', {
        get() {
          return window.proxy.URL.host
        },
        set(val) {
          return window.__DIP.hostname = val
        }
      });
  } catch(e) {
    
  }
  
  window.document.write = new Proxy(window.document.write, {
    apply(t, g, a) {
      var regex = /(srcset|src|href|action|integrity|nonce|http-equiv)\s*=\s*['`"](.*?)['"`]/gi
      var text = a[0].toString()
      text = text.replace(regex, (match, p1, p2) => {
        if (p1=='integrity' || p1=='nonce' || p1=='http-equiv') return ''
        if (p1=='srcset') {
          const src_arr = [];
    
          p2.split(',').forEach(url => {
            url = url.trimStart().split(' ');
            url[0] = window.proxy.url.encode(url[0]);
            src_arr.push(url.join(' '));
          });
    
          p2 = src_arr.join(', ')
          return `${p1}="${p2}"`
        }
        return `${p1}="${window.proxy.url.encode(p2)}"`
      })

      a[0] = text

      return Reflect.apply(t, g, a)
    }
  })

  window.Element.prototype.insertAdjacentHTML = new Proxy(window.Element.prototype.insertAdjacentHTML, {
    apply(t, g, a) {
      var regex = /(srcset|src|href|action|integrity|nonce|http-equiv)\s*=\s*['`"](.*?)['"`]/gi
      var text = a[1].toString()
      text = text.replace(regex, (match, p1, p2) => {
        if (p1=='integrity' || p1=='nonce' || p1=='http-equiv') return ''
        if (p1=='srcset') {
          const src_arr = [];
    
          p2.split(',').forEach(url => {
            url = url.trimStart().split(' ');
            url[0] = window.proxy.url.encode(url[0]);
            src_arr.push(url.join(' '));
          });
    
          p2 = src_arr.join(', ')
          return `${p1}="${p2}"`
        }
        return `${p1}="${window.proxy.url.encode(p2)}"`
      })

      a[1] = text

      return Reflect.apply(t, g, a)
    }
  })

  window.Document.prototype.writeln = new Proxy(window.Document.prototype.writeln, {
    apply: (target, that, args) => {
      if (args.length) args = [ window.proxy.html.rewrite(args.join('')) ];
      return Reflect.apply(target, that, args);
    },
  });
}