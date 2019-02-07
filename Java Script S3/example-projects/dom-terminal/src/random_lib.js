export function doExperiment(n, experiment) {
    let zahlen = (new Array(n)).fill(0);
    for (let e = 0; e < experiment; ++e) {
        let r = integerRandom(0, n);
        zahlen[r] += 1;
    }
    return zahlen;
}

export function integerRandom (from, to) {
    return Math.trunc(Math.random()*(to-from) )+ from;
}