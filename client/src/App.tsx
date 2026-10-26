import { useEffect, useState } from 'react'
import { AppHeader } from './components/AppHeader'
import { StatusDots } from './components/StatusDots'
import { RecipeCard } from './recipes/RecipeCard'
import type { Recipe } from './recipes/types'
import './App.css'

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/recipes')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json() as Promise<Recipe[]>
      })
      .then(setRecipes)
      .catch(() => setError(true))
  }, [])

  return (
    <>
      <AppHeader />
      <main className="page">
        <h2 className="section-title">Tutte le ricette</h2>
        {error && <p className="page__message">Impossibile caricare le ricette.</p>}
        <ul className="recipe-list">
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <RecipeCard {...recipe} />
            </li>
          ))}
        </ul>
      </main>
      <StatusDots />
    </>
  )
}

export default App
