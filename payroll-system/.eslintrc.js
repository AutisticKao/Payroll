module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        'vue/no-unused-vars': 'warn',
        'vue/no-multiple-template-root': 'off',
        'no-console': 'warn',
        'no-unused-vars': 'warn',
    },
};