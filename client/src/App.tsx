import { useEffect, useState } from 'react'
import { recipeExamples } from './recipes/mockRecipes'

type Health = {
  api: string
  db: string
}

function App() {
  const [health, setHealth] = useState<Health | null>(null)
  const [error, setError] = useState(false)

  

  useEffect(() => {
    fetch('/api/health')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json() as Promise<Health>
      })
      .then(setHealth)
      .catch(() => setError(true))
  }, [])

  return (
    <main>
      <h1>Ricettario</h1>
      {error && <p>API non raggiungibile</p>}
      {!error && !health && <p>Controllo in corso…</p>}
      {health && <p>API {health.api} | DB {health.db}</p>}
      <h2>Lista Ricette</h2>
      <ul>
        {recipeExamples.map((recipe) => <li key={recipe.id}>{recipe.title}</li> )}
      </ul>
    </main>
  )
}

export default App
