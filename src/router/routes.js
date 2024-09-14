import common from '../views/common/index.vue'

const 首页 = {
  path: '/home',
  name: 'home',
  meta: {
    module: '首页'
  },
  redirect: '/home/index',
  component: common,
  children: [
		{
      path: '/home/index',
      name: 'homeIndex',
      meta: {
        title: '首页',
      },
      component: () => import('../views/layout/home.vue'),
    },
	],
}

// 布局
const layout = {
  path: '/layout',
  name: 'layout',
  component: () => import('../views/layout/index.vue'),
  children: [
    首页,
  ],
}

const index = {
	path: '',
	name: 'index',
	redirect: '/home',
}


const other = [{
		path: '/login',
		name: 'login',
		meta: {
			title: '登录',
			description: 'description',
			keywords: '',
		},
		component: () => import('../views/other/signIn.vue'),
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import('../views/other/notFound.vue')
	},
]

export default [index, layout, ...other]
