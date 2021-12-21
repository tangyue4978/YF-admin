import request from '@/utils/request'
import qs from 'qs'

const JobApi = {
  getJobList: function(data) {
    return request({
      url: '/job',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  addJob: function(data) {
    return request({
      url: '/job/add',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  // 删除
  deleteJob: function(data) {
    return request({
      url: '/job/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

export default JobApi
