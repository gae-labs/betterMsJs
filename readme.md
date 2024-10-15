# BetterMsJs
##### Based on [vercel/ms](https://github.com/vercel/ms)[ @ v2.1.3](https://github.com/vercel/ms/tree/2.1.3)

![CI](https://github.com/gae-labs/betterMsJs/workflows/CI/badge.svg)

Use this package to easily convert various time formats to milliseconds.

## Comparison with `ms`

BetterMsJs is a fork of the original `ms` package. BetterMsJs implements the support for multiple time units in a single input string, such as `1d6h30m`, and support for multiple units when formatting a human-readable string from milliseconds.
This allows for more flexibility in the input format. The original `ms` package only supports a single time unit in the input string, and rounds the output string to the nearest unit.

### Breaking Changes compared to `ms`

- This package now returns a ms value on inputs like `1d 2h 3m 4s` instead of `NaN`, this could be a breaking change if you were relying on the previous behavior.
- This package now returns `NaN` on inputs that contain multiple decimal points like `1.2.3.4s` instead of `undefined`, this could be a breaking change if you were relying on the previous behavior.
- This package now accepts inputs greater than 100 characters, this could be a breaking change if you were relying on the previous behavior.

## Installation

```bash
npm install @gae-labs/better-ms
```

## Usage

```js
const betterMs = require('@gae-labs/better-ms');

betterMs('2 days 6 hours 30 minutes 15 seconds')    // 196215000
betterMs(196215000)                                 // "2d 6h 30m 15s"
```

### Parse to Milliseconds

```js
betterMs('2 days 6 hours 30 minutes 15 seconds')    // 196215000
betterMs('1d 2h 3m 4s')                             // 93784000
betterMs('2 days')                                  // 172800000
betterMs('1d')                                      // 86400000
betterMs('10h')                                     // 36000000
betterMs('2.5 hrs')                                 // 9000000
betterMs('2h')                                      // 7200000
betterMs('1m')                                      // 60000
betterMs('5s')                                      // 5000
betterMs('1y')                                      // 31557600000
betterMs('100')                                     // 100
betterMs('-3 days')                                 // -259200000
betterMs('-1h')                                     // -3600000
betterMs('-200')                                    // -200
```

#### Supported Units for Parsing

- **Years**: `y`, `yr`, `yrs`, `year`, `years`
- **Months**: `mo`, `mos`, `mth`, `mths`, `month`, `months`
- **Weeks**: `w`, `week`, `weeks`
- **Days**: `d`, `day`, `days`
- **Hours**: `h`, `hr`, `hrs`, `hour`, `hours`
- **Minutes**: `m`, `min`, `mins`, `minute`, `minutes`
- **Seconds**: `s`, `sec`, `secs`, `second`, `seconds`
- **Milliseconds**: `ms`, `msec`, `msecs`, `millisecond`, `milliseconds` 

### Format to Human-Readable String

```js
betterMs(60000)                                     // "1m"
betterMs(1000 * 60 * 60 * 24)                       // "1d"
betterMs(betterMs('10 hours'))                      // "10h"
betterMs(1000 * 60 * 60 * 36)                       // "1d 12h"
betterMs(1000 * 60 * 60 * 36, { long: true })       // "1 day 12 hours"
betterMs(1000 * 60 * 60 * 36, { compact: true })    // "1d12h"
betterMs(1000 * 60 * 60 * 36, { extraSpace: true }) // "1 d 12 h"
betterMs(1000 * 60 * 60 * 36, { exclude: ['d'] })   // "36h"
betterMs(1000 * 60 * 60 * 36, { plural: false })    // "1 day 12 hour"
betterMs(1000 * 60 * 60 * 36, { short: true })      // "1d"
betterMs(1000 * 60 * 60 * 36, { object: true })     // { d: 1, h: 12 }
betterMs(1000 * 60 * 60 * 48, { minimum: 2 })       // "2d"
betterMs(1000 * 60 * 60 * 47, { minimum: 2 })       // "47h"
```

#### Options for Formatting

- `long` verbose formatting [false] (Example: 5 hours instead of 5h)
- `compact` compact formatting [false] (Example: 5h30m instead of 5h 30m)
- `extraSpace` add extra space between value and unit [true with long and false when !long, unless specified] (Example: 5 h instead of 5h)
- `exclude` array of units to exclude [] (Acceptable Inputs: [y, M, w, d, h, m, s, ms])
- `plural` pluralize unit [true] [only works with long] (Example: 2 years instead of 2 year)
- `short` provide only the most significant unit [false] (Example: 5h 30m 10s would be shown as 5h)
- `minimum` minimum amount of a unit required to include that unit [1] (Acceptable Inputs: >= 1) (Example: Input of 1h 30m - Minimum 1 = 1h 30m | Minimum 2 = 90m | Minimum 1.5 = 1h 30m)
- `object` To return an object with each unit and value [false] (Expected Output: { y: 1, M: 2, w: 3, d: 4, h: 5, m: 6, s: 7, ms: 8 })


## Features

- Works both in [Node.js](https://nodejs.org) and in the browser
- If a number is supplied to `ms`, a string with a unit is returned
- If a string that contains the number is supplied, it returns it as a number (e.g.: it returns `100` for `'100'`)
- If you pass a string with a number and a valid unit, the number of equivalent milliseconds is returned

## Caught a Bug?

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Link the package to the global module directory: `npm link`
3. Within the module you want to test your local development instance of ms, just link it to the dependencies: `npm link ms`. Instead of the default one from npm, Node.js will now use your clone of ms!

As always, you can run the tests using: `npm test`