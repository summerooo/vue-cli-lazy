//routes.js
//递归获取 views 文件夹下的所有.vue文件
const files = require.context('@/views', true, /\.vue$/)
let pages = {}
files.keys().forEach((key) => {
  pages[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
})
//生成路由规则
let generator = []
Object.keys(pages).forEach((item) => {
  generator.push({
    path: `/${pages[item].name.replace(/-/g, '/')}`,
    name: pages[item].name,
    component: pages[item],
  })
})
//合并公共路由以及重定向规则
const routes = [
  ...generator,
  {
    path: '*',
    component: () => import('@/views/Common/404.vue'),
  },
]

export default routes
