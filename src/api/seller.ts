import server from '@/utils/http'
// 获取商家销售统计数据
export const getseller = () => {
  return server({
    url: '/seller',
    method: 'GET'
  })
}
