module.exports = {
	root: true,
	// 设置我们的运行环境为浏览器 + es2021 + node ,否则eslint在遇到 Promise，window等全局对象时会报错
	env: {
		// browser: true,
		// es2021: true,
		node: true
  },
  	// 添加vue和@typescript-eslint插件，增强eslint的能力
	plugins: ['vue', '@typescript-eslint'],
	// 继承eslint推荐的规则集，vue基本的规则集，typescript的规则集
	extends: [
    'eslint:recommended',
    // 'prettier',
		'plugin:vue/vue3-essential',
		// 关闭了规则集中的几个冲突规则, 此配置应放置在数组的末尾
		'@vue/typescript/recommended',
		'@vue/prettier',
		'@vue/eslint-config-typescript',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		// './.eslintrc-auto-import.json',
	],
	globals: {
	  // Ref sugar (take 2)
	  $: "readonly",
	  $$: "readonly",
	  $ref: "readonly",
	  $shallowRef: "readonly",
	  $computed: "readonly",

	  BASE_URL: true,
	  // script setup
	  defineProps: "readonly",
	  defineEmits: "readonly",
	  defineExpose: "readonly",
	  withDefaults: "readonly",

	  // index.d.ts
	  // global.d.ts
	  Fn: "readonly",
	  PromiseFn: "readonly",
	  RefType: "readonly",
	  LabelValueOptions: "readonly",
	  EmitType: "readonly",
	  TargetContext: "readonly",
	  ComponentElRef: "readonly",
	  ComponentRef: "readonly",
	  ElRef: "readonly",
	  global: "readonly",
	  ForDataType: "readonly",
	  ComponentRoutes: "readonly",

	},
	overrides: [
		{
			files: ['*.ts', '*.vue'],
			rules: {
				'no-undef': 'off'
			}
		},
		{
			files: ['*.vue'],
			parser: 'vue-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.vue'],
				ecmaVersion: 'latest',
				ecmaFeatures: {
					jsx: true
				}
			},
			rules: {
				'no-undef': 'off'
			}
		}
	],
	// 新增，解析vue文件
	parser: 'vue-eslint-parser',
	// 支持ts的最新语法
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		parser: '@typescript-eslint/parser',
		jsxPragma: 'React',
		ecmaFeatures: {
			jsx: true
		}
	},
	rules: {
		'vue/no-v-html': 'off',
		'vue/require-default-prop': 'off',
		'vue/require-explicit-emits': 'off',
		// "vue/multi-word-component-names": "off",
		'@typescript-eslint/no-explicit-any': 'off', // any
		'no-debugger': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off', // setup()
		// "@typescript-eslint/ban-types": "off",
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'vue/html-self-closing': [
			'error',
			{
				html: {
					void: 'always',
					normal: 'always',
					component: 'always'
				},
				svg: 'always',
				math: 'always'
			}
		],
		// '@typescript-eslint/no-unused-vars': [
		// 	'error',
		// 	{
		// 		argsIgnorePattern: '^_',
		// 		varsIgnorePattern: '^_'
		// 	}
		// ],
		// 'no-unused-vars': [
		// 	'error',
		// 	{
		// 		argsIgnorePattern: '^_',
		// 		varsIgnorePattern: '^_'
		// 	}
		// ],
		'@typescript-eslint/no-unused-vars': 0,
		'no-unused-vars': 0,
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto'
			}
		],
		// '@typescript-eslint/ban-types': [
		// 	'error',
		// 	{
    //     extendDefaults: true,
		// 		types: {
		// 			'{}': false
		// 		}
		// 	}
		// ],
    '@typescript-eslint/ban-types': 0,
		'@typescript-eslint/no-explicit-any': ['off'],
		endOfLine: 'off',
		// 关闭名称校验
		// 'vue/multi-word-component-names': [
		// 	'error',
		// 	{
		// 		ignores: ['Home', 'User', 'index', 'toggle', 'counter', 'localstorage', 'mouse'] //在这个数组中加入需要忽略的组件名
		// 	}
    // ],
    'vue/multi-word-component-names': 0,
	}
}
