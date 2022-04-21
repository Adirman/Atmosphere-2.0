import HTMLRewriter from '../rewrite/html.js'
import CSSRewriter from '../rewrite/css.js'
import JSRewriter from '../rewrite/js.js'
import URLRewriter from '../rewrite/url.js';

import StatusCodes from './status.js';
import CookieWrap from './cookie.js';

console.log(CookieWrap('_ga_S3H5NGN10Z=GS1.1.1646872941.1.1.1646874169.0; _gcl_au=1.1.1882149607.1647485254; _ga=GA1.2.570856304.1646870085'))

var proxy = {
	config: {
		prefix: '/service/',
		encode: 'plain',
		version: '1.0.0',
    replit: false
	},
};

proxy.url = new URLRewriter(proxy);
proxy.html = new HTMLRewriter(proxy);
proxy.js = new JSRewriter(proxy);
proxy.css = new CSSRewriter(proxy);

self.addEventListener('install', event => {
	self.skipWaiting();
	console.log(`Dynamic Interception Proxy v${proxy.config.version} Installed: ${proxy.config.prefix}`);
});

self.addEventListener('activate', event => {
	event.waitUntil(clients.claim());
});

self.addEventListener('fetch', async event => {
	event.preventDefault();
	event.respondWith(fetchProxier(event.request));
});

var forbids_body = ['GET', 'HEAD'];

async function fetchProxier(request) {
  //console.log(request.destination)
	if (request.url.startsWith(location.origin+'/service/client.js')) return fetch(request)

  if (request.url.startsWith(location.origin+'/service/worker.js')) return fetch(request)

	var url;
	
	try {
		url = proxy.url.decode(request.url);
    proxy.url.proxy.URL = url
	} catch(error) {
    try {
      url = proxy.url.decode(proxy.url.encode(request.url));
      proxy.url.proxy.URL = url
    } catch(err) {
  		return new Response(`Bad URL: ${request.url}`, {
  			status: 400,
  		});
    }
	}

	request.body = await request.blob();

  var bareHeaders = {}

  for (let header of request.headers.entries()) {
    bareHeaders[header[0]] = header[1]
  }

  var forwardHeaders = ['accept-encoding', 'content-length', 'connection']

  delete bareHeaders['host'];
  delete bareHeaders['origin'];
  delete bareHeaders['referer'];
  
	var fetch_opts = {
		method: request.method,
		headers: {
			'x-bare-host': url.hostname,
			'x-bare-protocol': url.protocol,
			'x-bare-port': 443,
			'x-bare-path': url.pathname + url.search,
			// referrer: url.referrer, 
			'x-bare-headers': JSON.stringify({ host: url.host, referer: url.href,origin: url.origin, ...bareHeaders }),
			'x-bare-forward-headers': JSON.stringify(forwardHeaders),
		},
	};

	if (!forbids_body.includes(request.method)) {
		fetch_opts.body = request.body;
	}

	const bare_response = await fetch('/bare/v1/', fetch_opts);

	// bare server encountered an error
	if (!bare_response.ok) {
		return new Response(bare_response.body, {
			status: 400,
		});
	}

	var opts = {
		headers: new Headers(JSON.parse(bare_response.headers.get('x-bare-headers'))),
		status: bare_response.headers.get('x-bare-status')||400,
		statusText: bare_response.headers.get('x-bare-status-text')||'Bad Request',
	};

	[
		'content-length',
		'content-security-policy',
		'content-security-policy-report-only',
		'strict-transport-security',
		'x-frame-options',
		'x-content-type-options',
	].forEach(header => {
		opts.headers.delete(header);
	});

	if (opts.headers.get('refresh')) {
		var value = opts.headers.get('refresh')
		var done = value.split(';')[0] + ' ; ' + value.split(';')[1]
		//console.log(done)
		//opts.headers.set('refresh', )
	}

	if (opts.headers.get('location')) {
		var rewritten = opts.headers.get('location');
		rewritten = proxy.url.encode(new URL(rewritten, String(url)));
		opts.headers.set('location', rewritten);
	}

	if ((request.mode == 'navigate' && request.destination == 'document')) {
		proxy.url.proxy.URL = new URL(request.url.split('/service/')[1])
    if (bare_response.headers['replit-cluster']!==undefined) {proxy.url.proxy.config.replit = true;proxy.config.replit = true}
    
		return new Response(new Blob([proxy.html.rewrite(await bare_response.text())]), opts);
	} else if (request.destination == 'script') {
		return new Response(proxy.js.rewrite(await bare_response.text()), opts);
	} else if (request.destination == 'stylesheet' || request.destination == 'style') {
		return new Response(proxy.css.rewrite(await bare_response.text(), String(url)), opts);
	} else if (request.destination=='iframe') {
    return new Response(new Blob([proxy.html.rewrite(await bare_response.text())]), opts);
  }

  var send = bare_response.body

  if (StatusCodes.indexOf(parseInt(opts.status))>-1) send = undefined;


	return new Response(send, opts);
}