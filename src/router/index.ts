import { createRouter, createWebHistory } from 'vue-router'
import SellerPage from '@/views/SellerPage.vue'
import TrendPage from '@/views/TrendPage.vue'
import MapPage from '@/views/MapPage.vue'
import RankPage from '@/views/RankPage.vue'
import HotPage from '@/views/HotPage.vue'
import StockPage from '@/views/StockPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/StockPage'
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
    },
    {
      path: '/MapPage',
      name: 'MapPage',
      component: MapPage
    },
    {
      path: '/Rankpage',
      name: 'Rankpage',
      component: RankPage
    },
    {
      path: '/Hotpage',
      name: 'Hotpage',
      component: HotPage
    },
    {
      path: '/Stockpage',
      name: 'Stockpage',
      component: StockPage
    }
  ]
})

export default router
