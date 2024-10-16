/* eslint-disable no-undef */
/**
 * Dependencies.
 */

if (typeof require !== 'undefined') {
  expect = require('expect.js');
  ms = require('./');
}

// strings

describe('ms(string)', function () {
  it('should not throw an error', function () {
    expect(function () {
      ms('1m');
    }).to.not.throwError();
  });

  it('should preserve ms', function () {
    expect(ms('100')).to.be(100);
  });

  it('should convert from m to ms', function () {
    expect(ms('1m')).to.be(60000);
  });

  it('should convert from h to ms', function () {
    expect(ms('1h')).to.be(3600000);
  });

  it('should convert d to ms', function () {
    expect(ms('2d')).to.be(172800000);
  });

  it('should convert w to ms', function () {
    expect(ms('3w')).to.be(1814400000);
  });

  it('should convert s to ms', function () {
    expect(ms('1s')).to.be(1000);
  });

  it('should convert ms to ms', function () {
    expect(ms('100ms')).to.be(100);
  });

  it('should work with decimals', function () {
    expect(ms('1.5h')).to.be(5400000);
  });

  it('should work with multiple spaces', function () {
    expect(ms('1   s')).to.be(1000);
  });

  it('should return NaN if invalid', function () {
    expect(isNaN(ms('☃'))).to.be(true);
    expect(isNaN(ms('10-.5'))).to.be(true);
  });

  it('should be case-insensitive', function () {
    expect(ms('1.5H')).to.be(5400000);
  });

  it('should work with numbers starting with .', function () {
    expect(ms('.5ms')).to.be(0.5);
  });

  it('should work with negative integers', function () {
    expect(ms('-100ms')).to.be(-100);
  });

  it('should work with negative decimals', function () {
    expect(ms('-1.5h')).to.be(-5400000);
    expect(ms('-10.5h')).to.be(-37800000);
  });

  it('should work with negative decimals starting with "."', function () {
    expect(ms('-.5h')).to.be(-1800000);
  });
});

// long strings

describe('ms(long string)', function () {
  it('should not throw an error', function () {
    expect(function () {
      ms('53 milliseconds');
    }).to.not.throwError();
  });

  it('should convert milliseconds to ms', function () {
    expect(ms('53 milliseconds')).to.be(53);
  });

  it('should convert msecs to ms', function () {
    expect(ms('17 msecs')).to.be(17);
  });

  it('should convert sec to ms', function () {
    expect(ms('1 sec')).to.be(1000);
  });

  it('should convert from min to ms', function () {
    expect(ms('1 min')).to.be(60000);
  });

  it('should convert from hr to ms', function () {
    expect(ms('1 hr')).to.be(3600000);
  });

  it('should convert days to ms', function () {
    expect(ms('2 days')).to.be(172800000);
  });

  it('should work with decimals', function () {
    expect(ms('1.5 hours')).to.be(5400000);
  });

  it('should work with negative integers', function () {
    expect(ms('-100 milliseconds')).to.be(-100);
  });

  it('should work with negative decimals', function () {
    expect(ms('-1.5 hours')).to.be(-5400000);
  });

  it('should work with negative decimals starting with "."', function () {
    expect(ms('-.5 hr')).to.be(-1800000);
  });
});

// numbers

describe('ms(number, { long: true })', function () {
  it('should not throw an error', function () {
    expect(function () {
      ms(500, { long: true });
    }).to.not.throwError();
  });

  it('should support seconds', function () {
    expect(ms(1000, { long: true })).to.be('1 second');
    expect(ms(10000, { long: true })).to.be('10 seconds');

    expect(ms(-1000, { long: true })).to.be('-1 second');
    expect(ms(-10000, { long: true })).to.be('-10 seconds');
  });

  it('should support minutes', function () {
    expect(ms(60 * 1000, { long: true })).to.be('1 minute');
    expect(ms(60 * 10000, { long: true })).to.be('10 minutes');

    expect(ms(-1 * 60 * 1000, { long: true })).to.be('-1 minute');
    expect(ms(-1 * 60 * 10000, { long: true })).to.be('-10 minutes');
  });

  it('should support hours', function () {
    expect(ms(60 * 60 * 1000, { long: true })).to.be('1 hour');
    expect(ms(60 * 60 * 10000, { long: true })).to.be('10 hours');

    expect(ms(-1 * 60 * 60 * 1000, { long: true })).to.be('-1 hour');
    expect(ms(-1 * 60 * 60 * 10000, { long: true })).to.be('-10 hours');
  });

  it('should support days', function () {
    expect(ms(24 * 60 * 60 * 1000, { long: true })).to.be('1 day');

    expect(ms(-1 * 24 * 60 * 60 * 1000, { long: true })).to.be('-1 day');
  });
});

// numbers

describe('ms(number)', function () {
  it('should not throw an error', function () {
    expect(function () {
      ms(500);
    }).to.not.throwError();
  });

  it('should support milliseconds', function () {
    expect(ms(500)).to.be('500ms');

    expect(ms(-500)).to.be('-500ms');
  });

  it('should support seconds', function () {
    expect(ms(1000)).to.be('1s');
    expect(ms(10000)).to.be('10s');

    expect(ms(-1000)).to.be('-1s');
    expect(ms(-10000)).to.be('-10s');
  });

  it('should support minutes', function () {
    expect(ms(60 * 1000)).to.be('1m');
    expect(ms(60 * 10000)).to.be('10m');

    expect(ms(-1 * 60 * 1000)).to.be('-1m');
    expect(ms(-1 * 60 * 10000)).to.be('-10m');
  });

  it('should support hours', function () {
    expect(ms(60 * 60 * 1000)).to.be('1h');
    expect(ms(60 * 60 * 10000)).to.be('10h');

    expect(ms(-1 * 60 * 60 * 1000)).to.be('-1h');
    expect(ms(-1 * 60 * 60 * 10000)).to.be('-10h');
  });

  it('should support days', function () {
    expect(ms(24 * 60 * 60 * 1000)).to.be('1d');

    expect(ms(-1 * 24 * 60 * 60 * 1000)).to.be('-1d');
  });
});

