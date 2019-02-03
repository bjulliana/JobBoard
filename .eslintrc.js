module.exports = {
    root         : true,
    env          : {
        node: true
    },
    'extends'    : [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules        : {
        'generator-star-spacing'     : 'off',
        'import/first'               : ['error', 'DISABLE-absolute-first'],
        'indent'                     : [2, 4],
        'comma-dangle'               : ['error', 'never'],
        'key-spacing'                : ['error', {'align': 'colon'}],
        'object-curly-spacing'       : ['error', 'never'],
        'quote-props'                : ['error', 'as-needed'],
        'max-len'                    : 0,
        'semi'                       : ['error', 'always'],
        'space-before-function-paren': ['error', {'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always'}],
        'vue/require-v-for-key'      : 'off',
        'no-console'                 : process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger'                : process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
