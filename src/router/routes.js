
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },      
      { path: 'login', component: () => import('pages/auth/login') },
    ]
  },
  {
    path: '/app',
    component: () => import('layouts/AppLayout'),
    children: [
      { path: '', redirect: 'projects' },
      { path: 'card', name: 'projects', component: () => import('pages/card/inicio') },
      { path: 'cla', name: 'painel', component: () => import('pages/card/cla') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
