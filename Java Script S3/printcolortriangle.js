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

