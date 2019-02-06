/*
 * @author Hong-Phuc Bui
 * initial version 27.12.2018
 *
 * At a glance, this file provides a mini platform to test javascript code as a style of traditional
 * console based programming language. It creates an input field for argument vectors, a div
 * for standard output, and an Object DomOut for printing something to the standard output div.
 *
 * This file can be linked into an HTML File with the tag <script>. To use
 * this file, one must provide a javascript function with signature
 *
 * <pre>
 * function main(... argv)
 * {
 *   // .... code here
 * }
 * </pre>
 *
 * This function is called when the `run` button is click. Value in input field is split in an array of string
 * and passed to main.
 *
 *
 *
 * */


/** Global variable, can be used any where */
let Terminal = null;
let Board = null;

/* only initialize page after DOM is completely loaded. */
document.addEventListener("DOMContentLoaded", function (event) {
	
	/** "private" variable, only for this file */
	const OUTPUT_ID = 'text-output';
	const JSXBOX_ID = 'jxgbox';
	const DEFAULT_BOUNDING_SIZE = 250;
	const DEFAULT_BOX_SIZE = 500; //should be twice of DEFAULT_BOUNDING_SIZE
	
	const STYLE = `
    <style>
    html body {
      height: 100%;
    }
    #${OUTPUT_ID} {
      border: solid 0.5px hsl(0, 0%, 70%);
      height: 50ex;
      max-height: 50ex;
      font-family: "Source Code Pro", "Consolas" , monospace ;
      font-size: 10pt;
      margin-top: 8px;
      overflow: auto;
      padding: 10px 5px 5px 5px;
      background-color: hsl(0, 0%, 90%);
    }
    </style>
    `;
	
	/** "private" variable, only for this file */
	const BODY = `
    <code>main</code>'s arguments: <input type="text" id="argv" name="argv" />
    <button name="run" id="run" >Run</button>
    
    <div id="${OUTPUT_ID}"></div>
    <div id="${JSXBOX_ID}" class="jxgbox" style="width:${DEFAULT_BOX_SIZE}px; height:${DEFAULT_BOX_SIZE}px">
  `;
	
	document.getElementsByTagName("head")[0].innerHTML += STYLE;
	document.getElementsByTagName("body")[0].innerHTML = BODY;
	
	//Create Output Console
	Terminal = new DomOutput(OUTPUT_ID);
	//Empty every output in console
	document.getElementById(OUTPUT_ID).innerHTML = "";
	//Student can the test the code in main() by giving something in
	// #argv (optional) and click #run
	document.getElementById("run").addEventListener("click", function (event) {
		if (main && (typeof main === "function")) {
			let arguments = document.getElementById("argv").value.trim();
			if (arguments.length > 0) {
				main(...arguments.split(/\s+/));
			} else {
				main()
			}
		}
	});
	
	
	// Create JSX Board
	Board = JXG.JSXGraph.initBoard(JSXBOX_ID, {
		boundingbox: [0, DEFAULT_BOUNDING_SIZE, DEFAULT_BOUNDING_SIZE, 0],
		axis: true,
		keepaspectratio: true
	});
	
});