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
                    "dist/awesome-ics.js"        : "src/awesome-ics.js",
                    "dist/block.js"              : "src/block.js",
                    "dist/property.js"           : "src/property.js",
                    "dist/property-parameter.js" : "src/property-parameter.js",
                    "dist/property-value.js"     : "src/property-value.js",
                    "dist/util.js"               : "src/util.js"
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
};