/*
 * @author Hong-Phuc Bui
 * initial version 27.12.2018
 * */

/* this file depends on two global variables Terminal and Board which are defined in dfhi.js  */

function main(...argv) {

    let n = parseInt(argv[0]);
    let experiment = parseInt(argv[1]);
    let zahlen =doExperiment(n, experiment);

    Terminal.printl(zahlen);
}


function doExperiment(n, experiment) {
    let zahlen = (new Array(n)).fill(0);
    for (let e = 0; e < experiment; ++e) {
        let r = integerRandom(0, n);
        zahlen[r] += 1;
    }
    return zahlen;
}

function integerRandom (from, to) {
    return Math.trunc(Math.random()*(to-from) )+ from;
}
