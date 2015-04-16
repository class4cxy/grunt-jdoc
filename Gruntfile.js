/*
 * grunt-jdoc
 * http://www.alloyteam.com/
 *
 * Copyright (c) 2015 jdochen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jdoc: {
            all: {
                options: {
                  singleTag: ['discard']
                },
                src: 'test/js/checkAppInstalled.js',
                target: 'docs'
            }
        }
  });

  grunt.loadTasks('tasks');

  // 默认被执行的任务列表。
  grunt.registerTask('test', ['jdoc']);

};