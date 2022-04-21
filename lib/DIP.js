import webpack from 'webpack';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class DIP {
	constructor(folder) {
		this.webpack = webpack({
			mode: 'development',
			devtool: 'source-map',
			entry: {
				worker: join(__dirname, 'worker', 'index.js'),
				client: join(__dirname, 'client', 'index.js'),
				page: join(__dirname, 'page', 'index.js'),
			},
			output: {
				filename: '[name].js',
				path: folder,
			},
		});
	}
	watch() {
		this.webpack.watch({}, error => {
			if (error) {
				console.error(error);
			} else {
				console.log('Bundled code');
			}
		});
	}
	bundle() {
		this.webpack.run(error => {
			if (error) {
				console.error(error);
			} else {
				console.log('Bundled code');
			}
		});
	}
};