/* eslint-env node */
module.exports = {
    extends: ['plugin:vue/recommended'],
    rules: {
        'max-len': [
            'warn',
            160,
            4,
            {
                ignoreUrls: true,
                ignoreTemplateLiterals: true
            }
        ],
        'no-param-reassign': ['error', { props: false }],
        'vue/html-closing-bracket-spacing': 'off',
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': [
            {
                devDependencies: [
                    '.storybook/**',
                    'stories/**'
                ]
            }
        ]
    },
    env: {
        node: true,
        'jest/globals': true,
        "cypress/globals": true
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [
                    ['@', './src'],
                ],
                extensions: ['.vue', '.js', '.jsx', '.json']
            }
        }
    },
    plugins: ['jest', 'cypress']
};
