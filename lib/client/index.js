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

window.proxy = {}
window.proxy.config = {prefix: '/service/'}
window.proxy.URL = new URL(location.pathname.split('/service/')[1])
window.proxy.url = new Url(window.proxy)

window.__DIP = Location(window.proxy.URL)
window.document.__DIP = window.__DIP

Element()
Cookie(window)
Eval(window)
Definer()
Document()
Http(encodeProtocol, decodeProtocol, window)

window.proxy.history = new History(window.proxy);

window.proxy.html = new HTMLRewriter(window.proxy);

['pushState','replaceState'].forEach(e=>window.history[e]=new Proxy(window.history[e],window.proxy.history))