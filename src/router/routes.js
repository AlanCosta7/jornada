
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout'),
    children: [
      { path: '', name: 'landpage', component: () => import('pages/Index.vue') },
      { path: 'projetos', name: 'projetos', component: () => import('pages/projetos/Index.vue') },
      { path: 'login', component: () => import('pages/auth/login') },
      { path: 'politica', name: 'politica', component: () => import('pages/legal/Politica_privacidade') },
    ]
  },
  {
    path: '/:nickname',
    component: () => import('layouts/AppLayout'),
    children: [
      { path: '', name: 'inicio', component: () => import('pages/card/inicio') },
      {
        path: "cadastro-perfil",
        name: "cadastro-perfil",
        component: () => import("pages/auth/base-cadastro-user")
      },
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
