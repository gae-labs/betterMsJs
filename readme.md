# BetterMsJs
##### Based on [vercel/ms](https://github.com/vercel/ms)[ @ v2.1.3](https://github.com/vercel/ms/tree/2.1.3)

![CI](https://github.com/gae-labs/betterMsJs/workflows/CI/badge.svg)

Use this package to easily convert various time formats to milliseconds.

## Comparison with `ms`

BetterMsJs is a fork of the original `ms` package. BetterMsJs implements the support for multiple time units in a single input string, such as `1d6h30m`. This allows for more flexibility in the input format. The original `ms` package only supports a single time unit in the input string.

 ### Breaking Changes compared to `ms`

 - This package now returns a ms value on inputs like `1d 2h 3m 4s` instead of `NaN`, this could be a breaking change if you were relying on the previous behavior.
 - This package now returns `NaN` on inputs that contain multiple decimal points like `1.2.3.4s` instead of `undefined`, this could be a breaking change if you were relying on the previous behavior.
 - This package now accepts inputs greater than 100 characters, this could be a breaking change if you were relying on the previous behavior.

## Examples

```js
betterMsJs('2 days 6 hours 30 minutes 15 seconds') // 183615000
betterMsJs('1d 2h 3m 4s') // 93784000
betterMsJs('1d2h3m4s') // 93784000
betterMsJs('2 days')  // 172800000
betterMsJs('1d')      // 86400000
betterMsJs('10h')     // 36000000
betterMsJs('2.5 hrs') // 9000000
betterMsJs('2h')      // 7200000
betterMsJs('1m')      // 60000
betterMsJs('5s')      // 5000
betterMsJs('1y')      // 31557600000
betterMsJs('100')     // 100
betterMsJs('-3 days') // -259200000
betterMsJs('-1h')     // -3600000
betterMsJs('-200')    // -200
```

### Convert from Milliseconds

```js
betterMsJs(60000)             // "1m"
betterMsJs(2 * 60000)         // "2m"
betterMsJs(-3 * 60000)        // "-3m"
betterMsJs(betterMsJs('10 hours'))    // "10h"
```

### Time Format Written-Out

```js
betterMsJs(60000, { long: true })             // "1 minute"
betterMsJs(2 * 60000, { long: true })         // "2 minutes"
betterMsJs(-3 * 60000, { long: true })        // "-3 minutes"
betterMsJs(betterMsJs('10 hours'), { long: true })    // "10 hours"
```

## Features

- Works both in [Node.js](https://nodejs.org) and in the browser
- If a number is supplied to `ms`, a string with a unit is returned
- If a string that contains the number is supplied, it returns it as a number (e.g.: it returns `100` for `'100'`)
- If you pass a string with a number and a valid unit, the number of equivalent milliseconds is returned

## Related Packages

- [ms.macro](https://github.com/knpwrs/ms.macro) - Run `ms` as a macro at build-time.

## Caught a Bug?

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Link the package to the global module directory: `npm link`
3. Within the module you want to test your local development instance of ms, just link it to the dependencies: `npm link ms`. Instead of the default one from npm, Node.js will now use your clone of ms!

As always, you can run the tests using: `npm test`