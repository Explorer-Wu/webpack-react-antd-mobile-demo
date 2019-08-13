const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HappyPack = require('happypack');
const os = require('os');
// 创建 happypack 共享进程池，其中包含 x 个子进程
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

// var ROOT_PATH = path.join(__dirname, '../');
let devCssConfig = [ 'style-loader', 'css-loader', 'less-loader' ] 
const prodCssConfig = [
    {
        loader: 'css-loader',
        options: {
            // minimize: process.env.NODE_ENV === 'production' ? true : false,
            sourceMap: true
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: true,
            // plugins: () => [
            //     require('autoprefixer')()
            // ],
        }
    },     
    {
        loader: 'less-loader',
        options: {
            sourceMap: true,
            // javascriptEnabled: true,
        }
    }
]  //devCssConfig.splice(0,1)
const HappyPackPlugin = [
    new HappyPack({
        /** 必须配置, 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件 **/
        // id 标识符，要和 rules 中指定的 id 对应起来
        id: 'eslint',
        // 需要使用的 loader，用法和 rules 中 Loader 配置一样
        // 可以直接是字符串，也可以是对象形式
        loaders: [
            {
                loader: 'eslint-loader',
                options: {
                    // emitWarning: true,
                    formatter: require.resolve('react-dev-utils/eslintFormatter'),
                    eslintPath: require.resolve('eslint'),
                },
            }, 
        ],
        // 是否允许 HappyPack 输出日志，默认是 true
        verbose: true, 
        //verboseWhenProfiling: Boolean 开启webpack --profile ,仍然希望HappyPack产生输出。
        //启用debug 用于故障排查。默认 false
        debug: true,
        // 代表开启几个子进程去处理这一类型的文件，默认是3个，类型必须是整数。
        // threads: 3,
        // 使用共享进程池中的进程处理任务, 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
        threadPool: happyThreadPool,
        
    }),
    //js 编译多线程 
    new HappyPack({
        id: 'babel',
        loaders: [{
            loader: 'babel-loader',
            options: {
                /*cacheDirectory是用来缓存编译结果，下次编译加速*/
                cacheDirectory: true, //process.env.NODE_ENV === 'development' ? true : false,
                cacheCompression: process.env.NODE_ENV === 'production' ? true : false,
                compact: process.env.NODE_ENV === 'production' ? true : false,
                // presets: [ 'env','react','flow'],
                // plugins: ['@babel/plugin-syntax-dynamic-import','transform-object-rest-spread']
            }
        }],
        debug: true,
        threadPool: happyThreadPool
    }),
    // css 编译多线程
    new HappyPack({
        id: 'styles',
        loaders: process.env.NODE_ENV === 'production' ? prodCssConfig : devCssConfig,
        debug: true,
        threadPool: happyThreadPool
    }),
    // sass 编译多线程
    // new HappyPack({
    //     id: 'sass',
    //     threadPool: happyThreadPool,
    //     loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
    // }),
];

module.exports = HappyPackPlugin;