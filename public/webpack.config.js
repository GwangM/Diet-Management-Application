const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname, '../');

const babelLoaderConfiguration = {
  test: /\.js$/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: ['@babel/preset-react',
      [
        '@babel/preset-env',
        {
          targets: {
            esmodules: true, // 추가한 부분
          }}]],
      plugins: ['react-native-web']
    }
  }
};


const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv)
  
  config.entry= [path.resolve(appDirectory, 'index.web.js')];
  config.output[filename]='bundle.web.js';
  config.output[path]=path.resolve(appDirectory,'dist');
  config.module.rules=[babelLoaderConfiguration];
  config.plugins=[new HtmlWebpackPlugin({ template: './public/index.html'})];
  config.resolve.alias['react-native$']='react-native-web'
  config.resolve.alias['../Utilities/Platform'] =
    'react-native-web/src/exports/Platform'
  config.resolve.extensions=['.js','...','.jsx','.web.js','.json','.wasm']
  return config
}

// module.exports = {
//   entry: [
//     path.resolve(appDirectory, 'index.web.js')
//   ],
//   output: {
//     filename: 'bundle.web.js',
//     path: path.resolve(appDirectory, 'dist')
//   },

//   module: {
//     rules: [
//       babelLoaderConfiguration,
//     ]
//   },

//   plugins:[new HtmlWebpackPlugin({ template: './public/index.html'})],

//   resolve: {
//     alias: {
//       'react-native$': 'react-native-web',
//       '../Utilities/Platform':'react-native-web/dist/exports/Platform'
//     },
//     extensions: [ '.web.js', '.js' ,'...','.jsx','.wasm','.json']
//   }
// }