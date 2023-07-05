import { render, screen } from '@testing-library/react'
import About from './About'

describe('About component', () => {
  test('renders the about content', () => {
    render(<About />)

    // Assert that the About component content is rendered correctly
    expect(screen.getByText('About Flavorful Recipes')).toBeTruthy()
    expect(
      screen.getByText(
        'Flavorful Recipes is a platform dedicated to embracing the art of flavorful cooking. We believe that food brings people together and that every meal should be an enjoyable experience for everyone.'
      )
    ).toBeTruthy()
    expect(
      screen.getByText(
        "Our community of everyday people shares their passion for cooking and explores unique and delicious ingredients to create culinary delights. Whether you're a seasoned chef or just starting your culinary journey, Flavorful Recipes provides inspiration, tips, and recipes to help you elevate your cooking skills and bring mouthwatering flavors to your table."
      )
    ).toBeTruthy()
    expect(
      screen.getByText(
        'Join our community today and unlock a world of flavors as you discover new recipes, share your own creations, and connect with fellow food enthusiasts. Embrace the art of flavorful cooking with Flavorful Recipes!'
      )
    ).toBeTruthy()
  })
})
