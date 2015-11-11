#! /bin/sh
STARTTIME=$(date +%s)
DATEFILE=$(echo "../objects/dates.json")
#node ./refreshCalendar.js
FILEMOD=$(date -r "$DATEFILE" +%s)
echo $FILEMOD
if $FILEMOD >= $STARTTIME; then
	echo "file modded"
fi