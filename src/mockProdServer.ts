// Recode构造一个对象类型，string 表示对象的属性键 、any 表示对象的属性值
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
const modules: Record<string, any> = import.meta.glob('../mock/*.ts', { eager: true })
const mockModules = []

Object.keys(modules).forEach(key => {
	mockModules.push(...modules[key].default)
})

export function setupProdMockServer() {
	createProdMockServer(mockModules)
}
