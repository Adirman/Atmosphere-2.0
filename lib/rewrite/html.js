import Node from './node.js';
import { NodeProxy } from './node.js';

import { recast, iterate } from './node.js';
import { parse, serialize, parseFragment } from 'parse5';
import walk from 'walk-parse5';

function SrcSet(set, proxy) {
    return set.split(',').map(src => {
        var split = src.trimStart().split(' ');
        if (split[0]) split[0] = proxy.url.encode(split[0]);
        return split.join(' ');
    }).join(', ');
} 

function UndoSrcSet(set, proxy) {
  
}

export default class HTMLRewriter {
	constructor(proxy) {
		this.proxy = proxy;
	}
	rewrite(src) {
    src = serialize(parse(src))
    var proxy = this.proxy
    var head_inject = `<head$1>
		<script>window.config=${JSON.stringify(proxy.config)};</script>
		<script src="/service/client.js"></script>`;
    src = src.toString()
      .replace(/<head(.*?)>/g, head_inject);
    
    var ast = parseFragment(src)

    var nodeMap = []
    
    walk(ast, node => nodeMap.push(node))

    ast = parse(src)
    
    function walkHandler(node) {
      if (!node) return node;
      if (!node.tagName) return node;
      if ((nodeMap.indexOf(node)>-1)&&node.tagName!=='meta') return node;
      //console.log(node.tagName);
      node = new Node(node, {proxy: true});
      if (node.getAttribute('src')&&node.getAttribute('src')!=="/service/client.js") node.setAttribute('src', proxy.url.encode(node.getAttribute('src')))
      if (node.getAttribute('href')) node.setAttribute('href', proxy.url.encode(node.getAttribute('href')))
      if (node.getAttribute('action')) node.setAttribute('action', proxy.url.encode(node.getAttribute('action')))
      if (node.getAttribute('http-equiv')) {console.log('equiv doing');node.removeAttribute('content');node.removeAttribute('http-equiv');}
      if (node.getAttribute('srcset')) node.setAttribute('srcset', SrcSet(node.getAttribute('srcset'), proxy));
      (Node.textContent)
      return NodeProxy(node);
    }
    
    walk(ast, walkHandler)

    src = serialize(ast)

		src = src.toString()
			.replace(/integrity/g, '_integrity')

    return src;
  }
}