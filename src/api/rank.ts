import server from '@/utils/http'

export const getRank = () => {
  return server({
    url: '/rank',
    method: 'GET'
  })
}
