module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);
    grunt.loadNpmTasks("grunt-babel")
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        babel: {
            options: {
                sourceMap: false
            },
            dist: {
                files: {
                    "dist/awesome-ics.js"        : "src/es6/awesome-ics.js",
                    "dist/block.js"              : "src/es6/block.js",
                    "dist/property.js"           : "src/es6/property.js",
                    "dist/property-parameter.js" : "src/es6/property-parameter.js",
                    "dist/property-value.js"     : "src/es6/property-value.js",
                    "dist/constants.js"          : "src/es6/constants.js",
                    "dist/util.js"               : "src/es6/util.js"
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
            }
        }
    });
    grunt.registerTask("default", [ "babel" ]);
    grunt.registerTask("old", ["concat", "comments"])
};