const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    configureWebpack: {
        plugins: [
            new StyleLintPlugin({
                configFile : '.stylelintrc',
                context    : 'src/scss',
                files      : '**/*.scss',
                failOnError: false,
                quiet      : false,
                syntax     : 'scss'
            })
        ]
    }
};