import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'
import GistList from '../src/components/GistList'

describe('GistList Tests', function () {
  beforeEach(function () {

    this.gists = [
      {
        description: 'This is an example description womp',
        files: {
          file1: {
            content: 'var foo = 3'
          },
          file2: {
            content: 'var bar = 4'
          }
        },
      },
      {
        description: 'another description',
        files: {
          file3: {
            content: 'womp'
          },
        },
      },
    ]
  })

  afterEach(function () {

  })

  it('It can render the GistList', function () {
    const wrapper = shallow(<GistList gists={this.gists} />)
    expect(wrapper.find('ListItem')).to.have.length(2)
  })

  it('It shows all gists when the gistFilter is an empty string', function () {
    const wrapper = shallow(<GistList gists={this.gists} gistFilter=''/>)
    expect(wrapper.find('ListItem')).to.have.length(2)
  })

  it('It shows all gists when the gistFilter is not passed in', function () {
    const wrapper = shallow(<GistList gists={this.gists}/>)
    expect(wrapper.find('ListItem')).to.have.length(2)
  })

  it('It can filter the list based on the gistFilter', function () {
    const wrapper = shallow(<GistList gists={this.gists} gistFilter='womp'/>)
    expect(wrapper.find('ListItem')).to.have.length(1)
  })

  it('It can search the contents of the gists when ', function () {
    const wrapper = shallow(<GistList gists={this.gists} gistFilter='womp' searchContents={true}/>)
    expect(wrapper.find('ListItem')).to.have.length(2)
  })

})