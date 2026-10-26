import type { Recipe } from './types'
import { BowlIcon, UsersIcon } from '../components/icons'
import './RecipeCard.css'

const THUMB_TONES = ['sage', 'mustard', 'peach']

export function RecipeCard({ id, title, description, servings }: Recipe) {
  const tone = THUMB_TONES[id % THUMB_TONES.length]

  return (
    <article className="recipe-card">
      <div className={`recipe-card__thumb recipe-card__thumb--${tone}`}>
        <BowlIcon size={40} />
      </div>
      <div className="recipe-card__body">
        <h3 className="recipe-card__title">{title}</h3>
        {description ? (
          <p className="recipe-card__description">{description}</p>
        ) : (
          <p className="recipe-card__description recipe-card__description--empty">
            Nessuna descrizione
          </p>
        )}
        <span className="recipe-card__servings">
          <UsersIcon size={14} />
          {servings} {servings === 1 ? 'porzione' : 'porzioni'}
        </span>
      </div>
    </article>
  )
}
