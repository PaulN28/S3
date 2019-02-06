/*
 * @author Hong-Phuc Bui
 * initial version 27.12.2018
 * */

/* this file depends on two global variables Terminal and Board which are defined in dfhi.js  */

function main(...argv) {
    LIBRARY = creaLiebary();
    //sortLiebrary_star(LIBRARY);
    sortLibraryDate(LIBRARY);

}
function sortLiebrary_star(library){
    for(let i =1; i<5; i++){
        for (book of library){
            if (book.star == i) {
                Terminal.printl(i+ " = " + book.authors);
            }
        }
    }
}

function sortLibraryDate(library){
    var dates = [];
    for (book of library){
        var this_date = book.publish_date;
        if (this_date){
            dates.push(this_date.substr(this_date.length -4));
        }


    }
    for (date of dates.sort()){
        for (book of library){
            if (book.publish_date == date){
                Terminal.printl(date +" " + book.authors[0]);
            }
        }

    }

}



function creaLiebary(){
    return [
        {"key":"ISBN:9781449316853","authors":["David Flanagan"],
            "title":"JavaScript pocket reference",
            "publish_date":"2012","star":1}
        ,{"key":"ISBN:9780321508928","authors":["Michel Goossens"],
            "title":"The LaTeX Graphics companion",
            "publish_date":"2008","star":2}
        ,{"key":"ISBN:9782256907623","authors":["Alexandre Dumas"],
            "title":"Théâtre complet",
            "publish_date":"1976","star":4}
        ,{"key":"ISBN:9780321623218","authors":["Nicolai M. Josuttis"],
            "title":"The C++ standard library",
            "subtitle":"a tutorial and reference",
            "publish_date":"2012","star":2}
        ,{"key":"ISBN:9780321563842","authors":["Bjarne Stroustrup"],
            "title":"The C++ programming language",
            "publish_date":"June 2013","star":3}
        ,{"key":"OLID:OL17149223M","authors":["Alexandre Dumas (fils)"],
            "title":"Le demi-monde",
            "subtitle":"comédie en cinq actes, en prose.","star":1}
        ,{"key":"ISBN:9780134034287","authors":["Brett Slatkin"],
            "title":"Effective Python",
            "subtitle":"59 specific ways to write better Python.",
            "publish_date":"2015","star":3}
        ,{"key":"ISBN:9780596517748","authors":["Douglas Crockford"],
            "title":"JavaScript: The Good Parts",
            "subtitle":"Working with the Shallow Grain of JavaScript",
            "publish_date":"May 15, 2008","star":4}
        ,{"key":"ISBN:9780132350884","authors":["Robert C. Martin"],
            "title":"Clean Code",
            "publish_date":"July 2008","star":2}
        ,{"key":"ISBN:9780553213485","authors":["John Leonard Greenberg"],
            "title":"Faust, part I",
            "publish_date":"1985","star":3}
        ,{"key":"ISBN:9783540203773","authors":["Donald Knuth"],
            "title":"Algorithmen",
            "publish_date":"May 2006","star":3}
        ,{"key":"OLID:OL6543430M","authors":["Alexandre Dumas (fils)"],
            "title":"Le Demi-monde","subtitle":"comédie en cinq actes : en prose",
            "publish_date":"1860","star":3}
        ,{"key":"ISBN:9780691015149","authors":["Jane Ellen Harrison"],
            "title":"Prolegomena to the study of Greek religion",
            "publish_date":"1991","star":5}
        ,{"key":"ISBN:9782070367047","authors":["Alexandre Dumas","Alexandre Dumas (fils)"],
            "title":"La dame aux camélias",
            "publish_date":"1975","star":3}
        ,{"key":"OLID:OL20423961M","authors":["Alexandre Dumas"],
            "title":"Le comte de Monte-Cristo.",
            "publish_date":"1889","star":3}
    ];

}