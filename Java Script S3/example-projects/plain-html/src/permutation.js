/*
 * @author Hong-Phuc Bui
 * initial version 27.12.2018
 * */

/* this file depends on two global variables Terminal and Board which are defined in dfhi.js  */

function main(...argv) {

    Terminal.log(anagramma([1, 2, 'a'], 0));

}

function anagramma(Arr, first)
{
    if ((Arr.length - first) <= 1)
    {
        console.log( Arr.join('-') );
    }
    else
    {
        for (var i = 0; i < Arr.length-first ; i++)
        {
            anagramma(anagramma_round(Arr, first), first+1);
        }
    }
}

function anagramma_round(Arr, i){
    var temp = Arr[i];
    for(var j=i;j < Arr.length-1;j++)
    {
        Arr[j] = Arr[j+1];
    }
    Arr[Arr.length-1] = temp;
    return Arr;
}

