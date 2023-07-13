// import '@testing-library/jest-dom/extend-expect'
// import { render, screen } from '@testing-library/react'
// import Footer from './Footer'

// declare global {
//   namespace jest {
//     interface Matchers<R> {
//       toHaveClass(className: string): R
//     }
//   }
// }

// test('renders footer text', () => {
//   render(<Footer />)
//   const footerText = screen.getByText(/© 2023 MyWebsite. All rights reserved./i)
//   expect(footerText).toBeTruthy()
// })

// test('footer contains the correct copyright year', () => {
//   render(<Footer />)
//   const currentYear = new Date().getFullYear()
//   const expectedText = `© ${currentYear} MyWebsite. All rights reserved.`
//   const footerText = screen.getByText(new RegExp(expectedText, 'i'))
//   expect(footerText).toBeTruthy()
// })

// test('footer has the correct class', () => {
//   render(<Footer />)
//   const footerElement = screen.getByRole('footer')
//   expect(footerElement).toHaveClass('footer-container')
// })
