module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: `${__dirname}/WebResources`,
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['env', {'modules': false}],
                                'react'
                            ]
                        }
                    }
                ],
                exclude: /node_modules/,
            }
        ]
    }
};