module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);

    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks("grunt-jasmine-nodejs");

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        babel: {
            options: {
                sourceMap: false
            },
            dist: {
                files: {
                    "dist/util.js"               : "src/util.js",
                    "dist/property-value.js"     : "src/property-value.js",
                    "dist/property-parameter.js" : "src/property-parameter.js",
                    "dist/property.js"           : "src/property.js",
                    "dist/block.js"              : "src/block.js",
                    "dist/awesome-ics.js"        : "src/awesome-ics.js"
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
        },
        jasmine_nodejs: {
            src: [ "dist/*.js" ],

            options: {
                specNameSuffix: "spec.js",
                topOnFailure: false,
                // configure one or more built-in reporters
                reporters: {
                    console: {
                        colors: true,
                        cleanStack: 1,       // (0|false)|(1|true)|2|3
                        verbosity: 4,        // (0|false)|1|2|3|(4|true)
                        listStyle: "indent", // "flat"|"indent"
                        activity: false
                    }
                }
            },
            your_target: {
                // target specific options
                options: {
                    useHelpers: true
                },
                // spec files
                specs: [
                    "spec/**",
                    "test/core/**"
                ]
            }
        }
    });

    grunt.registerTask("default", [ "build" ]);
    grunt.registerTask("build", [ "babel", "comments" ]);
    grunt.registerTask("test", [ "jasmine_nodejs" ]);
    grunt.registerTask("publish", [ "build", "test" ]);
};