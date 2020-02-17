import Vue from 'vue'
import VueRouter from 'vue-router'

//导入路由组件,懒加载方式
const Login = () => import('components/Login');
const Home = () => import('components/Home');


Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/home",
    component: Home
  }
]
//添加路由后，还需要再App写上路由占位符

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//挂载路由导航守卫，可用于非法登录拦截
router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    return next();
  }
  const tokenStr = window.sessionStorage.getItem("token");
  if (!tokenStr) {
    return next("/login");
  } else {
    return next();
  }
})


export default router
