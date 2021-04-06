module.exports = {
  configureWebpack: {
    //cli已经配置了三个后缀名文件 .vue .js .json  想继续配置的话通过extensions:[]
    resolve: {
      alias: {		//已经默认配置了'@'别名
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}