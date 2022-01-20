import React from 'react'
import _ from 'lodash'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


describe('Test adding a new blog', () => {
  let component
  const mockAddBlog = jest.fn()
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Testi Testinen',
    url: 'www.testi.fi'
  }

  beforeEach(() => {

    component = render(
      <BlogForm user={{}} addBlog={mockAddBlog}/>
    )

  })

  test('Adding blog calls handler with correct information', () => {
    const inputs = {
      title: component.container.querySelector('#title'),
      author: component.container.querySelector('#author'),
      url: component.container.querySelector('#url')
    }

    _.forEach(inputs, (input, key) => {
      fireEvent.change(input, {
        target: { value: blog[key] }
      })
    })

    const submitButton = component.getByText('Add new')
    fireEvent.click(submitButton)

    expect(mockAddBlog).toHaveBeenCalledTimes(1)
    expect(mockAddBlog).toHaveBeenCalledWith({ ...blog, user: undefined })

  })
})
