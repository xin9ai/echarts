import server from '@/utils/http'

export const getHot = () => {
  return server({
    url: '/hotproduct',
    method: 'GET'
  })
}
