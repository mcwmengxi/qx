module.exports = {
	// 设置我们的运行环境为浏览器 + es2021 + node ,否则eslint在遇到 Promise，window等全局对象时会报错
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	// 继承eslint推荐的规则集，vue基本的规则集，typescript的规则集
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-essential',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	overrides: [],
	// 新增，解析vue文件
	parser: 'vue-eslint-parser',
	// 支持ts的最新语法
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		parser: '@typescript-eslint/parser',
	},
	// 添加vue和@typescript-eslint插件，增强eslint的能力
	plugins: ['vue', '@typescript-eslint'],
	rules: {
		'@typescript-eslint/ban-types': [
			'error',
			{
				extendDefaults: true,
				types: {
					'{}': false,
				},
			},
		],
		'@typescript-eslint/no-explicit-any': ['off'],
		endOfLine: 'off',
	},
}
