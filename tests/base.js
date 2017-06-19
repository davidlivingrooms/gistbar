const Application = require('spectron').Application
const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

let appPath = path.join(__dirname, '..', 'Gistbar-darwin-x64', 'Gistbar.app', 'Contents', 'MacOS', 'Gistbar')

if (process.platform === 'win32') {
  appPath += '.cmd'
}

const app = new Application({
  path: appPath,
})

global.before(function () {
  chai.should()
  chai.use(chaiAsPromised)
})

describe('Base Tests', function () {
  beforeEach(function () {
    return app.start()
  })

  afterEach(function () {
    return app.stop()
  })

  it('opens a window', function () {
    return app.client.waitUntilWindowLoaded()
      .getWindowCount().should.eventually.equal(1)
  })
})