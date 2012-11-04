# grunt-qunit-cov

[Grunt](https://github.com/gruntjs/grunt) plugin for qunit unit test with coverage

## Getting Started

This plugin has two external dependencies, both must be downloaded, extracted and registered in the PATH environment variable:

1. [PhantomJs](http://phantomjs.org/download.html)
2. [JsCoverage](http://siliconforks.com/jscoverage/download.html)

Install the module with: `npm install grunt-unit-cov`

Then load it from your own `grunt.js` file:

```js
grunt.loadNpmTasks('grunt-qunit-cov');
```

## Documentation

This plugin provides one task: `qunit-cov`. It's [multi tasks][types_of_tasks], meaning that grunt will automatically iterate over all `qunit-cov` targets if a target is not specified.

[types_of_tasks]: https://github.com/gruntjs/grunt/blob/master/docs/types_of_tasks.md

### qunit-cov

This is similar to the built-in `qunit` task, though the configuration is different. Here's an example:

```js
"qunit-cov": {
  test:
  {
    minimum: 0.9,
    srcDir: 'src',
    depDirs: ['3rd', 'test', 'css'],
    outDir: 'testResults',
    testFiles: ['test/*.html']
  }
}
```
`minimum` specifies the minimum coverage of all files to task pass, `srcDir` the directory to be instrumented by jscoverage and copied to `outDir`, `depDirs` the dependencies directory list will be copied to `outDir` and `testFiles` parameter is a list of all files to be tested with qunit.

After running there will be a folder called `out` inside the `outDir` specified with coverage.html, which contains the summary of execution and other files of the `srcDir`.

## Contributing

Please use the issue tracker and pull requests.

## License
Copyright (c) 2012 Afonso França
Licensed under the MIT license.
