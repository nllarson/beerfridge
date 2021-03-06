var dest = './dist';
var src = './src';
var gutil = require('gulp-util');

module.exports = {
  server: {
    settings: {
      root: dest,
      host: 'localhost',
      port: 3000,
      livereload: {
        port: 35929
      }
    }
  },
  sass: {
    src: src + '/styles/**/*.{sass,scss,css}',
    dest: dest + '/styles',
    settings: {
      outputStyle: 'compressed',
      includePaths: [
        './node_modules/bootstrap-sass/assets/stylesheets',
        './node_modules/font-awesome/scss',
      ],
      indentedSyntax: false, // Enable .sass syntax?
      imagePath: '/images' // Used by the image-url helper
    },
    rename: {
      suffix: '.min'
    }
  },
  fonts: {
    src: ['./node_modules/bootstrap-sass/assets/fonts/**/*.{eot,svg,ttf,woff,woff2}', './node_modules/font-awesome/fonts/**/*.{eot,svg,ttf,woff,woff2}'],
    dest: dest + '/fonts'
  },
  browserify: {
    settings: {
      transform: [
        ['babelify', {presets: ['es2015', 'react']}],
        ['reactify']
      ]
    },
    src: src + '/js/index.js',
    dest: dest + '/js',
    outputName: 'index.js',
    debug: gutil.env.type === 'dev'
  },
  lint: {
    src: ['src/**/*.js', 'src/**/*.jsx']
  },
  html: {
    src: 'src/index.html',
    dest: dest
  },
  watch: {
    src: 'src/**/*.*',
    dest: dest + '/**/*',
    tasks: ['build']
  }
};
