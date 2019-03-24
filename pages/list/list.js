

const fetch = require('../../utils/fetch')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    category: null,
    shops: [],
    pageIndex: 0,
    pageSize: 20,
    totalCount: 0,
    hasMore: true
  },

  // 下拉加载更多
  loadMore() {
    let { pageIndex, pageSize, searchText } = this.data
    const params = { _page: ++pageIndex, _limit: pageSize }
    if (searchText) params.q = searchText
    // shops 商铺信息  取数据  绑定数据
    return fetch(`/categories/${this.data.category.id}/shops`, params)
      .then(res => {
        // console.log(res)
        const totalCount = parseInt(res.header['X-Total-Count'])
        const hasMore = this.data.pageIndex * this.data.pageSize < totalCount
        const shops = this.data.shops.concat(res.data)
        this.setData({ shops, totalCount, pageIndex, hasMore })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    fetch(`/categories/${options.cat}`)
      .then(res => {
        this.setData({ category: res.data })
        wx.setNavigationBarTitle({ title: res.data.name })
        // 加载完分类信息之后再去加载商铺信息
        this.loadMore()
      })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.setData({ shops: [], pageIndex: 0, hasMore: true })
    this.loadMore().then(() => wx.stopPullDownRefresh())
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 加载更多
    this.loadMore()
  },

  
})