import wrapWindow from './window.js'

var allowList = ['src', 'href']

var _window = window

export function Element(win = _window) {
  
  win.Element.prototype.setAttribute = new Proxy(win.Element.prototype.setAttribute, {
    apply(target, thisArg, [ element_attribute, value ]) {
      if (element_attribute.toLowerCase()=='integrity') return thisArg.removeAttribute('integrity')
      if (!value) return Reflect.apply(target, thisArg, [element_attribute, value])

      if (element_attribute=='srcset') {
        //value = $Rhodium.RewriteSrcset(value)

        return Reflect.apply(target, thisArg, [ element_attribute, value ]);
      };

      if (['src', 'data', 'href', 'action'].indexOf(element_attribute.toLowerCase())>-1) thisArg.dataset['dip_'+element_attribute] = value

      if (['src', 'data', 'href', 'action'].indexOf(element_attribute.toLowerCase())>-1) value = win.proxy.url.encode(value);
      return Reflect.apply(target, thisArg, [ element_attribute, value ]);
    }
  })
  win.Element.prototype.getAttribute = new Proxy(win.Element.prototype.getAttribute, {
    apply(target, thisArg, [ element_attribute ]) {
      if (element_attribute.toLowerCase()=='integrity') element_attribute = '_integrity'
      var value = Reflect.apply(target, thisArg, [element_attribute]);
      var proxyValue = (thisArg.dataset['dip_'+element_attribute])
      if (proxyValue) return proxyValue;
      if (value) return value;
      if (['src', 'data', 'href', 'action'].indexOf(element_attribute.toLowerCase())>-1) return '';
      return null;
    }
  })
}

export function Definer(win = _window) {
    var config = [
        {
            "elements": [win.HTMLScriptElement, win.HTMLIFrameElement, win.HTMLEmbedElement, win.HTMLInputElement, win.HTMLTrackElement, win.HTMLMediaElement,win.HTMLSourceElement],
            "tags": ['src'],
            "action": "url"
        },
        {
            "elements": [win.HTMLSourceElement, win.HTMLImageElement],
            "tags": ['srcset'],
            "action": "srcset"
        },
        {
            "elements": [win.HTMLAnchorElement, win.HTMLLinkElement, win.HTMLAreaElement],
            "tags": ['href'],
            "action": "url"
        },
        {
            "elements": [win.HTMLIFrameElement],
            "tags": ['contentWindow'],
            "action": "window"
        },
        {
            "elements": [win.HTMLFormElement],
            "tags": ['action'],
            "action": "url"
        }, 
        {
            "elements": [win.HTMLObjectElement],
            "tags": ['data'],
            "action": "url",
        }
    ];
    config.forEach(handler => {
        var action = handler.action
        var tags = handler.tags
        var elements = handler.elements
        elements.forEach(element => {
            tags.forEach(tag => {
                if (action=='window') var windowDescriptor = Object.getOwnPropertyDescriptor(element.prototype,tag)
                try {
                    Object.defineProperty(element.prototype, tag, {
                        get() {
                            if (action=='window') {
                              try {
                                var done = windowDescriptor.get.call(this);
                                done = wrapWindow(done);
                                return done
                              } catch(e) {
                                return windowDescriptor.get.call(this)
                              }
                            }
                            return this.getAttribute(tag)
                        },
                        set(val) {
                            return this.setAttribute(tag, val)
                        }
                    })
                } catch(e) {
                }
            })
        })
    });

    try {
        Object.defineProperty(win.Element.prototype,'integrity',{
            get() {
                return this.getAttribute('_integrity')
            },
            set(val) {
                return this.setAttribute('_integrity', val)
            }
        });
    
        ['innerHTML','outerHTML'].forEach(prop => {
            var descriptor = Object.getOwnPropertyDescriptor(win.Element.prototype, prop);
            Object.defineProperty(win.Element.prototype, prop, {
                get() {
                    return descriptor.get.call(this).toString().replace(/_integrity/g, 'integrity').replace(/_location/g, 'location');
                },
                set(val) {
                    return descriptor.set.call(this, val.toString().replace(/<meta[^>]+>/g, '').replace(/integrity/g, '_integrity').replace(/location/g, '_location').replace(/rel=["']?preload["']?/g, '').replace(/rel=["']?preconnect["']?/g, ''));
                }
            });
        });
    } catch(e) {
      
    }
}