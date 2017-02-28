module.exports = () => {
    var src = './src/',
        temp = './.temp/';

    var config = {
        src: src,
        temp: temp,
        alljs: [
            src + '/**/*.js',
            './*.js'
        ],
        compass: src + '/**/*.scss',
        css: temp + '/css',
        sass: './src/sass/'
    };
    return config;
};