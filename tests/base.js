import Spectron from 'spectron'
import path from 'path'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

let appPath = path.join(__dirname, '..', 'Gistbar-darwin-x64', 'Gistbar.app', 'Contents', 'MacOS', 'Gistbar')

if (process.platform === 'win32') {
  appPath += '.cmd'
}

const app = new Spectron.Application({
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