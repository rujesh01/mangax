/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Require a type and optional scope
    'type-enum': [
      2,
      'always',
      [
        'feat', // A new feature
        'fix', // A bug fix
        'docs', // Documentation only changes
        'style', // Code style changes (formatting, etc)
        'refactor', // Refactoring code
        'perf', // Performance improvements
        'test', // Adding or fixing tests
        'chore', // Changes to build process or auxiliary tools
        'revert', // Reverting a previous commit
      ],
    ],
    // Allow empty scope, but enforce parentheses if used
    'scope-case': [2, 'always', 'kebab-case'],
    'subject-case': [0], // Let devs write naturally (no strict case for subject)
    'header-max-length': [2, 'always', 72], // Ideal for GitHub display
    'references-empty': [1, 'never'],
    'body-max-line-length': [0], // Allow long descriptions
    'footer-max-line-length': [0], // Allow long references/links
  },
};
