import request from '@/utils/request'
import qs from 'qs'

const EmailApi = {
  getEmailList: function(data) {
    return request({
      url: '/email/list',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

export default EmailApi
