## Eslint

https://juejin.cn/post/7043702363156119565

https://juejin.cn/post/7118294114734440455#heading-29

```sh
// 添加依赖
pnpm add eslint -D

// 初始化当前项目自动生成配置文件
"init": "eslint --init"
pnpm add init

// lint当前项目中的文件并且开启自动修复
"lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --fix",
```
修复eslint错误
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aefc464540384112a886191c85c47368~tplv-k3u1fbpfcp-watermark.image?)
```cjs
// rules
"@typescript-eslint/ban-types": [
    "error",
    {
        "extendDefaults": true,
        "types": {
            "{}": false
        }
    }
]
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/49dc7a49782c40b79b51ba0808517fb9~tplv-k3u1fbpfcp-watermark.image?)

`@typescript-eslint/parser`会覆盖`vue-eslint-parser`解析器，需要在`parserOptions`中加入`"parser": "@typescript-eslint/parser"`,并将原来的parser换回`vue-eslint-parser`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eac491772a5a4a709b3b841b87ec94ef~tplv-k3u1fbpfcp-watermark.image?)

```cjs
// rules
"@typescript-eslint/no-explicit-any": ["off"]
```

## Prettier

```sh
pnpm add prettier -D
```
vscode项目配置

```json
{
    ...
    "editor.formatOnSave": true, // 开启自动保存
    "editor.defaultFormatter": "esbenp.prettier-vscode" // 默认格式化工具选择prettier
}

```
配置文件,js文件配置在vite工具下不生效
```cjs
module.exports = {
    printWidth: 80, //单行长度
    tabWidth: 2,
    useTabs: true, //使用空格代替tab缩进
    singleQuote: true,
    semi: false, //句末使用分号
}

```
json形式
```json
{
    "printWidth": 80, //单行长度
    "tabWidth": 2,
    "useTabs": true, //使用空格代替tab缩进
    "singleQuote": true,
    "semi": false, //句末使用分号
}

```


## 解决`eslint`与`prettier`的冲突

社区方案`eslint-config-prettier` + `eslint-plugin-prettier`

-   [eslint-plugin-prettier](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fprettier%2Feslint-plugin-prettier "https://github.com/prettier/eslint-plugin-prettier")： 基于 prettier 代码风格的 eslint 规则，即eslint使用pretter规则来格式化代码。
-   [eslint-config-prettier](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fprettier%2Feslint-config-prettier "https://github.com/prettier/eslint-config-prettier")： 禁用所有与格式相关的 eslint 规则，解决 prettier 与 eslint 规则冲突，**确保将其放在 extends 队列最后，这样它将覆盖其他配置**

  
```sh
pnpm add eslint-config-prettier eslint-plugin-prettier -D
```
### 在 `.eslintrc.cjs`中`extends`的最后添加一个配置
```json
    extends: [
            'eslint:recommended',
            'plugin:vue/vue3-essential',
            'plugin:@typescript-eslint/recommended',
            'plugin:prettier/recommended',
    ],
```

// 文件每行结束的格式
```bash
git config --global core.autocrlf false
```

## 配置husky
```sh
pnpm add husky -D

// 添加脚本，安装依赖时会自动执行该命令
{ "scripts": { "prepare": "husky install" }, }
```

使用`husky`命令添加`pre-commit`钩子,执行`git commit`的时候就会执行`pnpm lint`与`pnpm format`，通过此命令结果来控制提交结果。以此来规范提交代码的质量和格式

`pnpm husky add .husky/pre-commit "pnpm lint && pnpm prettier"`
## lint-staged

`pnpm add lint-staged -D`
`lint-staged` 是一个只检测`git`暂存区的`lint`工具

`pnpm husky add .husky/pre-commit "pnpm exec lint-staged"`

```json
    "lint-staged": {
            "*.{vue,js,ts,jsx,tsx,md,json}": "eslint --fix",
            "*.{html,css,less,scss}": [
                    "prettier --write"
            ]
    }
```