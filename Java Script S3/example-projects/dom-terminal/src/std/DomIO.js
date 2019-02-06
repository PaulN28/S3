/*
 * @author Hong-Phuc Bui
 * initial version 27.12.2018
 * */

/* importing a css file is a Webpack concept, not ECMAScript concept*/
import "../dfhi-exercise.css";
import "./dom-output.css";

import {sprintf} from "sprintf-js";

/** CSS-prefix Class for each type of output, adopted from CodeMirror */
export const TYPE_CLASS_PREFIX = "dom-output-";

/** Default maximum characters used to represent an object. */
export const MAXIMUM_OBJECT_REPRESENT_LENGTH = 58;

/** Class emulates a Terminal Output */
export class DomTerminal {

	/**
	 * Create an instance. For example:
	 *
	 * * Append output elements directly in the target Element
	 *
	 * ```html
	 * <div id="terminalDiv"></div>
	 * ```
	 *
	 * ```javascript
	 * let elementId = "terminalDiv";
	 * let terminal = new DomTerminal(elementId);
	 * ```
	 *
	 * * Append output elements to its cache and append cache at a later moment
	 *
	 * In HTML-file
	 *
	 * ```html
	 * <body></body>
	 * ```
	 *
	 * In JavaScript file
	 *
	 * ```javascript
	 * let terminal = new DomTerminal();
	 * terminal.print("test print something");
	 * // at a later timeline:
	 * let terminalOutput = document.body.appendChild( document.createElement("div") ) );
	 * terminalOutput.outputTarget = terminalOutput;
	 * ```
	 *
	 * @param {String} elementId=undefined An id of a Element in the DOM. If the element with the id exists, the ouput
	 * is automatically appended into it. Else the output it cached in a `pre`-Element.
	 *
	 */
	constructor(elementId=undefined) {
		if (elementId){
			this._output = document.getElementById(elementId);
			this._output.classList.add("dom-output-pre");
		}else {
			this._output = document.createElement("pre");
			this._output.className = "dom-output-pre";
		}
	}

	/**
	 * set the output target. This method is used in with a constructor without argument.
	 * See example at {@link constructor}.
	 *
	 * @param {Node} node the node in the DOM, in which the _output elements are appended.
	 * */
	set outputTarget (node) {
		node.appendChild(this._output);
	}

	/**
	 * prints each element of `argv` in the terminal output. Elements are converted to String
	 * as described in {@link representTopLevelObject}. Example:
	 *
	 * ```javascript
	 * let t = new DomTerminal(...);
	 * let a = "abc",
	 *     b = 12,
	 *     c = 1 > -1;
	 * // Print a single value
	 * t.print(a);
	 *
	 * // Print some values at once
	 * t.print(a, b, c);
	 *
	 * // Print an array
	 * let countryCode = [ "EN", "DE", "FR", "HU" ];
	 * t.print(countryCode);
	 * ```
	 *
	 * @param {...Object} argv objects to be printed.
	 * @return {undefined}
	 *
	 * */
	print(...argv) {
		let toHTML = this._html(...argv);
		this._output.appendChild(toHTML);
	}

	/**
	 * like {@link print} but a line break after the last element is printed.
	 *
	 * @param {...Object} argv objects to be printed
	 * @return {undefined}
	 * */
	printl(...argv) {
		let toHTML = this._html(...argv);
		toHTML.appendChild(document.createElement("br"));
		this._output.appendChild(toHTML);
	}

