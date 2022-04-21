import { parse, generate, findAll } from 'css-tree';

export default class CSSRewriter {
	constructor(proxy) {
		this.proxy = proxy;
	}
	rewrite(src, url) {
		url = String(url).replace('/service/','');

    var ast = parse(src)
    
    var results = findAll(ast, (node, item, list) =>
        node.type === 'Url'
    );
    
    for (var result in results) {
      results[result].value = this.proxy.url.encode(results[result].value)
    }
    
    return generate(ast)
	}
}