module.exports = {
    'root': true,
    'env': {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended',
        'google'
    ],
    'parserOptions': {
        parser: 'babel-eslint'
    },
    'rules': {
        'object-curly-spacing': 'off',
        'arrow-parens': 'off',
        'comma-dangle': 'off',
        'indent': ['error', 4],
        'require-jsdoc': 'off',
        'linebreak-style': 'off',
        'operator-linebreak': 'off',
        'no-debugger': 'warn',
        'keyword-spacing': 'off',
        'max-len': ['error', 100],
        'no-useless-catch': 'off'
    }
};
