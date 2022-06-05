const publicRoutes = {
  path: 'public', alias: [''], meta: {role: ['public']},
  component: () => import('pages/public/EmptyPage'),
  children: [
    {path: 'home', alias: '', name: 'home', component: () => import('pages/public/Public')},
    {path: 'login', alias: '/login', name: 'login', component: () => import('pages/public/Login')},
    {path: 'setting', alias: '/setting', name: 'setting', component: () => import('pages/public/StoreSetting')},
  ]
}
const userRoutes = {
  path: 'user', name: 'user',
  meta: {roles: ['user']},
  component: () => import('layouts/UserLayout'),
  children: [
    {path: 'image', alias: '', component: () => import('pages/user/PicImageWaterfall.vue')},
    {path: 'video', component: () => import('pages/user/PicVideoWaterfall.vue')},
    {path: 'setting', component: () => import('pages/user/UserStoreSetting.vue')},
  ]
}
const adminRoutes = {
  path: 'admin', name: 'admin',
  meta: {roles: ['admin']},
  component: () => import('layouts/AdminLayout'),
  children: [
    {path: 'image', alias: '', component: () => import('pages/admin/PicImageWaterfall.vue')},
    {path: 'video', component: () => import('pages/admin/PicVideoWaterfall.vue')},
    {path: 'status', component: () => import('pages/admin/PicServerStatus.vue')},
    {path: 'setting', component: () => import('pages/admin/AdminStoreSetting.vue')},
  ]
}
// 经测试router.addRoutes其实是一个费力不讨好的事情,
// 会把项目中用不到的vue都打包进去,
// 因为编译的时候它根本不知道你们会add什么Routes,
// 所以一定会把所有vue都打包...
// 为了方便还是使用 router.beforeEach 根据后端的菜单树判断权限
// https://juejin.cn/post/6844903478880370701#heading-5

const routes = [
  {
    path: '/',
    component: () => import('layouts/EmptyLayout'),
    children: [
      // Vue will alert a warn when parent route has name
      // and children route path is '' or '/'.
      // We can using alias to avoid this
      publicRoutes,
      adminRoutes,
      userRoutes,

      // Always leave this as last one,
      // but you can also remove it
      // https://github.com/vuejs/vue-router/issues/724#issuecomment-301260298
      {
        path: '404', name: '404',
        alias: ['*'],
        component: () => import('pages/NotFound404')
      }
    ]
  },
]

export default routes