	/**
	 * Prints one or more Object with a given format.
	 * The placeholders in the format string are marked by % and are followed by one or more of these elements, in this order
	 *
	 * * An optional number followed by a `$` sign that selects which argument index to use for the value. If not specified, arguments will be placed in the same order as the placeholders in the input string.
	 * * An optional `+` sign that forces to preceed the result with a plus or minus sign on numeric values. By default, only the `-` sign is used on negative numbers.
	 * * An optional padding specifier that says what character to use for padding (if specified). Possible values are 0 or any other character precedeed by a `'` (single quote). The default is to pad with spaces.
	 * * An optional `-` sign, that causes sprintf to left-align the result of this placeholder. The default is to right-align the result.
	 * * An optional number, that says how many characters the result should have. If the value to be returned is shorter than this number, the result will be padded. When used with the `j` (JSON) type specifier, the padding length specifies the tab size used for indentation.
	 * * An optional precision modifier, consisting of a `.` (dot) followed by a number, that says how many digits should be displayed for floating point numbers. When used with the g type specifier, it specifies the number of significant digits. When used on a string, it causes the result to be truncated.
	 * * A type specifier that can be any of:
	 *
	 * 	* `%` — yields a literal % character
	 * 	* `b` — yields an integer as a binary number
	 * 	* `c` — yields an integer as the character with that ASCII value
	 * 	* `d` or `i` — yields an integer as a signed decimal number
	 * 	* `e` — yields a float using scientific notation
	 * 	* `u` — yields an integer as an unsigned decimal number
	 * 	* `f` — yields a float as is; see notes on precision above
	 * 	* `g` — yields a float as is; see notes on precision above
	 * 	* `o` — yields an integer as an octal number
	 * 	* `s` — yields a string as is
	 * 	* `t` — yields true or false
	 * 	* `T` — yields the type of the argument
	 * 	* `v` — yields the primitive value of the specified argument
	 * 	* `x` — yields an integer as a hexadecimal number (lower-case)
	 * 	* `X` — yields an integer as a hexadecimal number (upper-case)
	 * 	* `j` — yields a JavaScript object or array as a JSON encoded string
	 *
	 * More information can be found here: {@link https://www.npmjs.com/package/sprintf-js}
	 *
	 * **Example:**
	 *
	 * ```javascript
	 * let t = new DomTerminal(...);
	 * let v = [12.5, 3.42, 6.789, 8.8];
	 * // print each element in a line
	 * v.forEach( e => {
	 *     t.printf( "%7.3f", e );
	 *     t.printl();
	 * });
	 *
	 * // print all element at once, each in maximum 7 characters
	 * t.printf("%7.3f %7.3f %7.3f %7.3f ", ...v);
	 * ```
	 *
	 *
	 * @param {String} format S. {@link https://www.npmjs.com/package/sprintf-js}
	 * @param {...Object} argv Objects to be shown.
	 *
	 * @return {undefined}
	 *
	 * */
	printf(format, ...argv) {
		let html = span("string-2", sprintf(format, ...argv) );
		this._output.appendChild(html);
	}

	/**
	 * convert each element of `argv` to HTML Document Fragment. This method should not be called from Clients of this class.
	 *
	 * @param {...Object} argv an array of objects
	 *
	 * @return {DocumentFragment}
	 * */
	_html(...argv) {
		let html = document.createDocumentFragment();
		const lastIndex = argv.length - 1;
		argv
			.map(a => representTopLevelObject(a))
			.forEach((represent, index) => {
				html.appendChild( represent );
				if (index < lastIndex) {
					html.appendChild(document.createTextNode(" "));
				}
			});
		return html
	}


	/**
	 * clear all output object.
	 *
	 * @return {undefined}
	 * */
	clear() {
		while(this._output.lastChild) {
			this._output.removeChild(this._output.lastChild)
		}
	}
}

/**
 * represents an object as a top-level-object. This function does not add quote-characters to an object of type String,
 * for other objects, it does the same as {@link represent}.
 *
 * @param {Object} arg object to be represented as HTML-Node.
 * @param {Number} maximumLength=MAXIMUM_OBJECT_REPRESENT_LENGTH maximum character which can be used to represent
 * 					a non primitive Object or Array
 *
 * @return {Node} a HTML Element of type 'span', which can be appended into a HTML Node
 *
 *
 * */
export function representTopLevelObject(arg, maximumLength=MAXIMUM_OBJECT_REPRESENT_LENGTH) {
	if  (typeof arg === "string") {
		return span("string-2",arg);
	}
	else {
		return represent(arg, maximumLength);
	}
}

/**
 * creates a HTML `<span>`-element from a text like:
 *
 * ```html
 * <span class="dom-output-${type}">${text}</span>
 * ```
 * @param {String} type the type of text. Types are defined in dom-_output.css, for example number, string, string-2
 * @param {String} text the String to be shown.
 * @return {Element} the `span` Element.
 *
* */
export function span(type, text) {
	let sp = document.createElement("span");
	sp.className = TYPE_CLASS_PREFIX + type;
	sp.appendChild(document.createTextNode(text));
	return sp;
}

function eltSize(elt) {
	return elt.textContent.length
}

function represent(val, maximumSize) {
	if (typeof val === "boolean") return span("bool", String(val));
	if (typeof val === "number") return span("number", String(val));
	if (typeof val === "string") return span("string", JSON.stringify(val));
	if (typeof val === "symbol") return span("symbol", String(val));
	if (val == null) return span("null", String(val));
	if (Array.isArray(val)) return representArray(val, maximumSize);
	else return representObj(val, maximumSize)
}

