// import { render } from '@testing-library/react'
// import { IfAuthenticated } from './Authenticated'
// import { useAuth0 } from '@auth0/auth0-react'
// import '@testing-library/jest-dom/extend-expect'

// jest.mock('@auth0/auth0-react', () => ({
//   useAuth0: () => ({
//     isAuthenticated: true,
//     isLoading: false,
//   }),
// }))
// test('checks if user is authenticated', () => {
//   const { getByText } = render(
//     <IfAuthenticated>
//       <div>Authenticated Content</div>
//     </IfAuthenticated>
//   )

//   expect(getByText('Authenticated Content')).toBeTruthy()
// })
