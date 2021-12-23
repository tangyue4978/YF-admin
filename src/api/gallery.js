import request from '@/utils/request'
import qs from 'qs'

const GalleryApi = {
  getGalleryList: function(data) {
    return request({
      url: '/gallery',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  addGallery: function(data) {
    return request({
      url: '/save/gallery',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: data
    })
  },

  // 删除
  deleteGallery: function(data) {
    return request({
      url: '/delete/gallery',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

export default GalleryApi


