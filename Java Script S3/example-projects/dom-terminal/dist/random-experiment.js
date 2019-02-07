/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/random-experiment/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/random-experiment/index.js":
/*!****************************************!*\
  !*** ./src/random-experiment/index.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _random_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../random_lib */ \"./src/random_lib.js\");\n\n\n\nfunction array2Table(resultArray){\n    let table = \"<table>\";\n    let indexLine = \"<tr>\",\n        valueLine = \"<tr>\";\n\n    for(let i = 0; i < resultArray.length; ++i){\n        indexLine += `<td>${i}</td>`;\n        valueLine += `<td>${resultArray[i]}</td>`;\n    }\n\n    indexLine += \"</tr>\";\n    valueLine += \"</tr>\";\n    table += indexLine + valueLine + \"</table>\";\n    let tableDom = document.createDocumentFragment();\n    tableDom.appendChild(document.createElement(\"div\"));\n    tableDom.querySelector(\"div\").innerHTML = table;\n    document.body.appendChild(tableDom);\n}\n\ndocument.addEventListener(\"DOMContentLoaded\", function(event){\n    let element = 12;\n    let experiment = 300;\n\n    let experimentResult = Object(_random_lib__WEBPACK_IMPORTED_MODULE_0__[\"doExperiment\"])(element, experiment)\n    array2Table(experimentResult)\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcmFuZG9tLWV4cGVyaW1lbnQvaW5kZXguanM/NDBlNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQTJDOzs7QUFHM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLHdCQUF3QjtBQUMxQyw0QkFBNEIsRUFBRTtBQUM5Qiw0QkFBNEIsZUFBZTtBQUMzQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsZ0VBQVk7QUFDdkM7QUFDQSxDQUFDIiwiZmlsZSI6Ii4vc3JjL3JhbmRvbS1leHBlcmltZW50L2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtkb0V4cGVyaW1lbnR9IGZyb20gXCIuLi9yYW5kb21fbGliXCI7XG5cblxuZnVuY3Rpb24gYXJyYXkyVGFibGUocmVzdWx0QXJyYXkpe1xuICAgIGxldCB0YWJsZSA9IFwiPHRhYmxlPlwiO1xuICAgIGxldCBpbmRleExpbmUgPSBcIjx0cj5cIixcbiAgICAgICAgdmFsdWVMaW5lID0gXCI8dHI+XCI7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgcmVzdWx0QXJyYXkubGVuZ3RoOyArK2kpe1xuICAgICAgICBpbmRleExpbmUgKz0gYDx0ZD4ke2l9PC90ZD5gO1xuICAgICAgICB2YWx1ZUxpbmUgKz0gYDx0ZD4ke3Jlc3VsdEFycmF5W2ldfTwvdGQ+YDtcbiAgICB9XG5cbiAgICBpbmRleExpbmUgKz0gXCI8L3RyPlwiO1xuICAgIHZhbHVlTGluZSArPSBcIjwvdHI+XCI7XG4gICAgdGFibGUgKz0gaW5kZXhMaW5lICsgdmFsdWVMaW5lICsgXCI8L3RhYmxlPlwiO1xuICAgIGxldCB0YWJsZURvbSA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICB0YWJsZURvbS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICB0YWJsZURvbS5xdWVyeVNlbGVjdG9yKFwiZGl2XCIpLmlubmVySFRNTCA9IHRhYmxlO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGFibGVEb20pO1xufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbihldmVudCl7XG4gICAgbGV0IGVsZW1lbnQgPSAxMjtcbiAgICBsZXQgZXhwZXJpbWVudCA9IDMwMDtcblxuICAgIGxldCBleHBlcmltZW50UmVzdWx0ID0gZG9FeHBlcmltZW50KGVsZW1lbnQsIGV4cGVyaW1lbnQpXG4gICAgYXJyYXkyVGFibGUoZXhwZXJpbWVudFJlc3VsdClcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/random-experiment/index.js\n");

/***/ }),

/***/ "./src/random_lib.js":
/*!***************************!*\
  !*** ./src/random_lib.js ***!
  \***************************/
/*! exports provided: doExperiment, integerRandom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"doExperiment\", function() { return doExperiment; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"integerRandom\", function() { return integerRandom; });\nfunction doExperiment(n, experiment) {\n    let zahlen = (new Array(n)).fill(0);\n    for (let e = 0; e < experiment; ++e) {\n        let r = integerRandom(0, n);\n        zahlen[r] += 1;\n    }\n    return zahlen;\n}\n\nfunction integerRandom (from, to) {\n    return Math.trunc(Math.random()*(to-from) )+ from;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcmFuZG9tX2xpYi5qcz82YzIyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFPO0FBQ1A7QUFDQSxtQkFBbUIsZ0JBQWdCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBIiwiZmlsZSI6Ii4vc3JjL3JhbmRvbV9saWIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZG9FeHBlcmltZW50KG4sIGV4cGVyaW1lbnQpIHtcbiAgICBsZXQgemFobGVuID0gKG5ldyBBcnJheShuKSkuZmlsbCgwKTtcbiAgICBmb3IgKGxldCBlID0gMDsgZSA8IGV4cGVyaW1lbnQ7ICsrZSkge1xuICAgICAgICBsZXQgciA9IGludGVnZXJSYW5kb20oMCwgbik7XG4gICAgICAgIHphaGxlbltyXSArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gemFobGVuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW50ZWdlclJhbmRvbSAoZnJvbSwgdG8pIHtcbiAgICByZXR1cm4gTWF0aC50cnVuYyhNYXRoLnJhbmRvbSgpKih0by1mcm9tKSApKyBmcm9tO1xufSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/random_lib.js\n");

/***/ })

/******/ });