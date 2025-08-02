module.exports = {
  presets: ['module:@react-native/babel-preset'],
   plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@src': './src',
          '@assets': './assets',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
      
    ],
  ],
};
