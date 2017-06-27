import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import MenuApp from '../../src/components/MenuApp'
import RootStore from '../../src/stores/RootStore'

describe('MenuApp Tests', function () {
  beforeEach(function () {
    this.rootStore = new RootStore()
  })

  afterEach(function () {
    this.wrapper = null
  })

  it('It renders the gist SearchBox', function () {
    const wrapper = shallow(<MenuApp.wrappedComponent rootStore={this.rootStore} />)
    expect(wrapper.find('TextField')).to.have.length(1)
  })

  it('It renders the "Contains" checkbox', function () {
    const wrapper = shallow(<MenuApp.wrappedComponent rootStore={this.rootStore} />)
    expect(wrapper.find('[label="Search Contents"]')).to.have.length(1)
  })
})