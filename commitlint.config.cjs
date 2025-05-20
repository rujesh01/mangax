const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Enforce the presence of references in commit messages
    'references-empty': [2, 'never'],
    // Limit header length to improve readability
    'header-max-length': [2, 'always', 72],
    // Ensure the header does not end with a period
    'header-full-stop': [2, 'never', '.'],
    // Enforce lowercase for the type
    'type-case': [2, 'always', 'lower-case'],
    // Disallow empty type
    'type-empty': [2, 'never'],
    // Enforce lowercase for the scope
    'scope-case': [2, 'always', 'lower-case'],
    // Disallow empty scope
    'scope-empty': [2, 'never'],
    // Enforce sentence case for the subject
    'subject-case': [2, 'always', 'sentence-case'],
    // Disallow empty subject
    'subject-empty': [2, 'never'],
    // Ensure the subject does not end with a period
    'subject-full-stop': [2, 'never', '.'],
    // Enforce a blank line before the body
    'body-leading-blank': [2, 'always'],
    // Enforce a blank line before the footer
    'footer-leading-blank': [2, 'always'],
    // Limit body line length to improve readability
    'body-max-line-length': [2, 'always', 100],
    // Limit footer line length to improve readability
    'footer-max-line-length': [2, 'always', 100],
  },
};

module.exports = config;
