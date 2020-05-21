(function (modules) { // webpackBootstrap
    //modules:{
    //     path:function(module, exports, __webpack_require__){}
    // } 


    // 安装的模块
    var installedModules = {
        moduleIdxxx: {
            i: moduleId,
            //是否缓存
            l: false,
            exports: {}
        },
    };
    // webpack的require函数
    function __webpack_require__(moduleId) {
        // 有缓存则直接返回
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId]
            = {
            i: moduleId,
            //是否缓存
            l: false,
            exports: {}
        };
        // modules为引入变量，modules[moduleId]是
        // (function (module, exports, __webpack_require__) {

        //             eval(
        //                 `const sayHello = __webpack_require__( \"./src/hello.js\")
        //             console.log(sayHello('lucas'))`);

        //         })
        // (function (module, exports) {

        //     eval(
        //         `module.exports = function (name) {
        //             return 'hello ' + name
        //     }`);

        // }),
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;

        return module.exports;
    }

    __webpack_require__.m = modules;


    // expose the module cache
    __webpack_require__.c = installedModules;

    __webpack_require__.d = function (exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, { enumerable: true, get: getter });
        }
    };
    __webpack_require__.r = function (exports) {
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        }
        Object.defineProperty(exports, '__esModule', { value: true });
    };

    __webpack_require__.t = function (value, mode) {
        if (mode & 1) value = __webpack_require__(value);
        if (mode & 8) return value;
        if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, 'default', { enumerable: true, value: value });
        if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
        return ns;
    };
    // getDefaultExport function for compatibility with non-harmony modules
    __webpack_require__.n = function (module) {
        var getter = module && module.__esModule ?
            function getDefault() { return module['default']; } :
            function getModuleExports() { return module; };
        __webpack_require__.d(getter, 'a', getter);
        return getter;
    };
    // Object.prototype.hasOwnProperty.call
    __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    // __webpack_public_path__
    __webpack_require__.p = "";



    return __webpack_require__(__webpack_require__.s = "./src/index.js");
})


    (
        {

            "./src/hello.js":
                (function (module, exports) {

                    eval(
                        `module.exports = function (name) {
                            return 'hello ' + name
                    }`);

                }),

            "./src/index.js":

                (function (module, exports, __webpack_require__) {

                    eval(
                        `const sayHello = __webpack_require__( \"./src/hello.js\")
                    console.log(sayHello('lucas'))`);

                })

        }
    );