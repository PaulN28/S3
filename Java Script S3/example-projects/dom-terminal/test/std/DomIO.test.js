/*
 * @author Hong-Phuc Bui
 * @filename DomIO.test.js
 * Initial Date 03.01.19
 */

import {representTopLevelObject,
		MAXIMUM_OBJECT_REPRESENT_LENGTH,
		DomTerminal } from "../../src/std/DomIO.js";
const ELEMENT_LENGTH = MAXIMUM_OBJECT_REPRESENT_LENGTH;

/** @test {representTopLevelObject} */
test ( "represent a bool", () => {
	let domFragment = representTopLevelObject(true, ELEMENT_LENGTH);
	let domString = domFragment.outerHTML;
	expect(domString).toBe('<span class="dom-output-bool">true</span>');
});

/** @test {representTopLevelObject} */
test ( "represent a number", () => {
	let domFragment = representTopLevelObject(1, 58);
	let domString = domFragment.outerHTML;
	expect(domString).toBe('<span class="dom-output-number">1</span>');
});

/** @test {representTopLevelObject} */
test ( "represent a string", () => {
	let domFragment = representTopLevelObject("string", ELEMENT_LENGTH);
	let domString = domFragment.outerHTML;
	expect(domString).toBe('<span class="dom-output-string-2">string</span>');
});

/** @test {representTopLevelObject} */
test ( "represent a symbol", () => {
	let domFragment = representTopLevelObject(Symbol("x"), ELEMENT_LENGTH);
	let domString = domFragment.outerHTML;
	expect(domString).toBe('<span class="dom-output-symbol">Symbol(x)</span>');
});

/** @test {representTopLevelObject} */
test ( "represent a null", () => {
	let domFragment = representTopLevelObject(null, ELEMENT_LENGTH);
	let domString = domFragment.outerHTML;
	expect(domString).toBe('<span class="dom-output-null">null</span>');
});

/** @test {representTopLevelObject} */
test ( "represent an undefined", () => {
	let domFragment = representTopLevelObject(undefined, ELEMENT_LENGTH);
	let domString = domFragment.outerHTML;
	expect(domString).toBe('<span class="dom-output-null">undefined</span>');
});

/** @test {representTopLevelObject} */
test( "represent an array", () =>{
	let domFragment = representTopLevelObject([false, 1.3, "text", Symbol("x")], ELEMENT_LENGTH);
	let domString = domFragment.outerHTML;
	const expected = '<span>[<span class="dom-output-bool">false</span>, <span class="dom-output-number">1.3</span>, <span class="dom-output-string">"text"</span>, <span class="dom-output-symbol">Symbol(x)</span>]</span>';
	expect(domString).toBe(expected);
});

/** @test {representTopLevelObject} */
test( "represent an object", () =>{
	let domFragment = representTopLevelObject({a: true, b: 1.3, c: "text"}, ELEMENT_LENGTH);
	let domString = domFragment.outerHTML;
	const expected = '<span>{<span class="dom-output-prop">a: </span><span class="dom-output-bool">true</span>, <span class="dom-output-prop">b: </span><span class="dom-output-number">1.3</span>, <span class="dom-output-prop">c: </span><span class="dom-output-string">"text"</span>}</span>';
	expect(domString).toBe(expected);
});

/** @test {representTopLevelObject} */
test( "represent a set", () =>{
	let domFragment = representTopLevelObject(new Set([false, 1.3, "text", Symbol("x")] ), ELEMENT_LENGTH);
	let domString = domFragment.outerHTML;
	const expected = '<span>Set(<span>[<span class="dom-output-bool">false</span>, <span class="dom-output-number">1.3</span>, <span class="dom-output-string">"text"</span>, <span class="dom-output-symbol">Symbol(x)</span>]</span>)</span>';
	expect(domString).toBe(expected);
});

/** @test {representTopLevelObject} */
test( "represent a map", () =>{
	let m = new Map( [ ['a', true], ['b', 12], ['c', 'done'] ] );
	let domFragment = representTopLevelObject(m, ELEMENT_LENGTH);
	let domString = domFragment.outerHTML;
	const expected = '<span>Map(<span>[<span>[<span class="dom-output-string">"a"</span>, <span class="dom-output-bool">true</span>]</span>, <span>[<span class="dom-output-string">"b"</span>, <span class="dom-output-number">12</span>]</span>, <span>[<span class="dom-output-string">"c"</span>, <span class="dom-output-string">"done"</span>]</span>]</span>)</span>';
	expect(domString).toBe(expected);
});

////////////////////////////////////////////////////

/** @test {DomTerminal} */
test( "print a bool", () => {
	const divId = "terminal";
	const BODY = `
		<div id="${divId}" style="height: 500px; width: 600px" />
	`;
	document.body.innerHTML = BODY;
	let terminal = new DomTerminal(divId);
	//domOutput.outputTarget = document.getElementById(divId);
	terminal.print(true);
	expect(document.querySelector(`#${divId}`).innerHTML).toContain('<span class="dom-output-bool">true</span>');
});



