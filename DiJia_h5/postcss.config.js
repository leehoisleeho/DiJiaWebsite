export default  {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      unitToConvert: "px",
      viewportWidth: 750,
      propList: ["*"],
      viewportUnit: "vw",
      fontViewportUnit: "vw",
      selectorBlackList: ["ignore"],
      minPixelValue: 1,
      mediaQuery: true,
      replace: true,
      exclude: [],
      landscape: false,
    },
  },
};