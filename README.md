    
#Extended JS Date Time object with timezone adjustments and helper functions

Unofficial Release Version 0.0.12

##Usage
====================
	//cjs import
	const ExtendedDateTimeZone = require('./ExtendedDateTimeZone.js');
	
	//use or pass in date
	const now = new Date();
    const edtz_now = new ExtendedDateTimeZone(now);

	// or build a date from 0 value (default)
	const edtz = new ExtendedDateTimeZone();


##Helper Functions
==========================

    switchTimezone(timezone) //IANA Timezone

    setTimeZoneOffset(offset) 

    getTimeZoneOffset() 

    getTimeZone() 

    offsetToTimeZone(offset)

    timeZonetoOffset(timezone)

    isDST(date)

    isLeapYear() 

    getDaysInMonth() 

    getFullDateTime() //includes timezone
