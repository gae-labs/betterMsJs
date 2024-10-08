/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);

  const l_Regex = /(?:(-?\d*\.?\d*)\s*(?:years?|yrs?|y))?\s*(?:(-?\d*\.?\d*)\s*(?:weeks?|w))?\s*(?:(-?\d*\.?\d*)\s*(?:days?|d))?\s*(?:(-?\d*\.?\d*)\s*(?:hours?|hrs?|h))?\s*(?:(-?\d*\.?\d*)\s*(?:minutes?|mins?|m(?!s|i)))?\s*(?:(-?\d*\.?\d*)\s*(?:seconds?|secs?|s))?\s*(?:(-?\d*\.?\d*)\s*(?:milliseconds?|msecs?|ms|$))?/gim;

  const l_Match = l_Regex.exec(str);

  if (
    !l_Match ||
    ![
      l_Match[1],
      l_Match[2],
      l_Match[3],
      l_Match[4],
      l_Match[5],
      l_Match[6],
      l_Match[7],
    ].some((group) => group !== undefined)
  ) {
    return NaN;
  }

  const yearsValue = l_Match[1];
  const weeksValue = l_Match[2];
  const daysValue = l_Match[3];
  const hoursValue = l_Match[4];
  const minsValue = l_Match[5];
  const secsValue = l_Match[6];
  const msecsValue = l_Match[7];

  let l_TotalMS = 0;

  if (yearsValue != undefined) l_TotalMS += parseFloat(yearsValue) * y;
  if (weeksValue != undefined) l_TotalMS += parseFloat(weeksValue) * w;
  if (daysValue != undefined) l_TotalMS += parseFloat(daysValue) * d;
  if (hoursValue != undefined) l_TotalMS += parseFloat(hoursValue) * h;
  if (minsValue != undefined) l_TotalMS += parseFloat(minsValue) * m;
  if (secsValue != undefined) l_TotalMS += parseFloat(secsValue) * s;
  if (msecsValue != undefined) l_TotalMS += parseFloat(msecsValue);

  return l_TotalMS;
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}
