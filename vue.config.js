//自定义配置

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        //起别名
        'src': '@',
        'assets': '@/assets',
        'components': '@/components',
        'network': '@/network'
      }
    }
  }
}