import ExtendedDateTimeZone from '../dist';

test('constructs a blank date successfully', () => {
    const edtz = new ExtendedDateTimeZone();
    expect(edtz).toBeInstanceOf(ExtendedDateTimeZone);
    expect(edtz.timezone).toBe('Greenwich');
    expect(edtz.getTimeZoneOffset()).toBe(0);
});

test('import a preexisting date successfully', () => {
    const date = new Date('2023-10-01T12:00:00Z');
    const edtz = new ExtendedDateTimeZone(date);
    edtz.setTimeZoneOffset(date.getTimezoneOffset())
    expect(edtz).toBeInstanceOf(ExtendedDateTimeZone);
    expect(edtz.getTimeZoneOffset()).toBe(date.getTimezoneOffset());
    expect(edtz.date).toEqual(date);
});

test('switch timezone successfully', () => {
    const date = new Date('2023-10-01T12:00:00Z');
    const edtz = new ExtendedDateTimeZone(date);
    edtz.switchTimezone("America/New_York"); // Switch to New York timezone
    expect(edtz.getTimeZone()).toBe('America/New_York');
    expect(edtz.getTimeZoneOffset()).toBe(240);
    expect(edtz.getFullDateTime()).toBe("10/1/2023, 8:00:00 AM (America/New_York DST)"); // Adjusted time
});

test('set and get timezone offset successfully', () => {
    const edtz = new ExtendedDateTimeZone();
    edtz.setTimeZoneOffset(300); 
    expect(edtz.getTimeZoneOffset()).toBe(300);
    expect(edtz.getTimeZone()).toBe('America/Chicago');
});

test('convert offset to timezone successfully', () => {
    const edtz = new ExtendedDateTimeZone();
    expect(edtz.offsetToTimeZone(0)).toBe('Greenwich');
    expect(edtz.offsetToTimeZone(240)).toBe('America/New_York');
    expect(edtz.offsetToTimeZone(300)).toBe('America/Chicago');
    expect(edtz.offsetToTimeZone(360)).toBe('America/Denver');
    expect(edtz.offsetToTimeZone(420)).toBe('America/Los_Angeles');
});

test('convert timezone to offset successfully', () => {
    const date = new Date('2023-10-01T12:00:00Z');
    const edtz = new ExtendedDateTimeZone(date);
    expect(edtz.timeZonetoOffset('Greenwich')).toBe(0);
    expect(edtz.timeZonetoOffset('America/New_York')).toBe(240);
    expect(edtz.timeZonetoOffset('America/Chicago')).toBe(300);
    expect(edtz.timeZonetoOffset('America/Denver')).toBe(360);
    expect(edtz.timeZonetoOffset('America/Los_Angeles')).toBe(420);
});

test('set date successfully', () => {
    const edtz = new ExtendedDateTimeZone();
    const newDate = new Date('2023-10-01T12:00:00Z');
    edtz.date = newDate;
    expect(edtz.date).toEqual(newDate);
});

test('get daylight saving time status', () => {
    const date_dst = new Date('2023-10-01T12:00:00Z');
    const edtz_dst = new ExtendedDateTimeZone(date_dst);
    const date_st = new Date('2023-01-01T12:00:00Z');
    const edtz_st = new ExtendedDateTimeZone(date_st);
    expect(edtz_dst.isDST()).toBe(true); // October is typically DST in US
    expect(edtz_st.isDST()).toBe(false); // January is typically standard time in US   
});

test('get leap year status', () => {
    const date_1 = new Date('2024-10-01T12:00:00Z');
    const edtz_1 = new ExtendedDateTimeZone(date_1);

    const date_2 = new Date('2000-10-01T12:00:00Z');
    const edtz_2 = new ExtendedDateTimeZone(date_2);

    const date_3 = new Date('2016-10-01T12:00:00Z');
    const edtz_3 = new ExtendedDateTimeZone(date_3);

    const date_4 = new Date('2028-10-01T12:00:00Z');
    const edtz_4 = new ExtendedDateTimeZone(date_4);

    const date_5 = new Date('2023-10-01T12:00:00Z');
    const edtz_5 = new ExtendedDateTimeZone(date_5);

    const date_6 = new Date('1900-10-01T12:00:00Z');
    const edtz_6 = new ExtendedDateTimeZone(date_6);

    const date_7 = new Date('2025-10-01T12:00:00Z');
    const edtz_7 = new ExtendedDateTimeZone(date_7);

    const date_8 = new Date('2023-10-01T12:00:00Z');
    const edtz_8 = new ExtendedDateTimeZone(date_8);

    expect(edtz_1.isLeapYear()).toBe(true);
    expect(edtz_2.isLeapYear()).toBe(true);
    expect(edtz_3.isLeapYear()).toBe(true);
    expect(edtz_4.isLeapYear()).toBe(true);
    expect(edtz_5.isLeapYear()).toBe(false);
    expect(edtz_6.isLeapYear()).toBe(false);
    expect(edtz_7.isLeapYear()).toBe(false);
    expect(edtz_8.isLeapYear()).toBe(false);
});
    



