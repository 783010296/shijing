# 拾景

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 开发日记

- 2017-9-11 连接mongoose,connect要加参数，最好判断下数据库是不是连接成功了，加上数据库认证
- 2017-9-12 mongoDB createUser 加角色，不要空，否则会报没有权限，完成登录注册模块，下一步加错误提示和日志收集