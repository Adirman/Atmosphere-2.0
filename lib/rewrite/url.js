export default class urlRewriter {
	constructor(proxy) {
		this.proxy = proxy;
	}
	encode(url) {
		url = String(url);
    if (url.match(/^(data:|#|about:|javascript:|mailto:|blob:)/g)) return url;
		url = url.replace(/^\/\//g, 'https://');
		if (url.startsWith('/service/')) return url;
		if (!url.startsWith('http')) {url = this.proxy.URL.origin+(url.startsWith('/')?url:'/'+url)};
    if (this.proxy.config.replit) url = url.replace('https://','https:/');
		return this.proxy.config.prefix + url.replace('http://','https://');
	}
	decode(url) {
		var index = url.indexOf(this.proxy.config.prefix);

		if(index == -1){
			throw new Error('bad URL');
		}

		url = url.slice(index + this.proxy.config.prefix.length)
			.replace('https://', 'https:/')
			.replace('https:/', 'https://');

		url = new URL(url);

		return url;
	}
};
