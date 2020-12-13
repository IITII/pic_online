const routes = [
  {
    path: '/',
    component: () => import('layouts/indexLayout'),
    children: [
      {
        path: '',
        component: () => import('layouts/dashboard/MainLayout'),
        children: [
          {
            path: '',
            redirect: '/waterfall'
          }, {
            path: '/waterfall',
            component: () => import('pages/waterfall')
          }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
