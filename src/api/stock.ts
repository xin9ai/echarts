import server from '@/utils/http'

export const getStock = () => {
  return server({
    url: '/stock',
    method: 'GET'
  })
}
