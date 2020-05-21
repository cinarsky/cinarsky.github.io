

const path = require("path");
module.exports = {
    entry: {
        index: "./scripts/index.js"
    },
    output: {
        filename: "[name].bundle.[hash].js",//[hash]会在后面生成随机hash值
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        outputPath:'images/',//输出到images文件夹
                        limit:500  //是把小于500B的文件打成Base64的格式，写入JS
                    }
                }]
            }
        ]
    }
    
}


