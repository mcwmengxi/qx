## 

>项目不安装依赖，全局的库会报ts类型错误


>别名配置，增加ts类型@types/node
```sh
pnpm add @types/node -D
```

>别名提示
```json
{
	"compilerOptions": {
        ...
        "baseUrl": "./",
        "paths": {
        "@/*": ["src/*"]
        }
	},
}
```

