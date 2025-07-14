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