function representArray(val, maximumSize) {
	return representIterable(val, maximumSize);
}

function representObj(val, maximumSize) {
	if (val instanceof Set) {
		return representSet(val, maximumSize);
	}
	if (val instanceof Map) {
		return representMap(val, maximumSize);
	}
	let string = typeof val.toString == "function" && val.toString();
	if (!string || /^\[object .*\]$/.test(string)) {
		return representSimpleObj(val, maximumSize);
	}
	let m = string.match(/^\s*(function[^(]*\([^)]*\))/) ;
	if (val.call && m ) {
		return span("function", m[1] + "{…}");
	}

	let elt = span("etc", string);
	elt.addEventListener("click", () => expandObj(elt, "obj", val));
	return elt
}

function representSet(val, maximumSize) {
	let wrap = document.createElement("span");
	wrap.appendChild(document.createTextNode("Set("));
	wrap.appendChild( representIterable([...val], maximumSize) );
	wrap.appendChild(document.createTextNode(")"));
	return wrap;
}

function representMap(val, maximumSize) {
	let wrap = document.createElement("span");
	wrap.appendChild(document.createTextNode("Map("));
	wrap.appendChild( representIterable([...val], maximumSize, '[', ']') );
	wrap.appendChild(document.createTextNode(")"));
	return wrap;
}

function representIterable(val, maximumSize, beginDelimiter='[', endDelimiter=']' ) {
	maximumSize -= 2;
	let wrap = document.createElement("span");
	wrap.appendChild(document.createTextNode( beginDelimiter ));
	for (let i = 0; i < val.length; ++i) {
		if (i) {
			wrap.appendChild(document.createTextNode(", "));
			maximumSize -= 2
		}
		let next = maximumSize > 0 && represent(val[i], maximumSize);
		let nextSize = next ? eltSize(next) : 0;
		if (maximumSize - nextSize <= 0) {
			wrap.appendChild(span("etc", "…")).addEventListener("click", () => expandObj(wrap, "array", val));
			break
		}
		maximumSize -= nextSize;
		wrap.appendChild(next)
	}
	wrap.appendChild(document.createTextNode(endDelimiter ));
	return wrap
}


function constructorName(obj) {
	if (!obj.constructor) return null;
	let m = String(obj.constructor).match(/^function\s*([^\s(]+)/);
	if (m && m[1] !== "Object") return m[1];
}

function hop(obj, prop) {
	return Object.prototype.hasOwnProperty.call(obj, prop)
}

function representSimpleObj(val, space) {
	space -= 2;
	let wrap = document.createElement("span");
	let name = constructorName(val);
	if (name) {
		space -= name.length;
		wrap.appendChild(document.createTextNode(name))
	}
	wrap.appendChild(document.createTextNode("{"));
	try {
		let first = true;
		for (let prop in val) if (hop(val, prop)) {
			if (first) {
				first = false
			} else {
				space -= 2;
				wrap.appendChild(document.createTextNode(", "))
			}
			let next = space > 0 && represent(val[prop], space);
			let nextSize = next ? prop.length + 2 + eltSize(next) : 0;
			if (space - nextSize <= 0) {
				wrap.appendChild(span("etc", "…")).addEventListener("click", () => expandObj(wrap, "obj", val));
				break
			}
			space -= nextSize;
			wrap.appendChild(span("prop", prop + ": "));
			wrap.appendChild(next)
		}
	} catch (e) {
		wrap.appendChild(document.createTextNode("…"))
	}
	wrap.appendChild(document.createTextNode("}"));
	return wrap
}

function expandObj(node, type, val) {
	let wrap = document.createElement("span");
	let opening = type === "array" ? "[" : "{", cname;
	if (opening === "{" && (cname = constructorName(val))) opening = cname + " {";
	wrap.appendChild(document.createTextNode(opening));
	let block = wrap.appendChild(document.createElement("div"));
	block.className = "sandbox-_output-etc-block";
	let table = block.appendChild(document.createElement("table"));

	function addProp(name) {
		let row = table.appendChild(document.createElement("tr"));
		row.appendChild(document.createElement("td")).appendChild(span("prop", name + ":"));
		row.appendChild(document.createElement("td")).appendChild(represent(val[name], 40));
	}

	if (type === "array") {
		for (let i = 0; i < val.length; ++i) addProp(i)
	} else {
		for (let prop in val) {
			if (hop(val, prop)) {
				addProp(prop);
			}
		}
	}
	wrap.appendChild(document.createTextNode(type === "array" ? "]" : "}"));
	node.parentNode.replaceChild(wrap, node)
}