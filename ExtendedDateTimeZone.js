
class ExtendedDateTimeZone {

    #date;
    timezone;
    timezoneOffset;
    timeZoneMode = 'IANA';
    dst = false;

    constructor(date = new Date(Date.parse(0))) {
        this.#date = date;
        if (date.valueOf() == (new Date(Date.parse(0))).valueOf()) {
            this.timezone = this.offsetToTimeZone(0);
            this.timezoneOffset = 0;

        } else {
            this.timezone = this.offsetToTimeZone(date.getTimezoneOffset());
            this.timezoneOffset = date.getTimezoneOffset();
        }
        this.dst = this.isDST(date);
    }

    static extractDateTime(dateSelector, hourSelector, minuteSelector, meridiemSelector, timezoneSelector) {
        const datepicker = document.querySelector(dateSelector);

        let date = datepicker.value;
        if (!(date instanceof Date)) {
            return;
        }
        let hours = parseInt(document.querySelector('select[name=hour]').value);
        // let sHour = parseInt($('select[name=hour]')[0].value);
        const meridiem = document.querySelector('select[name=amPm]').value;
        hours = meridiem == 'AM' ? hours % 12 : (hours % 12) + 12;
        const mins = parseInt(document.querySelector('select[name=minute]').value);
        // let sMin = parseInt($('select[name=minute]')[0].value);
        const timezone = document.querySelector('select[name=scheduleTimeZone]').value;
        // console.log("🚀 ~ validateScheduleDateTime ~ sTimeZone:", sTimeZone)

        date.setHours(sHour, sMin, 0);
        const tzoffset = date.getTimezoneOffset();

    }

    switchTimezone(tz) {
        const localTZO = this.date.getTimezoneOffset();
        let targetTZO = this.timeZonetoOffset(tz);
        this.date.setTime(this.date.getTime() - ((targetTZO - localTZO) * 60 * 1000));
        this.timezone = tz;
    }

    setTimeZoneOffset(offset) {
        this.timezoneOffset = offset;
    }

    getTimeZoneOffset() {
        return this.timezoneOffset;
    }

    getTimeZone() {
        return this.timezone;
    }

    offsetToTimeZone(offset) {
        switch (offset) {
            case 0:
                return "Greenwich";
            case 240:
                return "America/New_York";
            case 300:
                return "America/Chicago";
            case 360:
                return "America/Denver";
            case 420:
                return "America/Los_Angeles";
        }
    }

    timeZonetoOffset(timezone) {
        let offset;
        switch (timezone) {
            case "Greenwich":
                offset = 0;
                break;
            case "America/New_York":
                offset = 240;
                break;
            case "America/Chicago":
                offset = 300; //dst values
                break;
            case "America/Denver":
                offset = 360;
                break;
            case "America/Los_Angeles":
                offset = 420;
                break;
        }
        if (!this.dst) {
            offset += 60;
        }
        return offset;
    }

    set date(x) {
        this.#date = x;
    }

    get date() {
        return this.#date;
    }

    //is DST
    isDST(date) {
        const stDate = new Date(date.getTime());
        stDate.setMonth(0);
        return (stDate.getTimezoneOffset() !== date.timezoneOffset);
    }

    isLeapYear() {
        const year = this.date.getFullYear();
        if (year % 4 === 0) {
            if (year % 100 !== 0) {
                return true;
            } else {
                if (year % 400 == 0) {
                    return true;
                }
            }
        }
        return false;
    }

    //daysInMonth
    getDaysInMonth() {
        const month = this.date.getMonth();
        if (month % 2 === 0) {
            return 31;
        } else {
            if (month === 1) {
                if (this.isLeapYear()) {
                    return 29;
                } else {
                    return 28
                }
            }
            return 30;
        }
    }

    //get full date time
    getFullDateTime() {
        return `${this.date.toLocaleString()} (${this.getTimeZone()} ${(this.dst ? 'DST' : 'ST')})`;
    }
}

module.exports = ExtendedDateTimeZone;




