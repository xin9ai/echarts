import { createRouter, createWebHistory } from 'vue-router'
import SellerPage from '@/views/SellerPage.vue'
import TrendPage from '@/views/TrendPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/TrendPage'
    },
    {
      path: '/SellerPage',
      name: 'SellerPage',
      component: SellerPage
    },
    {
      path: '/TrendPage',
      name: 'TrendPage',
      component: TrendPage
    }
  ]
})

export default router
