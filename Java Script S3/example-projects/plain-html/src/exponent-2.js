/*
 * @author Hong-Phuc Bui
 * initial version 27.12.2018
 * */

/* this file depends on two global variables Terminal and Board which are defined in dfhi.js  */


 function main(...argv) {
    let n = parseInt(argv[0]);
    let i = 0,
        power = 1;

    while(i <= n) {
        Terminal.printl(i, power);
        power = power << 1;
        ++i;
    }
}

// 69590295810358705700000

/* for
function main(...argv) {
    let n = parseInt(argv[0]);
    let i = 0,
        power = 1;

    for (i; i <= n; ++i) {
        Terminal.printl(i, power);
        power = power * 2;
    }
}

do while
 function main(...argv) {
    let n = parseInt(argv[0]);
    let i = 0,
        power = 1;

    do {
        Terminal.printl(i, power);
        power = power * 2;
        ++i;
    } while(i <= n);
}
*/

