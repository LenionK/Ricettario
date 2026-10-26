import { AppHeader } from './components/AppHeader'
import { StatusDots } from './components/StatusDots'
import { recipeExamples } from './recipes/mockRecipes'
import { RecipeCard } from './recipes/RecipeCard'
import './App.css'

function App() {
  return (
    <>
      <AppHeader recipeCount={recipeExamples.length} />
      <main className="page">
        <h2 className="section-title">Tutte le ricette</h2>
        <ul className="recipe-list">
          {recipeExamples.map((recipe) => (
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
