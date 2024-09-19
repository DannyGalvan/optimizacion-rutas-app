// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    // Otras reglas...
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
    'react/no-unstable-nested-components': [
      'warning',
      {
        allowAsProps: true,       
      },
    ],
  },
};
