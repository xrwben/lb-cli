#### lb-cli

##### 使用方式一

1、全局安装脚手架到本地

```bash
npm install create-lb-cli -g
```

2、创建项目

```bash
create-lb-cli 或者 lb-cli
```

##### 使用方式二

直接使用命令创建项目

```bash
npm init lb-cli
```


##### 本地开发

1、下载该项目

> 全局安装模式

2、npm link 相当于执行了全局安装，它会把我们的项目安装到全局的 node_modules 目录文件下

3、npm unlink

> 局部安装模式

2、npm link [package.name] 调试项目下安装link包

3、npm unlink [package.name]


学习：

https://docs.npmjs.com/cli/v6/commands/npm-init

- npm init foo -> npx create-foo

- npm init @usr/foo -> npx @usr/create-foo

- npm init @usr -> npx @usr/create