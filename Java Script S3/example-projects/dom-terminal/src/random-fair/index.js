/*
 * @author Hong-Phuc Bui
 * initial version 27.12.2018
 * */

import {Terminal, Board} from "../dfhi";

window.main = function main(...argv) {

    let n = parseInt(argv[0]);
    let experiment = parseInt(argv[1]);
    let zahlen = doExperiment(n, experiment);
    Terminal.printl(zahlen);
};

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

function array2Table(resultArray){
    let table = "<table>";
    let indexLine = "<tr>",
        valueLine = "<tr>";

    for(let i = 0; i < resultArray.length; ++i){
        indexLine += `<td>${i}</td>`;
        valueLine += `<td>${resultArray[i]}</td>`;
    }

    indexLine += "</tr>";
    valueLine += "</tr>";
    table += indexLine + valueLine + "</table>";
    let tableDom = document.createDocumentFragment();
    tableDom.appendChild(document.createElement("div"));
    tableDom.querySelector("div").innerHTML = table;
    document.body.appendChild(tableDom);
}
