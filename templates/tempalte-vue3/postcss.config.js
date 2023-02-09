module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 375,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [],
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 640
    },
    'autoprefixer': {
      overrideBrowserslist: [
        'Android >= 4',
        'iOS >= 7',
        'Chrome > 31',
        'ff > 31',
        'last 10 version'
      ]
    }
  }
}