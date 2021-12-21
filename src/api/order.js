import request from '@/utils/request'
import qs from 'qs'

const OrderApi = {
  getOrderList: function(data) {
    return request({
      url: '/order',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  // 删除
  deleteOrder: function(data) {
    return request({
      url: '/order/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

export default OrderApi
