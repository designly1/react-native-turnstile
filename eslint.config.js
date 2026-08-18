const reactNativeConfig = require('@react-native/eslint-config/flat');

module.exports = [
	...reactNativeConfig,
	{
		ignores: [
			'dist/**',
			'node_modules/**',
			'babel.config.js',
			'eslint.config.js',
			'tsup.config.ts',
		],
	},
];
