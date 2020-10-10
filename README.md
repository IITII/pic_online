# pic_online
> Front for pic_online  

- Enjoy yourself with your images everywhere

* Front: [pic_online](https://github.com/IITII/pic_online)
* Backend: [pic_online_backend](https://github.com/IITII/pic_online_backend)
### Preview

[https://iitii.github.io/pic_online/](https://iitii.github.io/pic_online/)

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm serve
```

### Compiles and minifies for production
```
npm build
```

### Lints and fixes files
```
npm lint
```

### Project structure
```
.
├── dist            // build dir
│   └── pic
├── public          // public dir
│   └── pic
└── src             // source files
    ├── assets      // Resource file dir
    ├── components  // Vue components
    ├── plugins     // Vue Plugins
    ├── routes      // Vue routers
    ├── utils       // basic function
    └── views       // Vue views
```
### Config

> See: https://cli.vuejs.org/zh/guide/deployment.html  

|        Param        |                                        Default                                        |             Description             |
| :-----------------: | :-----------------------------------------------------------------------------------: | :---------------------------------: |
|     publicPath      | `process.env.NODE_ENV === 'production'? process.env.PIC_DEPLOY_FIR or '/pic/' : '/',` | deploy dir, `root dir` or `sub-dir` |
|      outputDir      |                       `process.env.PIC_OUTPUT_DIR or './dist'`                        |          build output dir           |
| productionSourceMap |                         `process.env.PIC_SOURCE_MAP or false`                         |     SourceMap at production env     |

> Configure axios's default request url  

* Default

```js
const state = {
  url: local_setting.url || '/static/mock/data.json',
};
```

1. modify `'/static/mock/data.json'` at `./src/stores/modules/api_setting.js#17` as you want
2. Re-build dist, run: `npm build`

### Known issues

1. image display will be terrible when mobile phone rotating frequently.
2. Memory usage will be larger and larger until browser panic because of all images is load in memory.
3. ~~drawer width will be to narrow to see `full node name` when using mobile phone~~


### Roadmap

* i18n
* Security & Auth2.0
* Theme
* Support draggable button.
* Using `vuex` to save scrollbar status.

### History

#### v1.0.0

* Support horizontal scroll for the drawer.
* Configure axios request url on web page.
* Save user configure to localStorage.
* Emit the loading event before bottom equals zero.
* Add drawer width when using mobile phone.
* Using event emit/on and vuex to communication with other components.
* image waterfall bases on [vue-waterfall-easy](https://github.com/lfyfly/vue-waterfall-easy)