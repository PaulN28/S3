import {doExperiment} from "../random_lib";
import "./style.css";

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

function userDoExperiment(event) {
    let element = document.getElementById("element").value;
    let experiment = document.getElementById("experiment").value;

    console.log('${element} ${experiment}');

    let experimentResult = doExperiment(element, experiment);
    let htmlCode = array2Table(experimentResult);

    let container = document.getElementById("result");
    container.innerHTML = htmlCode;
}

document.addEventListener("DOMContentLoaded", function(event){
    document.getElementById("start").addEventListener("click", userDoExperiment)

});