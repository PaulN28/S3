-------------- Fonction printColorTriangle -----------------
function buildTriangle(lines,                 //
                       trailingChar = ' ',    //
                       separator= ' ',        //
                       char = '*') {          //
    var triangle = [];                        //

    for (let i = 0; i < lines; ++i) {
        let line = [];
        for (let j = 1; j < lines - i; ++j) {
            line.push(trailingChar);
        }
        for (let k = 0; k <= i; ++k) {
            line.push(char);
            k < i ? line.push(separator) : null;
        }
        triangle.push(line);
    }                                        //
    return triangle;                         //
}

function printColorTriangle(triangle) {
    const maxLeading = triangle.length === 0 ? 0 : Math.floor( Math.log10(triangle.length) );
    for (let index = 0; index < triangle.length; ++index) {
		let leading = index === 0 ? 0 : Math.floor( Math.log10(index) ) ;
		if (index % 2 === 0){
			console.warn(' '.repeat(maxLeading-leading) + index + '|' + triangle[index].join(''));
		}
		else {
			console.error(' '.repeat(maxLeading-leading) + index + '|' + triangle[index].join(''));
		}
    }
}

var triangle= buildTriangle(11); //
printColorTriangle(triangle); //

-------------- Fonction map -----------------


var n = [1, 2, 3, 4, 5, 6]
function quadrad (n){
  return n*n
}

var nquadrad = n.map(quadrad);
console.log(nquadrad);
var nsqrt = n.map(Math.sqrt)
console.log(nsqrt);


-------------- Fonction converter / reverse -----------------

var a = ['*', '+', '-']

function converter(x, index) {
  return x.repeat(index + 1)
}

var a2 = a.map(converter);
console.log(a2)

function revert(a, index, new_array) {
  let j = new_array.length - 1 - index;
  return new_array[j];
}

var a2 = a.map(revert);
console.log(a2);

-------------- Filtre -----------------

var n = [3, 6, 8, 9, 1, 2]
var gerade = n.filter(x => !(x%2))
console.log(gerade.sort());
