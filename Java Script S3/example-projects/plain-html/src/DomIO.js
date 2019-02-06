/**
 * @author Hong-Phuc Bui
 * initial version 27.12.2018
 * */
const TYPE_CLASS_PREFIX = "dom-output-";
const MAXIMUM_OBJECT_REPRESENT_LENGTH = 58;


class DomOutput {

	/**
	 * @constructor
	 *
	 * @param {string} outputElementId the element ID of an element in DOM, in which
	 * output objects are in written
	 */
	constructor(outputElementId) {
		this.output = document.getElementById(outputElementId);
		this.style = "";
	}

	/**
	 * set style output, default is an empty string.
	 * @param {string} cssStyle a String represents a syntactical valid CSS-Style, for example
	 * `color: red; font-size:12px`
	 * */
	set style(cssStyle) {
		this._style = cssStyle;
	}

	get style() {
		return this._style;
	}

	/**
	 * print each element of argv in an <code> Tag. Elements are converted to String
	 * by its natural String representation.
	 *
	 * @param {...Object} argv objects to be printed
	 *
	 * */
	print(...argv) {
		let toHTML = this._html(...argv);
		this.output.appendChild(toHTML);
	}

	/**
	 * like {@link print} but with an line break after the last element is printed.
	 * @param {...Object} argv objects to be printed
	 * */
	printl(...argv) {
		let toHTML = this._html(...argv);
		toHTML.appendChild(document.createElement("br"));
		this.output.appendChild(toHTML);
	}

	/**
	 * convert each element of argv to HTML String
	 *
	 * @return {DocumentFragment}
	 * */
	_html(...argv) {
		let html = document.createDocumentFragment();
		argv
			.map(a => representTopLevelObject(a))
			.forEach(represent => {
				html.appendChild( represent );
			});
		return html;
	}


	/**
	 * clear all output
	 * */
	clear() {
		this.output.innerText = "";
	}
}


function representTopLevelObject(arg) {
	if  (typeof arg === "string") {
		return span("string",arg);
	}
	else {
		return represent(arg, MAXIMUM_OBJECT_REPRESENT_LENGTH);
	}
}

function span(type, text) {
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
	block.className = "sandbox-output-etc-block";
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
