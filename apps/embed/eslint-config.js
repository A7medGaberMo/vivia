import baseConfig from "@workspace/eslint-config/base.js";

export default [
    ...baseConfig,
    {
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
        },
    },
];

