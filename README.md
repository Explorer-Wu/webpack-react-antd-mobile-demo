# webpack-react-family
webpack-react-family-config
webpack react 全家桶配置


In the project directory, you can run:

### 开发坏境启动
* 安装 
1. npm install
* 启动
2. npm start
* 打开json-server,模拟ajax数据
3. npm run mock 

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### 生产坏境部署
npm run build

拷贝dist文件夹至服务器即可

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!



To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

### Analyzing the Bundle Size


### Making a Progressive Web App


### Advanced Configuration


### Deployment


### `npm run build` fails to minify

"babel-plugin-syntax-jsx": "^6.18.0",
"eventsource-polyfill": "^0.9.6",
"eslint-config-airbnb-base": "^11.3.0",
"eslint-friendly-formatter": "^3.0.0",
"eslint-import-resolver-webpack": "^0.8.3",
"eslint-plugin-html": "^3.0.0",
"nightwatch": "^0.9.12",

##dep
@babel/runtime

##devDep
@babel/core
@babel/polyfill
@babel/node
@babel/plugin-transform-runtime
@babel/plugin-proposal-object-rest-spread
@babel/plugin-proposal-class-properties
@babel/plugin-transform-template-literals

@babel/preset-react
@babel/preset-env
@babel/transform-arrow-functions
@babel/preset-es2015

@babel/register
@babel/generator




@babel/plugin-proposal-decorators
@babel/plugin-async-to-generator

yarn add  @babel/cli @babel/core @babel/polyfill @babel/node @babel/register @babel/generator @babel/preset-env @babel/preset-react @babel/preset-es2015 @babel/plugin-transform-runtime @babel/plugin-proposal-object-rest-spread @babel/plugin-proposal-class-properties @babel/plugin-transform-template-literals  @babel/plugin-syntax-dynamic-import --dev