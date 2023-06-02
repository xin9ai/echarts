import server from '@/utils/http'
// 获取地区销售趋势数据
export const gettrend = () => {
    return server({
        url: '/trend',
        method: 'GET'
    })
}