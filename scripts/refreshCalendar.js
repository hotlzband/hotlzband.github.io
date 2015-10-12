var ical = require('ical');
var jsonfile = require('jsonfile')

var currentDate = new Date();
var outFile = '../objects/dates.json'

ical.fromURL('https://www.google.com/calendar/ical/n9if4js3l7d3k8u57un90s7ueg%40group.calendar.google.com/public/basic.ics', {}, function(err, data) {
	var lastMod = 0;
	var outString = [];
	
	//console.log(data);
	//for (var k = data.length -1; k >= 0 ; k--){
	for (var k in data){
		if (data.hasOwnProperty(k)) {
			var ev = data[k]
			if (ev['last-modified'] > lastMod) {
				lastMod = ev['last-modified'];
			}
			var start = new Date(ev['start']);
			if (start >= currentDate ) {
				console.log('Adding uid: ' + ev['uid']);
				outString.push(ev);
			}
		}
	}
	
	jsonfile.writeFile(outFile, outString, function (err) {
		console.error(err)
	});
});

