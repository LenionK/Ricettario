import { BowlIcon, PlusIcon } from './icons'
import './AppHeader.css'



export function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <span className="app-header__logo">
          <BowlIcon size={22} />
        </span>
        <span className="app-header__name">Ricettario</span>
      </div>

      <h1 className="app-header__title">Le tue ricette</h1>

      <button type="button" className="app-header__button">
        <PlusIcon size={20} />
        Nuova ricetta
      </button>
    </header>
  )
}
