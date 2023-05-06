import React from 'react'

function MainFeed() {
  // Fetch data and store in state
  const [recipes, setRecipes] = React.useState([])

  React.useEffect(() => {
    // Fetch data from API and store in state
    // Example:
    fetch('/api/recipes')
      .then(response => response.json())
      .then(data => setRecipes(data))
  }, [])

  return (
    <>
      <h2>Main Feed</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default MainFeed
