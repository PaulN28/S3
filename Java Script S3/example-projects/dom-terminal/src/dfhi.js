/*
 * @author Hong-Phuc Bui
 * initial version 27.12.2018
 *
 * At a glance, this file provides a mini platform to test javascript code as a style of traditional
 * terminal based program. It creates an input field for argument vectors, a div
 * for standard _output (terminal), and an Object Terminal for printing something to the standard _output div.
 *
 * This file can be linked into an HTML File with the tag <script>. To use
 * this file, one must provide a javascript function with following signature:
 *
 * ```javascript
 * function main(... argv)
 * {
 *   // .... code here
 * }
 * ```
 *
 * and assigns it to `window.main`, for example
 *
 * ```javascript
 * window.main = main;
 * ```
 *
 * This function is called when the `run` button is click. Value in input field is split in an array of string
 * and passed to main.
 *
 *
 * */

import "./dfhi-exercise.css";
import "./jsxgraph/0.99.7/jsxgraph.css";

import {DomTerminal} from "./std/DomIO";
import JXG from "jsxgraph";  // Instead of including JSXGraph global once can use import here!

/**
 * This instance is ready configured to use directly. Once can `import` it into the main JavaScript file and call `{@link #print(...argv)}`
 * to print something to Terminal.
 *
 * Some usage example:
 *
 *	+ Print simple objects:
 *
 * ```javascript
 * let b = true, i = 1, s = "text";
 * Terminal.printl( b );
 * Terminal.printl( i );
 * Terminal.printl( s );
 * //Print all at once
 * Terminal.print(b, i, s);
 * ```
 *
 *  + Print an array
 *
 * ```javascript
 * let a = [5, 4, 3, 2, 1];
 * //Print a as its natural toString()
 * Terminal.print( a );
 *
 * //Print a as a string, each element is separated by a comma
 * Terminal.print( a.join(",") );
 *
 * //Print each element of a, each per line
 * a.forEach( (element, index) => Terminal.printl( `${index} -> ${element}` ) );
 * ```
 * */
const Terminal = new DomTerminal();

/**
 *
 * A lazy instantiated of type `JSX.Board`.
 *
 * The board has a display size 512 by 512 pixel. It is defined in CSS-Style. By default the board is bounded
 * by a bounding box of `[-5.5, 5.5]` (Left-Top) to `[5.5, -5.5]` (Right-Bottom). This Bounding Box can be changed by `Board.setBoundingBox()`.
 *
 * **Origin document:**
 *
 * * More infos here: {@link https://jsxgraph.uni-bayreuth.de/docs/}
 * * Options to plot cann be found here: {@link https://jsxgraph.uni-bayreuth.de/docs/symbols/src/src_options.js.html}
 *
 * **Some Examples:**
 *
 * * Set bounding box (left-top to right-bottom)
 *
 * ```javascript
 * Board.setBoundingBox([-3, 5, 3, -5]); // left-top -> (-3,5)  right-bottom (3,-5)
 * ```
 *
 * * Shown (1-by-1) grid, useful for debug
 *
 * ```javascript
 * Board.addGrid();
 * ```
 *
 * * Plot a Point
 *
 * ```javascript
 * Board.create('point', [3.5, 2.0], {
 * 	    fixed: true,        // fixed or draggable
 * 	    size: 3,            // size of point
 * 	    sizeUnit: 'screen'  // possible value: 'screen', 'user'
 * 		withLabel: true     // show point with/without label
 * })
 * ```
 *
 *
 * * Plot a segment:
 *
 * ```javascript
 * let beginPoint = [0, 0],
 *     endPoint = [5, 5];
 * Board.create ('segment', [beginPoint, endPoint], {
 *     straightFirst: false,
 *     straightLast: false,
 *     strokeWidth: 1
 * });
 * ```
 *
 * * Remove all Objects of boards:
 *
 * ```javascript
 * while ( Board.objectsList.length > 0 ) {
 *     Board.removeObject( Board.objectsList[0] );
 * }
 * ```
 *
 *
 * */
let Board = null;

/* only initialize page after DOM is completely loaded. */
document.addEventListener("DOMContentLoaded", function(event) {

	/** "private" variable, only for this file */
	const OUTPUT_ID = 'text-_output';
	const JSXBOX_ID = 'jxgbox';
	const DEFAULT_BOX_SIZE = 512;

	/** "private" variable, only for this file */
	const BODY = `
    <code>main</code>'s arguments: <input type="text" id="argv" name="argv" />
    <button name="run" id="run" >Run</button>
    <button name="clear" id="clear">Clear Terminal</button>
    
    <div class="console-output" id="${OUTPUT_ID}"></div>
    <div id="${JSXBOX_ID}" class="jxgbox" style="width:${DEFAULT_BOX_SIZE}px; height:${DEFAULT_BOX_SIZE}px">
  `;

	document.getElementsByTagName("body")[0].innerHTML = BODY;

	//Set Output Terminal
	Terminal.outputTarget = document.getElementById(OUTPUT_ID);

	//Student can the test the code in main() by giving something in
	// #argv (optional) and click #run
	document.getElementById("run").addEventListener("click", function (event) {
		let main = window.main;
		if (main && (typeof main === "function") ) {
			let textArgument = document.getElementById("argv").value.trim();
			if ( textArgument.length > 0 ){
				main( ...textArgument.split(/\s+/) );
			}else {
				main()
			}
		}
	});
	document.getElementById("clear").addEventListener("click", function(event) {
		Terminal.clear();
	});
	
	// Create JSX Board
	Board = JXG.JSXGraph.initBoard(JSXBOX_ID, {
		boundingbox: [-5.5, 5.5, 5.5, -5.5],
		axis:false,
		keepaspectratio:true
	});

});


export {Terminal, Board};