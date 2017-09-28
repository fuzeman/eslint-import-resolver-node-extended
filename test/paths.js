var expect = require('chai').expect

var path = require('path')
var node = require('../index.js')

describe("paths", function () {
  it("handles base path relative to CWD", function () {
    expect(node.resolve('../', './test/file.js'))
      .to.have.property('path')
      .equal(path.resolve(__dirname, '../index.js'))
  })

  it("handles aliases", function () {
    var config = {
      alias: {
        'example': path.resolve(__dirname, './data'),
      },
    }

    expect(node.resolve('example', './test/file.js', config))
      .to.have.property('path')
      .equal(path.resolve(__dirname, './data.json'))
  })
})

describe("default options", function () {
  it("finds .json files", function () {
    expect(node.resolve('./data', './test/file.js'))
      .to.have.property('path')
      .equal(path.resolve(__dirname, './data.json'))
  })

  it("ignores .json files if 'extensions' is redefined", function () {
    expect(node.resolve('./data', './test/file.js', { extensions: ['.js'] }))
      .to.have.property('found', false)
  })
})
