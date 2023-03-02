import { reactive } from 'vue'

export type Version = 2 | 3

export interface StorageOpts {
	/** vue版本 可选2、3 默认3 */
	version: Version
	/** 命名空间 默认  `rs-` */
	nameSpace: string
	/** 需要存储的响应式对象 */
	memory: object
}
interface ProxyStorage {
	getItem(key: string): any
	setItem(Key: string, value: string): void
	removeItem(key: string): void
	clear(): void
}

export default class Storage {
	static _nameSpace = 're_'
	static install(app: any, options: StorageOpts) {
		const { version, nameSpace = this._nameSpace, memory } = options
		memory && this.clearAll(nameSpace, memory)
		return new Storage(app, options)
	}
	static _getStaticKey(nameSpace: string, key: string) {
		return `${nameSpace ?? this._nameSpace}${key}`
	}
	static clearAll(nameSpace: string, memory: object) {
		Object.keys(memory).forEach(key => {
			const alias: string = key + nameSpace
			if (Object.prototype.hasOwnProperty.call(window.localStorage, alias)) {
				window.localStorage.removeItem(alias)
			}
		})
	}
	static get(key: string) {
		return JSON.parse(window.localStorage.getItem(key) as string)
	}

	static set(key: string, val: string) {
		// 处理值为对象的情况
		val = typeof val === 'object' ? JSON.stringify(val) : val
		window.localStorage.setItem(key, val)
	}
	static getData(key: string, nameSpace?: string) {
		if (Object.prototype.hasOwnProperty.call(window.localStorage, this._getStaticKey(nameSpace!, key))) {
			return JSON.parse(window.localStorage.getItem(this._getStaticKey(nameSpace!, key)) as string)
		}
	}

	public constructor(app: any, options: StorageOpts) {
		const that = Storage
		const { version = 3, nameSpace = that._nameSpace, memory } = options
		const _getKey = (key: string): string => nameSpace + key

		const _storage: any = version === 3 ? reactive(memory) : memory
		if (Object.keys(_storage).length === 0) console.warn('key cannot be empty')
		Object.keys(_storage).forEach(key => {
			that.set(_getKey(key), _storage[key])

			Reflect.defineProperty(_storage, key, {
				get() {
					return that.get(_getKey(key))
				},
				set(v) {
					that.set(_getKey(key), v)
				},
				configurable: true
			})

			if (version === 2) app.util.defineReactive(_storage, key, _storage[key])
		})
		const _target = version === 3 ? app.config.globalProperties : app.prototype

		Reflect.defineProperty(_target, '$storage', {
			get: () => _storage
		})
	}
}

//sessionStorage operate
class sessionStorageProxy implements ProxyStorage {
	protected storage: ProxyStorage

	constructor(storageModel: ProxyStorage) {
		this.storage = storageModel
	}

	// 存
	public setItem(key: string, value: any): void {
		this.storage.setItem(key, JSON.stringify(value))
	}

	// 取
	public getItem<T>(key: string): T {
		return JSON.parse(this.storage.getItem(key))
	}

	// 删
	public removeItem(key: string): void {
		this.storage.removeItem(key)
	}

	// 清空
	public clear(): void {
		this.storage.clear()
	}
}

//localStorage operate
class localStorageProxy extends sessionStorageProxy implements ProxyStorage {
	constructor(localStorage: ProxyStorage) {
		super(localStorage)
	}
}

export const storageSession = new sessionStorageProxy(sessionStorage)

export const storageLocal = new localStorageProxy(localStorage)
