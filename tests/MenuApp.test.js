import { expect } from 'chai'
import { shallow } from 'enzyme'
import MenuApp from '../src/components/MenuApp.jsx'
import React from 'react'

describe('MenuApp Tests', function () {
  beforeEach(function () {
  })

  afterEach(function () {
    this.wrapper = null
  })

  it('It renders the gist SearchBox', function () {
    const wrapper = shallow(<MenuApp/>)
    expect(wrapper.find('TextField')).to.have.length(1)
  })

  it('It renders the "Contains" checkbox', function () {
    const wrapper = shallow(<MenuApp/>)
    expect(wrapper.find('[label="Search Contents"]')).to.have.length(1)
  })
})