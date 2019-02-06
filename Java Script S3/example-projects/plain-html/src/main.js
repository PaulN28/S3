/*
 * @author Hong-Phuc Bui
 * initial version 27.12.2018
 * */

/* this file depends on two global variables Terminal and Board which are defined in dfhi.js  */

function main(...argv) {

	// 1) print every argument in console, each a line
	Terminal.printl("Argument Vector is:");
	argv.forEach((a, i) => {
		Terminal.printl(i, ' ------ ', a);
	});
	// 2) print some infos
	Terminal.printl("Put your code in main() and run again!");
	Terminal.printl("Don't forget to press <F5> to reload the page!");
	let s = new Set([1, 3, 5]);
	Terminal.printl( s );
	Terminal.printl( new Map( [ ['a',1], ['b',3], ['c',5], ['s', s] ]) );
	// 3) use input arguments to plot something
	Terminal.printl("Plot something on Graphic Board");
	const n = parseInt(argv[0], 10);
	plotLines(Board, n);
	// 4) use some function
	Terminal.printl("Power of 2");
	powerOf2(n);
}

function plotLines(board, n){
	board.setBoundingBox([0, n, n, 0]);
	board.addGrid(); // for easy debug

	for (let i = 0; i <= n; ++i) {
		board.create('segment', [[0, n - i], [i, 0]], {
			straightFirst: false, straightLast: false, strokeWidth: 1
		});

	}
}

function powerOf2(n) {
	let i = 0,
		power = 1;

	while(i <= n) {
		Terminal.printl(i, '^2 = ', power);
		power *= 2;
		++i;
	}
	// throw an exception to test source map
	throw new Exception("test");
}

