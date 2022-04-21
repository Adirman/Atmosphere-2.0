/*
//
//    WARNING:
//  
//    This is an old version of the current HTML rewriter, DO NOT IMPLEMENT IN ANY WAY
//
*/

import Node from '../rewrite/node.js';
import { NodeProxy } from '../rewrite/node.js';

import { recast, iterate } from '../rewrite/node.js';
import { parse, serialize, parseFragment } from 'parse5';
import walk from 'walk-parse5';

export default class HTMLRewriter {
	constructor(proxy) {
		this.proxy = proxy;
	}
	rewrite(src) {
    var ast = parseFragment(src)
    
    function walkHandler(node) {
      if (!node) return node;
      if (!node.tagName) return node;
      if (node.attrs.find(e => e.name=='src')) {
        node.attrs.find(e => e.name=='src').value = this.proxy.url.encode(node.attrs.find(e => e.name=='src').value)
      }
      if (node.attrs.find(e => e.name=='href')) {
        node.attrs.find(e => e.name=='href').value = this.proxy.url.encode(node.attrs.find(e => e.name=='href').value)
      }
    }
    
    ast = walk(ast, walkHandler)

    src = serialize(ast)

		var head_inject = `<head$1>
		<script>window.config=${JSON.stringify(this.proxy.config)};</script>
		<script src="/service/client.js"></script>`;

		src = src
			.replace(/integrity/g, '_integrity')
			.replace(/<head(.*?)>/g, head_inject);

    return src;
  }
}