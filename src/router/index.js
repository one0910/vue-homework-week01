import LogInVue from '@/views/Frontstage/LogIn.vue'
import ProductVue from '@/views/Frontstage/Product.vue'
import ProductManageVue from '@/views/Backstage/ProductManage.vue'
import CartVue from '@/views/Frontstage/Cart.vue'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import BackstageHomeVue from '@/views/Backstage/BackstageHome.vue'
import FrontstageHomeVue from '@/views/Frontstage/FrontstageHome.vue'

const routes = [
  {
    name: 'front-stage',
    path: '/',
    component: FrontstageHomeVue,
    children: [
      {
        name: 'product',
        path: '/',
        component: ProductVue,
      },
      {
        name: 'login',
        path: 'login',
        component: LogInVue,
        meta: {
          isLoginPage: true
        }
      },
      {
        name: 'cart',
        path: 'cart',
        component: CartVue,
      },
    ]
  },
  {
    name: "back-stage",
    path: '/admin',
    component: BackstageHomeVue,
    children: [
      {
        name: 'productManage',
        path: 'product_manage',
        component: ProductManageVue,
        meta: {
          requiresAuth: true
        }
      },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { path: '/' }
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
      next({ name: 'login', })
    }
    return;
  } else {
    next();
  }
})

export default router