module.exports = {
  trailingComma: 'none',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  // endOfLine: "auto",
  overrides: [
    {
      files: '*.hbs',
      options: {
        singleQuote: false,
      },
    },
  ],
};
