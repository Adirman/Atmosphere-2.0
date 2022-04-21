/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./lib/page/index.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
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
/******/ })()
;
//# sourceMappingURL=page.js.map