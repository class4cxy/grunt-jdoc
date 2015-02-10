module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jdoc: {
            all: {
                src: './js/app/checkAppInstalled.js',
                target: 'docs'
            }
        }
  });

  grunt.loadNpmTasks('grunt-jdoc');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['jdoc']);

};