import HTMLRewriter from '../rewrite/html.js';
import CSSRewriter from '../rewrite/css.js';
import JSRewriter from '../rewrite/js.js';
import History from './history.js';
import Location from './location.js';
import Http from './http.js';
import { Element, Definer } from './element.js';
import Url from '../rewrite/url.js';
import Cookie from './cookie.js';
import Eval from './eval.js';
import Document from './document.js';
import { encodeProtocol, decodeProtocol } from './protocol.js'

export default function(win) {
  
  win.proxy = {}
  win.proxy.config = {prefix: '/service/'}
  try {
    win.proxy.URL = new URL(win.location.pathname.split('/service/')[1])
  } catch(e) {
    win.proxy.URL = new URL(window.location.pathname.split('/service/')[1])
  }
  win.proxy.url = new Url(win.proxy)

  var history = new History(win.proxy);
  
  win.__DIP = Location(win.proxy.URL, win)
  win.document.__DIP = win.__DIP
  
  Element(win)
  Cookie(win)
  Eval(win)
  Definer(win)
  Document(win)
  Http(encodeProtocol, decodeProtocol, win)
  
  win.proxy.history = new History(win.proxy);

  win.proxy.html = new HTMLRewriter(win.proxy);
  
  ['pushState','replaceState'].map(e=>win.history[e]=new Proxy(win.history[e],win.proxy.history))

  return win
}