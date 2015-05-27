module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);
    grunt.loadNpmTasks("grunt-stripcomments")
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        concat: {
            options: {
                separator: '\r\n'
            },
            library : {
                files: {
                    "dist/awesome-ics.js": ["src/awesome-ics.js"],
                }
            }
        },
        uglify: {
            library: {
                files: {
                    'dist/awesome-ics.min.js': ["dist/awesome-ics.js"]
                }
            }
        },
        comments: {
            js: {
                options: {
                    singleline: true,
                    multiline: true
                },
                src: [ "dist/*.js" ]
            },
            css: {
                options: {
                    singleline: true,
                    multiline: true
                },
                src: [ "dist/*.css" ]
            }
        }
    });
    grunt.registerTask("default", ["concat", "uglify", "comments"]);
};