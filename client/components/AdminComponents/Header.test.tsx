import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'
import About from './About'
import '@testing-library/jest-dom'

describe('Header component', () => {
  test('renders header title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    const headerTitle = screen.getByText(
      /Embrace the Art of Flavorful cooking/i
    )
    expect(headerTitle).toBeInTheDocument()
  })

  test('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    const homeLink = screen.getByText('Home')
    const aboutLink = screen.getByText('About')
    const contactLink = screen.getByText('Contact')

    expect(homeLink).toBeInTheDocument()
    expect(aboutLink).toBeInTheDocument()
    expect(contactLink).toBeInTheDocument()
  })

  test('hides about section by default', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    const aboutSection = screen.queryByTestId('about-section')
    expect(aboutSection).toBeNull()
  })
})
