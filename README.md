    
#Extended JS Date Time object with timezone adjustments and helper functions

Official Release Version

##Usage
====================
	//esm import
	import ExtendedDateTimeZone from 'extendeddatetime';
	
	//use or pass in date
	const now = new Date();
    const edtz_now = new ExtendedDateTimeZone(now);

	// or build a date from 0 value (default)
	const edtz = new ExtendedDateTimeZone();

    //extract back
    let date = edtz.date;


##Helper Functions
==========================

    switchTimezone(timezone) //IANA Timezone

    setTimeZoneOffset(offset) 

    getTimeZoneOffset() 

    getTimeZone() 

    offsetToTimeZone(offset)

    timeZonetoOffset(timezone)

    isDST()

    isLeapYear()

    getDaysInMonth() 

    getFullDateTime() //includes timezone
