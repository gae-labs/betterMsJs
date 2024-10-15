/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;
var M = y / 12;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 * - `long` verbose formatting [false] (Example: 5 hours instead of 5h)
 * - `compact` compact formatting [false] (Example: 5h30m instead of 5h 30m)
 * - `extraSpace` add extra space between value and unit [true with long and false when !long, unless specified] (Example: 5 h instead of 5h)
 * - `exclude` array of units to exclude [] (Acceptable Inputs: [y, M, w, d, h, m, s, ms])
 * - `plural` pluralize unit [true] [only works with long] (Example: 2 years instead of 2 year)
 * - `short` provide only the most significant unit [false] (Example: 5h 30m 10s would be shown as 5h)
 * - `minimum` minimum amount of a unit required to include that unit [1] (Acceptable Inputs: >= 1) (Example: Input of 1h 30m - Minimum 1 = 1h 30m | Minimum 2 = 90m | Minimum 1.5 = 1h 30m)
 * - `object` To return an object with each unit and value [false] (Expected Output: { y: 1, M: 2, w: 3, d: 4, h: 5, m: 6, s: 7, ms: 8 })
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
    return format(val, options);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val),
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

  const l_Regex =
    /(?:(-?\d*\.?\d*)\s*(?:years?|yrs?|y)(?![A-Za-z]))?\s*(?:(-?\d*\.?\d*)\s*(?:months?|mos?|mths?)(?![A-Za-z]))?\s*(?:(-?\d*\.?\d*)\s*(?:weeks?|w)(?![A-Za-z]))?\s*(?:(-?\d*\.?\d*)\s*(?:days?|d)(?![A-Za-z]))?\s*(?:(-?\d*\.?\d*)\s*(?:hours?|hrs?|h)(?![A-Za-z]))?\s*(?:(-?\d*\.?\d*)\s*(?:minutes?|mins?|m(?!s|i))(?![A-Za-z]))?\s*(?:(-?\d*\.?\d*)\s*(?:seconds?|secs?|s)(?![A-Za-z]))?\s*(?:(-?\d*\.?\d*)\s*(?:milliseconds?|msecs?|ms|$))?/gim;

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
      l_Match[8],
    ].some((group) => group !== undefined)
  ) {
    return NaN;
  }

  const yearsValue = l_Match[1];
  const monthsValue = l_Match[2];
  const weeksValue = l_Match[3];
  const daysValue = l_Match[4];
  const hoursValue = l_Match[5];
  const minsValue = l_Match[6];
  const secsValue = l_Match[7];
  const msecsValue = l_Match[8];

  let l_TotalMS = 0;

  if (yearsValue != undefined) l_TotalMS += parseFloat(yearsValue) * y;
  if (monthsValue != undefined) l_TotalMS += parseFloat(monthsValue) * M;
  if (weeksValue != undefined) l_TotalMS += parseFloat(weeksValue) * w;
  if (daysValue != undefined) l_TotalMS += parseFloat(daysValue) * d;
  if (hoursValue != undefined) l_TotalMS += parseFloat(hoursValue) * h;
  if (minsValue != undefined) l_TotalMS += parseFloat(minsValue) * m;
  if (secsValue != undefined) l_TotalMS += parseFloat(secsValue) * s;
  if (msecsValue != undefined) l_TotalMS += parseFloat(msecsValue);

  return l_TotalMS;
}

/**
 * Format for `ms`.
 *
 * Options:
 *
 * - `long` verbose formatting [false] (Example: 5 hours instead of 5h)
 * - `compact` compact formatting [false] (Example: 5h30m instead of 5h 30m)
 * - `extraSpace` add extra space between value and unit [true with long and false when !long, unless specified] (Example: 5 h instead of 5h)
 * - `exclude` array of units to exclude [] (Acceptable Inputs: [y, M, w, d, h, m, s, ms])
 * - `plural` pluralize unit [true] [only works with long] (Example: 2 years instead of 2 year)
 * - `short` provide only the most significant unit [false] (Example: 5h 30m 10s would be shown as 5h)
 * - `minimum` minimum amount of a unit required to include that unit [1] (Acceptable Inputs: >= 1) (Example: Input of 1h 30m - Minimum 1 = 1h 30m | Minimum 2 = 90m | Minimum 1.5 = 1h 30m)
 * - `object` To return an object with each unit and value [false] (Expected Output: { y: 1, M: 2, w: 3, d: 4, h: 5, m: 6, s: 7, ms: 8 })
 *
 * @param {Number} ms
 * @param {Object} [options]
 * @return {String}
 * @api private
 */
