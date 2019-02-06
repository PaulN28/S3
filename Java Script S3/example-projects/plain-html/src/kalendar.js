function main(...argv) {
    var month = parseInt(argv[0]);
    var year = parseInt(argv[1]);
    let calendar = buildCalendar(month, year);
    printCalendar(calendar);
}

window.dayOfWeek = function (day, month, year) {
    let y0, x, m0, d0;
    y0 = year - Math.trunc((14 - month) / 12);
    x = y0 +  Math.trunc(y0 / 4) - Math.trunc(y0 / 100) + Math.trunc(y0 / 400);
    m0 = month + 12 * Math.trunc((14 - month) / 12) - 2;
    d0 = (day + x + Math.trunc((31 * m0) / 12)) % 7;
    console.log(y0,x,m0,d0);
    return d0;
};

function buildCalendar(month, year) {
    let calendar = [];
    let numberOfDay = months[month].days;
    let firstDay = dayOfWeek(1, month, year);
    for (let i = 1; i < numberOfDay + firstDay; i++) {
        if (i < firstDay) {
            calendar.push(" ");
        } else {
            calendar.push(i - firstDay + 1);
        }
    }
    console.log(firstDay);
    return calendar;
}

function printCalendar(calendar) {
    let table = document.createElement("table");
    let row = document.createElement("tr");
    days.forEach(day => {
        let th = document.createElement("th");
        th.appendChild(document.createTextNode(day));
        row.appendChild(th);
    });
    table.appendChild(row);
    let count = -1;
    let monthRows = document.createElement("tr");
    calendar.forEach(day => {
        count++;
        if (count === 7) {
            monthRows = document.createElement("tr");
            count = 0
        }
        let td = document.createElement("td");
        td.appendChild(document.createTextNode(day));
        monthRows.appendChild(td);
        table.appendChild(monthRows);

    });
    document.body.appendChild(table);
}

var days = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag"];

var months = {
    1: {name: "January", days: 31},
    2: {name: "February", days: 28},
    3: {name: "March", days: 31},
    4: {name: "April", days: 30},
    5: {name: "May", days: 31},
    6: {name: "June", days: 30},
    7: {name: "July", days: 31},
    8: {name: "August", days: 31},
    9: {name: "September", days: 30},
    10:{name: "October", days: 31},
    11:{name: "November ", days: 30},
    12:{name: "December", days: 31},
};
