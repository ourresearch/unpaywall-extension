module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-html2js');


  // Print a timestamp (useful for when watching)
  //grunt.registerTask('timestamp', function() {
  //  grunt.log.subhead(Date());
  //});


  //grunt.registerTask('default', ["watch"]);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),



    // delete all the contents of the dist folder
    //clean: ['dist/*'],

    // compile html templates into JS strings that are easy for angular to load
    html2js: {
      app: {
        src: ['src/**/*.tpl.html'],
        dest: 'templates.js',
        module: 'templates.app'
      }
    },

    // Concat our JS, our JS-ified html templates,
    // and any 3rd-party angular libs we're storing locally.
    // Put 'em in the dist folder.
    concat:{
      mainApp:{
        src:['src/**/*.js', 'templates.js'],
        dest:'ti.js'
      }
      //,
      //localAngularLibs: {
      //  src:['vendor/angular/*.js'],
      //  dest: 'dist/angular-libs.js'
      //}
    },


    // compile main.less into CSS, put it in the dist folder
    less: {
      style: {
        files: {
          "main.css": "main.less"
        }
      }
    },


    // watch files, run tasks when they change
    watch:{
      js: {
        files:['src/**/*.js', 'src/**/*tpl.html'],
        tasks:['html2js','concat']
      },
      less: {
        files: ['*.less'],
        tasks: ['less:style']
      },

      // the livereload has to watch ONLY css files, or else it refreshes the
      // whole page instead of doing soft css reload
      css: {
        files: ['main.css'],
        options: {
          livereload: 35727
        }
      }

    }
  });

};