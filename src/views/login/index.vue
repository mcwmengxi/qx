<template>
	<div class="select-none">
		<div class="flex-c absolute right-5 top-3">
			<!-- 主题 -->
			<!-- <el-switch v-model="dataTheme" inline-prompt :active-icon="dayIcon" :inactive-icon="darkIcon" @change="dataThemeChange" /> -->
		</div>
		<div class="wave bg-clip-border" />
		<!-- <img :src="bg" class="wave" /> -->

		<!-- <div class="flex items-center text-sm font-medium my-5 sm:mt-2 sm:mb-4">
			<svg width="20" height="20" fill="currentColor" class="text-violet-600">
				<path
					d="M9.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.784-.57-.381-1.81.587-1.81H7.03a1 1 0 00.95-.69L9.05 3.69z"
				/>
			</svg>
		</div> -->

		<div class="login-container">
			<div class="login-box">
				<div class="login-form shadow-md bg-gray-200 border-green-100">
					<el-form ref="loginFormRef" :rules="loginRules" size="large" :model="loginInfo">
						<Motion :delay="100">
							<div id="owl-login" :class="{ password: pwdActive }">
								<div class="hand" />
								<div class="hand hand-r" />
								<div class="arms">
									<div class="arm" />
									<div class="arm arm-r" />
								</div>
							</div>
						</Motion>
						<!-- <div class="img">
							<owlLoginArm />
							<component :is="toRaw(owlLogin)" />
						</div> -->
						<Motion :delay="100">
							<el-form-item prop="username">
								<el-input clearable v-model="loginInfo.username" placeholder="用户名" :prefix-icon="useRenderIcon('ri:user-3-fill')" />
							</el-form-item>
						</Motion>
						<Motion :delay="150">
							<el-form-item prop="password">
								<el-input
									clearable
									v-model="loginInfo.password"
									show-password
									placeholder="密码"
									@focus="pwdActive = true"
									@blur="pwdActive = false"
									@change="updatePass"
									:prefix-icon="useRenderIcon('ri:lock-fill')"
								/>
							</el-form-item>
						</Motion>
						<Motion :delay="250">
							<el-form-item>
								<el-button class="w-full mt-4" size="default" type="primary" :loading="loading" @click="submitForm(loginFormRef)"
									>登录</el-button
								>
								<el-button @click="resetForm(loginFormRef)">重置</el-button>
							</el-form-item>
						</Motion>
					</el-form>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ElMessage, FormInstance } from 'element-plus'
import { reactive, ref, toRaw, onMounted, onBeforeUnmount } from 'vue'
import Motion from './helper/motion'
import { bg, owlLogin, owlLoginArm } from './helper/static'
import { loginRules } from './helper/rules'
import useRenderIcon from '@/components/Icons/src/useRenderIcon'
import userStore from '@/stores/modules/user'
import router from '@/router'

import dayIcon from '@/assets/svg/day.svg?component'
import darkIcon from '@/assets/svg/dark.svg?component'

const pwdActive = ref(false)
const loading = ref(false)
const $user = userStore()
const loginFormRef = ref<FormInstance>()
const loginInfo = reactive({
	username: 'admin',
	password: 'mcw19283899'
})
const updatePass = (value: string) => {
	pwdActive.value = true
}

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
	if (code === 'Enter') {
		submitForm(loginFormRef.value)
	}
}

onMounted(() => {
	window.document.addEventListener('keypress', onkeypress)
})

onBeforeUnmount(() => {
	window.document.removeEventListener('keypress', onkeypress)
})
const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	loading.value = true
	await formEl.validate((valid: any, fields: any) => {
		if (valid) {
			console.log('submit!', valid, formEl)
			$user
				.loginByUserName(toRaw(loginInfo))
				.then((data: any) => {
					console.log('登录成功', data)
					router.push('/')
					ElMessage.success('登录成功')
				})
				.finally(() => {
					loading.value = false
				})
		} else {
			loading.value = false
			console.log('error submit!', fields)
			return fields
		}
	})
}

const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.resetFields()
}
</script>

<style lang="scss" scoped>
@import url('@/styles/login.scss');

#owl-login {
	width: 211px;
	height: 108px;
	background-image: url(../../assets/images/bg/owl-login.svg);
	position: absolute;
	top: -126px;
	left: 50%;
	margin-left: -111px;

	.hand {
		width: 34px;
		height: 34px;
		border-radius: 40px;
		background-color: #472d20;
		transform: scaleY(0.6);
		transition: 0.3s ease-out;
		position: absolute;
		left: 14px;
		bottom: -8px;
	}
}

#owl-login .hand.hand-r {
	left: 170px;
}

#owl-login.password .hand {
	transform: translateX(42px) translateY(-15px) scale(0.7);
}

#owl-login.password .hand.hand-r {
	transform: translateX(-42px) translateY(-15px) scale(0.7);
}

#owl-login .arms {
	top: 58px;
	position: absolute;
	width: 100%;
	height: 41px;
	overflow: hidden;
}

#owl-login .arms .arm {
	width: 40px;
	height: 65px;
	position: absolute;
	left: 20px;
	top: 40px;
	background-image: url(../../assets/images/bg/owl-login-arm.svg);
	transition: 0.3s ease-out;
	transform: rotate(-20deg);
}

@media all and (-webkit-min-device-pixel-ratio: 1.5),
	(min--moz-device-pixel-ratio: 1.5),
	(-o-min-device-pixel-ratio: 1.5/1),
	(min-device-pixel-ratio: 1.5),
	(min-resolution: 138dpi),
	(min-resolution: 1.5dppx) {
	#login #owl-login .arms .arm,
	#register #owl-login .arms .arm {
		background-image: url(../../assets/images/bg/owl-login-arm.svg);
		background-size: 40px 65px;
	}
}

#owl-login .arms .arm.arm-r {
	transform: rotate(20deg) scaleX(-1);
	left: 158px;
}

#owl-login.password .arms .arm {
	transform: translateY(-40px) translateX(40px);
}

#owl-login.password .arms .arm.arm-r {
	transform: translateY(-40px) translateX(-40px) scaleX(-1);
}
</style>
<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
	padding: 0;
}
</style>