// invalid inputs

describe('ms(invalid inputs)', function () {
  it('should throw an error, when ms("")', function () {
    expect(function () {
      ms('');
    }).to.throwError();
  });

  it('should throw an error, when ms(undefined)', function () {
    expect(function () {
      ms(undefined);
    }).to.throwError();
  });

  it('should throw an error, when ms(null)', function () {
    expect(function () {
      ms(null);
    }).to.throwError();
  });

  it('should throw an error, when ms([])', function () {
    expect(function () {
      ms([]);
    }).to.throwError();
  });

  it('should throw an error, when ms({})', function () {
    expect(function () {
      ms({});
    }).to.throwError();
  });

  it('should throw an error, when ms(NaN)', function () {
    expect(function () {
      ms(NaN);
    }).to.throwError();
  });

  it('should throw an error, when ms(Infinity)', function () {
    expect(function () {
      ms(Infinity);
    }).to.throwError();
  });

  it('should throw an error, when ms(-Infinity)', function () {
    expect(function () {
      ms(-Infinity);
    }).to.throwError();
  });
});

//* BetterMsJs

describe('BetterMsJs', function () {
  it('should support multiple time units in a single string', function () {
    expect(ms('1d2h3m4s')).to.be(93784000);
  });

  it('should not support numbers with multiple decimals', function () {
    expect(isNaN(ms('1.2.3d'))).to.be(true);
  });

  it('should not support a input with random characters at the end', function () {
    expect(isNaN(ms('1.3abc'))).to.be(true);
  });

  it('should not support a input with random characters after a valid time unit', function () {
    expect(isNaN(ms('1daysbc'))).to.be(true);
  });

  it('should support months', function () {
    expect(ms('1mo')).to.be(2629800000);
    expect(ms('1mth')).to.be(2629800000);
    expect(ms('1month')).to.be(2629800000);
  });

  it('should support milliseconds', function () {
    expect(ms(500, { long: true })).to.be('500 milliseconds');

    expect(ms(-500, { long: true })).to.be('-500 milliseconds');
  });

  it('should support seconds and milliseconds', function () {
    expect(ms(1200, { long: true })).to.be('1 second 200 milliseconds');

    expect(ms(-1200, { long: true })).to.be('-1 second 200 milliseconds');
  });

  it('should support minutes and seconds', function () {
    expect(ms(60 * 1200, { long: true })).to.be('1 minute 12 seconds');

    expect(ms(-1 * 60 * 1200, { long: true })).to.be('-1 minute 12 seconds');
  });

  it('should support hours and minutes', function () {
    expect(ms(60 * 60 * 1200, { long: true })).to.be('1 hour 12 minutes');

    expect(ms(-1 * 60 * 60 * 1200, { long: true })).to.be('-1 hour 12 minutes');
  });

  it('should support days and hours', function () {
    expect(ms(29 * 60 * 60 * 1000, { long: true })).to.be('1 day 5 hours');

    expect(ms(-1 * 29 * 60 * 60 * 1000, { long: true })).to.be(
      '-1 day 5 hours',
    );
  });

  it('should support weeks and days', function () {
    expect(ms(24 * 60 * 60 * 10000, { long: true })).to.be('1 week 3 days');

    expect(ms(-1 * 24 * 60 * 60 * 10000, { long: true })).to.be(
      '-1 week 3 days',
    );
  });

  it('should support weeks and days', function () {
    expect(ms(24 * 60 * 60 * 10000)).to.be('1w 3d');

    expect(ms(-1 * 24 * 60 * 60 * 10000)).to.be('-1w 3d');
  });

  it('should support years and months', function () {
    expect(ms(1000 * 60 * 60 * 24 * 365.25 * 3.5, { long: true })).to.be(
      '3 years 6 months',
    );
    expect(ms(-1000 * 60 * 60 * 24 * 365.25 * 3.5, { long: true })).to.be(
      '-3 years 6 months',
    );
  });

  it('should support the minimum option', function () {
    expect(ms(1000 * 89, { long: true, minimum: 1.5 })).to.be('89 seconds');
    expect(ms(1000 * 90, { long: true, minimum: 1.5 })).to.be(
      '1 minute 30 seconds',
    );
  });

  it('should support the compact option', function () {
    expect(ms(1000 * 90, { compact: true })).to.be('1m30s');
    expect(ms(1000 * 90)).to.be('1m 30s');
  });

  it('should support the extraSpace option', function () {
    expect(ms(1000 * 90, { extraSpace: true })).to.be('1 m 30 s');
    expect(ms(1000 * 90)).to.be('1m 30s');
  });

  it('should support the exclude option', function () {
    expect(ms(1000 * 90, { exclude: ['m'] })).to.be('90s');
    expect(ms(1000 * 90, { exclude: ['m', 's'] })).to.be('90000ms');
  });

  it('should support the short option', function () {
    expect(ms(1000 * 90, { short: true })).to.be('1m');
    expect(ms(1000 * 90, { short: true, exclude: ['m'] })).to.be('90s');
  });

  it('should support the object option', function () {
    expect(ms(1000 * 90, { object: true })).to.eql({ m: 1, s: 30 });
    expect(ms(1000 * 90, { object: true, exclude: ['m'] })).to.eql({ s: 90 });
  });
});
