
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },      
      { path: 'login', component: () => import('pages/auth/login') },
      { path: 'politica', name: 'politica', component: () => import('pages/legal/Politica_privacidade') }
    ]
  },
  {
    path: '/app',
    component: () => import('layouts/AppLayout'),
    children: [
      { path: '', redirect: 'projects' },
      { path: 'card', name: 'projects', component: () => import('pages/card/inicio') },
      { path: 'cla', name: 'painel', component: () => import('pages/card/cla') }, 
      { path: 'loja', name: 'loja', component: () => import('pages/card/loja') }, 
      { path: 'ranking', name: 'ranking', component: () => import('pages/card/ranking') }, 
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
