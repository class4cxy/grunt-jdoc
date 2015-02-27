# grunt-jdoc

> grunt plugin for generate doc form javascript source

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jdoc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jdoc');
```

## The "jdoc" task

### Overview
In your project's Gruntfile, add a section named `jdoc` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jdoc: {
    your_target: {
      // js source file you want to build from
      src: 'test/js/checkAppInstalled.js',
      // the path for `doc.json` generate to
      target: 'docs'
    }
  }
});
```
## js demo

### `function`
```js
/**
 * @function checkAppInstalled
 * @desc 通过packageName(Android)获取本地指定应用的本版号
 *
 * @param {String} identifier 要查询的 identifier。
 * @param {Function} callback 回调函数
 * @param {String} callback.result 返回查询结果。
 *
 * @example
 * app.checkAppInstalled(id, function (ret) {
 *     console.log(ret);
 * });
 *
 */
```
If the `function` is on some namespace, for example : `app.checkAppInstalled`
```js
/**
 * @function app.checkAppInstalled
 * ...
 */
```

### `namespace`
If you want to note namespace alone, for example : `app`
```js
/**
 * @namespace app
 * @desc 应用模块
 */
```

### `attribute`
```js
/**
 * @attribute isAppInstalled
 * @desc 是否安装标识
 */
```
If the `attribute` is on some namespace, for example : `app.isAppInstalled`
```js
/**
 * @attribute app.isAppInstalled
 * ...
 */
```

### `event`
```js
/**
 * @event qbrowserPullDown
 * @desc 页面下拉刷新是后会抛出该事件
 * @example
 * mqq.addEventListener("qbrowserPullDown", function () {
 *     // your code
 * });
 */
```

### `class`
```js
/**
 * @class Animal
 * @desc 动物类
 */
```
```js
/**
 * @prototype Animal.run
 * @desc 奔跑吧
 * @type Function
 *
 */
```
```js
/**
 * @prototype Animal.sex
 * @desc 性别
 * @type property
 *
 */
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
