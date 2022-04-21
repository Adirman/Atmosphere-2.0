const config = {
	prefix: '/service/',
	encode: 'plain',
	version: '1.0.0'
};

document.querySelector('form').addEventListener('submit', (e) => {
	e.preventDefault();

	var val = document.querySelector('input').value;
	if (!val.startsWith('http')) val = 'https://' + val;
	// 404 page will setup serviceworker
	location.replace(config.prefix + val);
});