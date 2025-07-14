export default class ExtendedDateTimeZone {

    #date: Date;
    timezone: string;
    timezoneOffset: number;
    timeZoneMode: string = 'IANA';
    dst: boolean = false;

    constructor(date = new Date(Date.parse('0'))) {
        this.#date = date;
        if (date.valueOf() == (new Date(Date.parse('0'))).valueOf()) {
            this.timezone = this.offsetToTimeZone(0);
            this.timezoneOffset = 0;

        } else {
            this.timezone = this.offsetToTimeZone(date.getTimezoneOffset());
            this.timezoneOffset = date.getTimezoneOffset();
        }
        this.dst = this.isDST();
    }

    static extractDateTime(dateSelector: string, hourSelector: string, minuteSelector: string, meridiemSelector: string, timezoneSelector: string) {
        const datePicker = document.querySelector(dateSelector);
        if (!datePicker || !dateSelector || !hourSelector || !minuteSelector || !meridiemSelector || !timezoneSelector) {
            return;
        }
        let dateStr = (datePicker as HTMLInputElement).value;
        if (!dateStr) {
            return;
        }
        let date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            return;
        }
        let hours = parseInt((document.querySelector('select[name=hour]') as HTMLSelectElement).value);
        let sHour = parseInt((document.querySelector('select[name=hour]') as HTMLSelectElement).value);
        const meridiem = ((document.querySelector('select[name=amPm]') as HTMLSelectElement).value);
        hours = meridiem == 'AM' ? hours % 12 : (hours % 12) + 12;
        const mins = parseInt((document.querySelector('select[name=minute]') as HTMLSelectElement).value);
        let sMin = parseInt((document.querySelector('select[name=minute]') as HTMLSelectElement).value);
        const timezone = (document.querySelector('select[name=scheduleTimeZone]') as HTMLSelectElement).value;
        date.setHours(sHour, sMin, 0);
        const tzoffset = date.getTimezoneOffset();
    }

    switchTimezone(tz: string): void {
        const localTZO = this.date.getTimezoneOffset();
        let targetTZO = this.timeZonetoOffset(tz);
        if (typeof targetTZO === 'undefined') {
            throw new Error('Invalid timezone offset');
        }
        this.date.setTime(this.date.getTime() - ((targetTZO - localTZO) * 60 * 1000));
        this.timezone = tz;
    }

    setTimeZoneOffset(offset: number): void {
        this.timezoneOffset = offset;
    }

    getTimeZoneOffset(): number {
        return this.timezoneOffset;
    }

    getTimeZone(): string {
        return this.timezone;
    }

    offsetToTimeZone(offset: number): string {
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
            default:
                throw new Error('Invalid timezone offset');
        }
    }

    timeZonetoOffset(timezone: string) {
        let offset: number = 0;
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


    isDST(): boolean {
        const stDate: Date = new Date(this.date.getTime());
        stDate.setMonth(0);
        return (stDate.getTimezoneOffset() !== this.date.getTimezoneOffset());
    }

    isLeapYear(): boolean {
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

    getDaysInMonth(): number {
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

    getFullDateTime(): string {
        return `${this.date.toLocaleString()} (${this.getTimeZone()} ${(this.dst ? 'DST' : 'ST')})`;
    }
}




