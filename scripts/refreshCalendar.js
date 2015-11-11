//Take the current dates file and conpare it against the new file.
//If anything changed, push the new file out there.

var ical = require('ical');
var jsonfile = require('jsonfile');

var currentDate = new Date();
var dateFile = '../objects/dates.json'
var overWrite = true;
var lastMod = 0;

//Grab latest mod date from current file
var currentDates = jsonfile.readFileSync(dateFile);
for (var k in currentDates) {
	if (currentDates.hasOwnProperty(k)) {
		var ev = currentDates[k]
		if (ev['last-modified'].substring(0,7) > lastMod) {
			lastMod = ev['last-modified'];
		}
		
		var start = new Date(ev['start']);
		if (start < currentDate ) {
			console.log('Consenting overwrite. Current file has old date: ' + ev['uid']);
			overWrite = true;
		}
	}
}
console.log('Last modified entry for current file:' + lastMod);

//Grab ical from web & compare latest mod dates.  Overwrite if necessary
ical.fromURL('https://www.google.com/calendar/ical/n9if4js3l7d3k8u57un90s7ueg%40group.calendar.google.com/public/basic.ics', {}, function(err, data) {
	var outString = [];

	//console.log(data);
	for (var k in data){
		if (data.hasOwnProperty(k)) {
			var ev = data[k]
			if (ev['last-modified'].substring(0,7) > lastMod) {
				overWrite = true;
				console.log('Consenting overwrite. Entry ' + ev['uid'] + ' modified at:' + ev['last-modified']);
			}

			//Only grab future dates
			var start = new Date(ev['start']);
			if (start >= currentDate ) {
				console.log('Adding event with uid: ' + ev['uid']);
				outString.push(ev);
			}
		}
	}

	if(overWrite){
		jsonfile.writeFile(dateFile, outString, function (err) {
			console.error(err)
		});
	}
});
