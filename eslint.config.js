//* OLD CONFIG FROM package.json
// "eslintConfig": {
//     "extends": "eslint:recommended",
//         "env": {
//         "node": true,
//             "es6": true
//     }
// },

// * NEW CONFIG

const js = require('@eslint/js');
module.exports = {
  rules: js.configs.recommended.rules,
  languageOptions: {
    globals: {
      require: true,
      module: true,
    },
  },
};
