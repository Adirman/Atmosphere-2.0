import http from 'http';
import BareServer from 'bare-server-node';
import nodeStatic from 'node-static';
import DIP from './lib/DIP.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var a = new DIP(join(__dirname, 'public', 'service'));

a.watch();

const bare = new BareServer('/bare/');
const serve = new nodeStatic.Server(join(__dirname, 'public'));

const server = http.createServer();

server.on('request', (request, response) => {
	request.url = request.url.replace('https://', 'https:/').replace('https:/', 'https://');

	console.log(request.url);

	if (bare.route_request(request, response)) return true;

	if (request.url.startsWith('/service/http')) {
		response.end(`<script>
if ('serviceWorker' in navigator) {
var worker = navigator.serviceWorker.register('/service/worker.js', {
scope: '/service/',
config: {},
updateViaCache: 'none',
}).then(() => {
location.reload();
});
}
</script>`);
	} else {
		serve.serve(request, response);
	}
});

server.on('upgrade', (req, socket, head) => {
	if (bare.route_upgrade(req, socket, head)) return;
	socket.end();
});

server.listen(process.env.PORT || 80);