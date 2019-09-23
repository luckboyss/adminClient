// 实现按需打包
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', { // 配置上babel-plugin-import
    libraryName: 'antd', // 针对的是antd
    libraryDirectory: 'es', // 源码文件夹中es文件夹
    style: true, // 自动打包相关的样式文件
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {'@primary-color': '#1DA57A'},
  }),
);