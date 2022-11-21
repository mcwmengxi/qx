import { reactive } from 'vue'

/** 密码正则（密码格式应为8-18位数字、字母、符号的任意两种组合） */
export const REGEXP_PWD =
	/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/

const validatePass = (rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('请输入密码'))
	} else {
		if (!REGEXP_PWD.test(value)) {
			callback(new Error('密码格式应为8-18位数字、字母、符号的任意两种组合'))
		} else {
			callback()
		}
	}
}

export const loginRules = reactive({
	username: [
		{
			required: true,
			message: '请输入账号',
			trigger: 'blur'
		}
	],
	// 自定义校验规则
	password: [
		{
			required: true,
			validator: validatePass,
			trigger: 'blur'
		}
	]
})
