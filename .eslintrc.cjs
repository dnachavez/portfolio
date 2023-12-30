module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: "eslint:recommended",
    overrides: [],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        indent: ["warn", 4],
        quotes: ["warn", "double"],
        semi: ["warn", "always"],
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "no-unused-vars": "warn",
    },
};
