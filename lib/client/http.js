import JSRewriter from '../rewrite/js.js';

var _window = window;

export default function(encode_protocol, decode_protocol, window = _window) {
    var ProcessJS = (new JSRewriter(window.proxy)).rewrite
  
    window.WebSocket = new Proxy(window.WebSocket, {
        construct(e, [o, t]) {
            const url = new URL(o);
            const r = {
                remote: {
                    host: url.hostname,
                    port: url.port || (url.protocol === 'wss:' ? '443' : '80'),
                    path: url.pathname + url.search,
                    protocol: url.protocol
                },
                headers: {
                    Host: url.host,
                    Origin: __DIP.location.origin,
                    Pragma: "no-cache",
                    "Cache-Control": "no-cache",
                    Upgrade: "websocket",
                    Connection: "Upgrade"
                },
                forward_headers: ["accept-encoding", "accept-language", "sec-websocket-extensions", "sec-websocket-key", "sec-websocket-version"]
            };
            return Reflect.construct(e, [ location.protocol.replace('http','ws')+"//" + location.hostname + "/bare/v1/", [  'bare', encode_protocol(JSON.stringify(r)) ] ])
        }
    })

    var XHR = window.XMLHttpRequest

    window.XMLHttpRequest.prototype.open = new Proxy(window.XMLHttpRequest.prototype.open, {
        apply(t, g, a) {
            if (a[1]) a[1] = window.proxy.url.encode(a[1])
            return Reflect.apply(t, g, a)
        }
    })
    
    window.fetch = new Proxy(window.fetch, {
        apply(t, g, a) {
            if (a[0] instanceof window.Request) return Reflect.apply(t, g, a);
            if (a[0]) a[0] = window.proxy.url.encode(a[0])
            return Reflect.apply(t, g, a)
        }
    })
    
    window.Request = new Proxy(window.Request, {
        construct(t, a) {
            if (a[0]) a[0] = window.proxy.url.encode(a[0])
            return Reflect.construct(t, a)
        }
    })

    window.Worker = new Proxy(window.Worker, {
        construct: (target, args) => {
          if (args[0])  {
            args[0] = args[0].toString();
              if (args[0].trim().startsWith(`blob:${window.__DIP.location.origin}`)) {
                  const xhr = new XHR;
                  xhr.open('GET', args[0], false);
                  xhr.send();
                  const script = ProcessJS(xhr.responseText);
                  const blob = new Blob([ script ], { type: 'application/javascript' });
                  args[0] = URL.createObjectURL(blob);
              } else {
                  args[0] = window.proxy.url.encode(args[0]);
              };
            };
            return Reflect.construct(target, args);
        },
    }); 

    window.Navigator.prototype.sendBeacon = new Proxy(window.Navigator.prototype.sendBeacon, {
        apply(t, g, a) {
            if (a[0]) a[0] = window.proxy.url.encode(a[0])
            return Reflect.apply(t, g, a)
        }
    })

    window.postMessage = new Proxy(window.postMessage, {
      apply(t, g, a) {
        a[1] = '*'
        return Reflect.apply(t, g, a)
      }
    })
}