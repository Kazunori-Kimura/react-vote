module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:react/recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint',
        'prettier/react',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'prettier/prettier': 'error',
        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
        'react/jsx-indent': ['error', 4],
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
        'react/jsx-indent-props': ['error', 4],
        'react/prop-types': 'off',
        'react/default-props-match-prop-types': 'off',
        'react/require-default-props': 'off',
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/label-has-associated-control': [
            2,
            {
                required: {
                    some: ['nesting', 'id'],
                },
            },
        ],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
                mjs: 'never',
            },
        ],
        '@typescript-eslint/no-empty-function': 'off',
        'react/jsx-props-no-spreading': 'off',
        camelcase: 'off',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
};
