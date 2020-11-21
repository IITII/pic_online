# pic_online
> Front for pic_online

- Enjoy yourself with your images everywhere

* Front: [pic_online](https://github.com/IITII/pic_online)
* Backend: [pic_online_backend](https://github.com/IITII/pic_online_backend)
### Preview

[https://iitii.github.io/pic_online/](https://iitii.github.io/pic_online/)

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

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
