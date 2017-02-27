module.exports = () => {

    var src = './src';
    var config = {
        temp: './.temp',
        //all js to vet
        alljs: [
            src + '/**/*.js',
            './*.js'
        ],
        compass: src + '/**/*.scss'

    };

    return config;
};