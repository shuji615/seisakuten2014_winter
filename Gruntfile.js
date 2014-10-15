// 'use strict';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // grunt-contrib-connectの設定(Webサーバの設定)
    connect: {
      site: { // オプション未設定の為、空オブジェクト
      }
    },

    // grunt-contrib-watchの設定(ウォッチ対象の設定)
    watch: {
      html_files: {
        files: '**/*.html' // ウォッチ対象として、ディレクトリ配下の*.htmlを指定
      },
      css_files: {
        files: '**/*.css' // ウォッチ対象として、ディレクトリ配下の*.htmlを指定
      },
      js_files: {
        files: 'js/*.js' // ウォッチ対象として、ディレクトリ配下の*.htmlを指定
      },
      options: {
        livereload: true // 変更があればリロードするよ
      }
    }
  });

  // Load tasks(grunt実行時に読み込むプラグイン)
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default tasks(grunt実行時に実行するタスク)
  grunt.registerTask('default', ['connect', 'watch']);
};
