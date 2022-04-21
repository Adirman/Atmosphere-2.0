"use strict";
exports.id = "lib_client_protocol_js";
exports.ids = ["lib_client_protocol_js"];
exports.modules = {

/***/ "./lib/client/protocol.js":
/*!********************************!*\
  !*** ./lib/client/protocol.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodeProtocol": () => (/* binding */ decodeProtocol),
/* harmony export */   "encodeProtocol": () => (/* binding */ encodeProtocol),
/* harmony export */   "validProtocol": () => (/* binding */ validProtocol)
/* harmony export */ });
const valid_chars = "!#$%&'*+-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ^_`abcdefghijklmnopqrstuvwxyz|~";
const reserved_chars = "%";

function validProtocol(protocol){
	protocol = protocol.toString();

	for(let i = 0; i < protocol.length; i++){
		const char = protocol[i];

		if(!valid_chars.includes(char)){
			return false;
		}
	}
	
	return true;
}

function encodeProtocol(protocol){
	protocol = protocol.toString();

	let result = '';
	
	for(let i = 0; i < protocol.length; i++){
		const char = protocol[i];

		if(valid_chars.includes(char) && !reserved_chars.includes(char)){
			result += char;
		}else{
			const code = char.charCodeAt();
			result += '%' + code.toString(16).padStart(2, 0);
		}
	}

	return result;
}

function decodeProtocol(protocol){
	if(typeof protocol != 'string')throw new TypeError('protocol must be a string');

	let result = '';
	
	for(let i = 0; i < protocol.length; i++){
		const char = protocol[i];
		
		if(char == '%'){
			const code = parseInt(protocol.slice(i + 1, i + 3), 16);
			const decoded = String.fromCharCode(code);
			
			result += decoded;
			i += 2;
		}else{
			result += char;
		}
	}

	return result;
}

/***/ })

};
;
//# sourceMappingURL=lib_client_protocol_js.js.map