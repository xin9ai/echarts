import { createRouter, createWebHistory } from 'vue-router'
import SellerPage from '@/views/SellerPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/SellerPage'
    },
    {
      path: '/SellerPage',
      name: 'SellerPage',
      component: SellerPage
    }
  ]
})

export default router
