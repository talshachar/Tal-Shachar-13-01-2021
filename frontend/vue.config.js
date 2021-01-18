module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/styles/abstracts/_functions.scss';`
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      });
    config.plugin('html').tap(args => {
      args[0].title = "Telescopes";
      return args;
    });
  },
  lintOnSave: false
}
