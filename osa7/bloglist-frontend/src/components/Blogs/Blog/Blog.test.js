import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('test rendering and button functionality', () => {
  let component
  const mockLikeHandler = jest.fn()
  const mockDeleteHandler = jest.fn()
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Testi Testinen',
    url: 'www.testi.fi',
    likes: 0,
    user: {
      id: '61c08bcbf79dabb1749d848e',
      username: 'tiinateekkari',
      name: 'Teemu'
    }
  }

  beforeEach(() => {

    component = render(
      <Blog blog={blog}handleLike={mockLikeHandler} handleDelete={mockDeleteHandler}/>
    )

  })

  test('renders content', () => {

    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent(
      'Testi Testinen'
    )
  })

  test('clicking view button makes all the info visible', () => {

    const button = component.getByText('view')
    fireEvent.click(button)

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)

    const expectedContent = [
      blog.title,
      blog.author,
      blog.url,
      blog.user.name,
      'Likes',
      'hide',
      'Delete'
    ]

    expectedContent.forEach(content => {
      expect(component.container).toHaveTextContent(content)
    })

  })

  test('clicking like calls function', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLikeHandler).toHaveBeenCalledTimes(2)
  })
})
