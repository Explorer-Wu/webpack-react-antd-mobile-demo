// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  // parser: 'sugarss',
  // map: false,
  plugins: {
    // 'postcss-plugin': {}
    "postcss-import": {},
    "postcss-url": {},
    "postcss-cssnext": {},
    "postcss-nested": {},
    "cssnano": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}