function format(ms, options) {
  options = options || {};
  options.plural = options.plural === undefined ? true : options.plural;
  options.extraSpace =
    options.extraSpace === undefined
      ? options.long
        ? true
        : false
      : options.extraSpace;
  options.minimum = options.minimum < 1 ? 1 : options.minimum || 1;

  var msAbs = Math.round(Math.abs(ms));
  var l_Result = '';
  var l_Object = {};

  if (
    (msAbs >= y * options.minimum || msAbs == y) &&
    (!options.exclude || !options.exclude.includes('y'))
  ) {
    const l_Value = Math.floor(msAbs / y);
    l_Result +=
      l_Value +
      (options.extraSpace ? ' ' : '') +
      (options.long
        ? options.plural
          ? l_Value != 1
            ? 'years'
            : 'year'
          : 'years'
        : 'y') +
      (options.compact ? '' : ' ');
    msAbs = msAbs - l_Value * y;
    l_Object.y = l_Value;
  }

  if (
    (msAbs >= M * options.minimum || msAbs == M) &&
    (!options.exclude || !options.exclude.includes('M')) &&
    !(options.short && l_Result.length > 0)
  ) {
    const l_Value = Math.floor(msAbs / M);
    l_Result +=
      l_Value +
      (options.extraSpace ? ' ' : '') +
      (options.long
        ? options.plural
          ? l_Value != 1
            ? 'months'
            : 'month'
          : 'months'
        : 'M') +
      (options.compact ? '' : ' ');
    msAbs = msAbs - l_Value * M;
    l_Object.M = l_Value;
  }

  if (
    (msAbs >= w * options.minimum || msAbs == w) &&
    (!options.exclude || !options.exclude.includes('w')) &&
    !(options.short && l_Result.length > 0)
  ) {
    const l_Value = Math.floor(msAbs / w);
    l_Result +=
      l_Value +
      (options.extraSpace ? ' ' : '') +
      (options.long
        ? options.plural
          ? l_Value != 1
            ? 'weeks'
            : 'week'
          : 'weeks'
        : 'w') +
      (options.compact ? '' : ' ');
    msAbs = msAbs - l_Value * w;
    l_Object.w = l_Value;
  }

  if (
    (msAbs >= d * options.minimum || msAbs == d) &&
    (!options.exclude || !options.exclude.includes('d')) &&
    !(options.short && l_Result.length > 0)
  ) {
    const l_Value = Math.floor(msAbs / d);
    l_Result +=
      l_Value +
      (options.extraSpace ? ' ' : '') +
      (options.long
        ? options.plural
          ? l_Value != 1
            ? 'days'
            : 'day'
          : 'days'
        : 'd') +
      (options.compact ? '' : ' ');
    msAbs = msAbs - l_Value * d;
    l_Object.d = l_Value;
  }

  if (
    (msAbs >= h * options.minimum || msAbs == h) &&
    (!options.exclude || !options.exclude.includes('h')) &&
    !(options.short && l_Result.length > 0)
  ) {
    const l_Value = Math.floor(msAbs / h);
    l_Result +=
      l_Value +
      (options.extraSpace ? ' ' : '') +
      (options.long
        ? options.plural
          ? l_Value != 1
            ? 'hours'
            : 'hour'
          : 'hours'
        : 'h') +
      (options.compact ? '' : ' ');
    msAbs = msAbs - l_Value * h;
    l_Object.h = l_Value;
  }

  if (
    (msAbs >= m * options.minimum || msAbs == m) &&
    (!options.exclude || !options.exclude.includes('m')) &&
    !(options.short && l_Result.length > 0)
  ) {
    const l_Value = Math.floor(msAbs / m);
    l_Result +=
      l_Value +
      (options.extraSpace ? ' ' : '') +
      (options.long
        ? options.plural
          ? l_Value != 1
            ? 'minutes'
            : 'minute'
          : 'minutes'
        : 'm') +
      (options.compact ? '' : ' ');
    msAbs = msAbs - l_Value * m;
    l_Object.m = l_Value;
  }

  if (
    (msAbs >= s * options.minimum || msAbs == s) &&
    (!options.exclude || !options.exclude.includes('s')) &&
    !(options.short && l_Result.length > 0)
  ) {
    const l_Value = Math.floor(msAbs / s);
    l_Result +=
      l_Value +
      (options.extraSpace ? ' ' : '') +
      (options.long
        ? options.plural
          ? l_Value != 1
            ? 'seconds'
            : 'second'
          : 'seconds'
        : 's') +
      (options.compact ? '' : ' ');
    msAbs = msAbs - l_Value * s;
    l_Object.s = l_Value;
  }

  if (
    msAbs > 0 &&
    (!options.exclude || !options.exclude.includes('ms')) &&
    !(options.short && l_Result.length > 0)
  ) {
    const l_Value = msAbs;
    l_Result +=
      l_Value +
      (options.extraSpace ? ' ' : '') +
      (options.long
        ? options.plural
          ? l_Value != 1
            ? 'milliseconds'
            : 'millisecond'
          : 'milliseconds'
        : 'ms') +
      (options.compact ? '' : ' ');
    l_Object.ms = l_Value;
  }

  if (ms < 0) l_Result = '-' + l_Result;
  if (ms < 0) l_Object.negative = true;

  if (options.object) return l_Object;
  else return l_Result.trim();
}
