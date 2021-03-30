# pic_online
> Front for pic_online

- Enjoy yourself with your images everywhere

* Front: [pic_online](https://github.com/IITII/pic_online)
* Backend: [pic_online_backend](https://github.com/IITII/pic_online_backend)

### Preview

[https://iitii.github.io/pic_online/](https://iitii.github.io/pic_online/)

### Keyboard support

> https://github.com/fengyuanchen/viewerjs#keyboard-support

* Esc: Exit full screen or close the viewer or exit modal mode or stop play.
* Space: Stop play.
* Tab: Switch the focus state on the buttons in the viewer.
* Enter: Trigger the click event handler on the button.
* ←: View the previous image.
* →: View the next image.
* ↑: Zoom in the image.
* ↓: Zoom out the image.
* Ctrl + 0: Zoom out to initial size.
* Ctrl + 1: Zoom in to natural size.

### Roadmap

* [x] i18n
* [x] Support image viewer
* [x] Support keyboard
* [x] Using `vuex` to save scrollbar status.
* [ ] Security & Auth2.0
* [ ] Theme
* [ ] Support draggable button.

### Known issues

1. Image display will be terrible when mobile phone rotating frequently.
2. In some case, memory usage will be larger and larger until browser panic because of all images is load in memory.
3. ~~drawer width will be to narrow to see `full node name` when using mobile phone~~

### Dev

#### Install the dependencies

```bash
npm install
```

#### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

#### Lint the files

```bash
npm run lint
```

#### Build the app for production

```bash
quasar build
```

#### ChangeLog

```bash
npm install -g conventional-changelog-cli
npm install -g standard-version
conventional-changelog -i CHANGELOG.md -s -r 0 -p eslint
# `major`, `minor` or `patch`
standard-version -r 'patch' --tag-prefix 'v' --infile CHANGELOG.md
```

#### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

### Refer

* https://github.com/mirari/v-viewer
* https://github.com/fengyuanchen/viewerjs
* https://github.com/lfyfly/vue-waterfall-easy
