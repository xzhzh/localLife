//index.js
//获取应用实例
const app = getApp()
const fetch = require('../../utils/fetch')


Page({
  data: {
    slides: [],
    categories: []
  },
  onLoad(options) {
    fetch('/slides')
      .then(res => {
        this.setData({ slides: res.data })
      })

    fetch('/categories')
      .then(res => {
        this.setData({ categories: res.data })
      })
  }

  
})
