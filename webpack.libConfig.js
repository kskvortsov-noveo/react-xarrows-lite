const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  const { mode } = argv;
  return {
    plugins: [
      // new BundleAnalyzerPlugin()
    ],
    name: 'lib',
    mode: mode,
    target: ['web', 'es5'],
    externals: ['react', 'lodash/isEqual'],
    devtool: false,
    entry: path.resolve(__dirname, './src/index.tsx'),

    output: {
      hashFunction: "xxhash64",
      filename: 'index.js',
      path: path.resolve(__dirname, `lib`),
      clean: true,
      // library
      library: { name: 'reactXarrow', type: 'umd', umdNamedDefine: true },
      globalObject: 'this',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', 'jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                compilerOptions: { sourceMap: false, declarationMap: false }
              },
            },
          ],
        },
        {
          test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
          use: ['file-loader'],
        },
      ],
    },
  };
};
