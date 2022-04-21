export default class JSRewriter {
	constructor(proxy) {
		this.proxy = proxy;
	}
	rewrite(src) {
		return src
			.replace(/(,| |=|\()document.location(,| |=|\)|\.)/gi, str => {
				return str.replace('.location', `.__DIP.location`);
			})
			.replace(/(,| |=|\()window.location(,| |=|\)|\.)/gi, str => {
				return str.replace('.location', `.__DIP.location`);
			})
			.replace(/integrity/g, '_integrity');
	}
}