import { BowlIcon, PlusIcon } from './icons'
import './AppHeader.css'

type AppHeaderProps = {
  recipeCount: number
}

export function AppHeader({ recipeCount }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <span className="app-header__logo">
          <BowlIcon size={22} />
        </span>
        <span className="app-header__name">Ricettario</span>
      </div>

      <h1 className="app-header__title">Le tue ricette</h1>
      <p className="app-header__count">
        {recipeCount} {recipeCount === 1 ? 'ricetta salvata' : 'ricette salvate'}
      </p>

      <button type="button" className="app-header__button">
        <PlusIcon size={20} />
        Nuova ricetta
      </button>
    </header>
  )
}
