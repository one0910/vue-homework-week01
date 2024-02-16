import LogInVue from '@/views/LogIn.vue'
import ProductVue from '@/views/Product.vue'
import ProductManageVue from '@/views/ProductManage.vue'
import CartVue from '@/views/Cart.vue'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes = [
  {
    name: 'product',
    path: '/',
    component: ProductVue,
    // beforeEnter: async (to, from, next) => {
    //   const store = useUserStore()
    //   console.log('store.userLoggedIn => ', store.userLoggedIn)
    //   if (store.userLoggedIn) {
    //     next()
    //   } else {
    //     next({ name: "login" })
    //   }
    // },
  },
  {
    name: 'productManage',
    path: '/product_manage',
    component: ProductManageVue,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'cart',
    path: '/cart',
    component: CartVue,
  },
  {
    name: 'login',
    path: '/login',
    component: LogInVue,
    meta: {
      isLoginPage: true
    }
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'product' }
  }

]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routes,
  linkExactActiveClass: 'activeLink'
})

router.beforeEach((to, form, next) => {
  // 2. 一般情形下沒有meta資料也可以進入該路由的頁面
  if (to.meta.requiresAuth) {
    const store = useUserStore()
    if (store.userLoggedIn) {
      next()
    } else {
      next({ path: '/', })
    }
    return;
  } else {
    next();
  }
})

export default router