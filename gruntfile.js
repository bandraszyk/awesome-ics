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
                    "src/es5/awesome-ics.js": "src/es6/awesome-ics.js",
                    "src/es5/block.js"      : "src/es6/block.js",
                    "src/es5/property.js"   : "src/es6/property.js",
                    "src/es5/constants.js"  : "src/es6/constants.js",
                    "src/es5/util.js"       : "src/es6/util.js"
                }
            }
        },
        concat: {
            options: {
                separator: '\r\n'
            },
            library : {
                files: {
                    "dist/awesome-ics.js": ["src/awesome-ics.js",
                                            "src/constants.js",
                                            "src/util.js",
                                            "src/calendar.js",
                                            "src/block.js",
                                            "src/property.js",
                                            "src/property.parameter.js",
                                            "src/property.value.js"]
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
    grunt.registerTask("default", ["babel"]);
    grunt.registerTask("old", ["concat", "uglify", "comments"])
};