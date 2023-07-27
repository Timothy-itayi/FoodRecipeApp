// import { render, fireEvent } from '@testing-library/react'
// import '@testing-library/jest-dom'
// import ScrollToTop from './Scroll'

// describe('ScrollToTop component', () => {
//   it('renders properly', () => {
//     const { getByRole } = render(<ScrollToTop />)
//     const buttonElement = getByRole('button')
//     expect(buttonElement).toBeInTheDocument()
//   })

//   it('scrolls to the top of the page when clicked', () => {
//     window.scrollTo = jest.fn()
//     const { getByRole } = render(<ScrollToTop />)
//     const buttonElement = getByRole('button')
//     fireEvent.click(buttonElement)
//     expect(window.scrollTo).toHaveBeenCalledWith({
//       top: 0,
//       behavior: 'smooth',
//     })
//   })
// })
