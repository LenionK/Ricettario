# Comandi utili

Appunti dei comandi usati nel progetto. Dove non indicato, si lanciano dalla **radice** del repository (`...\Ricettario>`).

---

## Avviare il progetto

Ordine: database → API → frontend.

| Cosa | Comando | Da dove |
|------|---------|---------|
| Avvia il database (in background) | `docker compose up -d db` | radice |
| Controlla che il DB sia pronto (`healthy`) | `docker compose ps` | radice |
| Avvia l'API (http://localhost:5062) | `dotnet run --project Api` | radice |
| Avvia il frontend (http://localhost:5173) | `npm run dev` | `client` |

Per fermare: **Ctrl+C** nei terminali di API e frontend; `docker compose stop db` per il database.

### Indirizzi utili con l'API accesa (solo in sviluppo)
| Cosa | Indirizzo |
|------|-----------|
| Health check | http://localhost:5062/api/health |
| Documentazione OpenAPI (JSON grezzo) | http://localhost:5062/openapi/v1.json |
| Documentazione interattiva (Scalar, dopo averlo installato) | http://localhost:5062/scalar |

---

## Verifiche prima di commit e push

Sono gli stessi controlli della CI.

| Cosa | Comando | Da dove |
|------|---------|---------|
| Linter del frontend (Oxlint) | `npm run lint` | `client` |
| Solo controllo dei tipi TypeScript | `npx tsc -b` | `client` |
| Build del frontend (tipi + Vite) | `npm run build` | `client` |
| Build del backend | `dotnet build Api` | radice |
| Build del backend con l'API accesa (evita il file `Api.exe` bloccato) | `dotnet build Api -c Release` | radice |
| Controllo formattazione C# | `dotnet format Api --verify-no-changes` | radice |
| Sistema la formattazione C# | `dotnet format Api` | radice |

---

## Git

### Stato e storia
| Cosa | Comando |
|------|---------|
| Stato della cartella di lavoro | `git status` |
| Storia compatta | `git log --oneline` |
| Ultimi N commit | `git log --oneline -3` |
| Storia di tutti i branch (anche remoti) | `git log --oneline --all` |
| Differenze non ancora committate | `git diff` |
| Branch locali (`*` = quello attuale) | `git branch` |
| Solo il nome del branch attuale | `git branch --show-current` |

### Lavorare su un branch
| Cosa | Comando |
|------|---------|
| Crea un branch e ci si sposta | `git switch -c feat/US-N-descrizione` |
| Spostati su un branch esistente | `git switch main` |
| Rinomina il branch attuale | `git branch -m nuovo-nome` |
| Prepara file/cartelle per il commit | `git add client` (evitare `git add .` dalla radice) |
| Prova a vuoto: cosa verrebbe aggiunto | `git add --dry-run .` |
| Commit | `git commit -m "feat(US-N): descrizione"` |
| Scarta le modifiche non committate di un file | `git restore percorso/file` ⚠️ irreversibile |

### GitHub
| Cosa | Comando |
|------|---------|
| Primo push di un branch nuovo | `git push -u origin nome-branch` |
| Push successivi | `git push` |
| Scarica le novità del branch attuale | `git pull` |
| Dimentica i branch cancellati su GitHub | `git fetch --prune` |
| Elimina un branch su GitHub | `git push origin --delete nome-branch` |
| Controlla l'indirizzo del remote | `git remote -v` |
| Cambia l'indirizzo del remote | `git remote set-url origin https://github.com/...` |

### Dopo il merge di una PR (squash)
```powershell
git switch main
git pull
git branch -D nome-branch    # -D maiuscola: dopo lo squash serve forzare
```

### Convenzione dei messaggi (Conventional Commits)
`tipo(scope): descrizione` — in inglese, verbo all'imperativo.
- `feat` nuova funzionalità · `fix` correzione · `docs` documentazione
- `chore` configurazione/manutenzione · `ci` pipeline · `style` solo formattazione del codice
- scope = ID della storia, es. `feat(US-2): show recipe cards`

---

## Docker / PostgreSQL

| Cosa | Comando |
|------|---------|
| Avvia il DB | `docker compose up -d db` |
| Stato dei servizi | `docker compose ps` |
| Ferma il DB (i dati restano) | `docker compose stop db` |
| Riavvia il DB fermato | `docker compose start db` |
| Versione di PostgreSQL | `docker compose exec db psql -U ricettario -d ricettario -c "select version();"` |
| Elenco tabelle | `docker compose exec db psql -U ricettario -d ricettario -c "\dt"` |
| Colonne della tabella Recipes | `docker compose exec db psql -U ricettario -d ricettario -c '\d \"Recipes\"'` |
| Righe della tabella Recipes | `docker compose exec db psql -U ricettario -d ricettario -c 'SELECT \"Id\", \"Title\", \"Servings\" FROM \"Recipes\";'` |
| Quante ricette ci sono | `docker compose exec db psql -U ricettario -d ricettario -c 'SELECT COUNT(*) FROM \"Recipes\";'` |
| Ricette senza descrizione | `docker compose exec db psql -U ricettario -d ricettario -c 'SELECT \"Title\" FROM \"Recipes\" WHERE \"Description\" IS NULL;'` |
| Migrazioni applicate | `docker compose exec db psql -U ricettario -d ricettario -c 'SELECT * FROM \"__EFMigrationsHistory\";'` |
| Console interattiva (`\q` per uscire) | `docker compose exec db psql -U ricettario -d ricettario` |

Nota sulle virgolette in PowerShell: i nomi creati da EF Core hanno le maiuscole, quindi in SQL vanno tra virgolette doppie (`"Recipes"`). In PowerShell la query va tra **apici singoli** `'...'` e ogni virgoletta doppia interna si scrive `\"`. Nella console interattiva invece si scrive normalmente: `SELECT * FROM "Recipes";`

### Eseguire un file SQL (es. i dati di prova)
```powershell
docker compose cp db/seed/recipes.sql db:/tmp/recipes.sql
docker compose exec db psql -U ricettario -d ricettario -f /tmp/recipes.sql
```
⚠️ Ogni esecuzione inserisce di nuovo tutte le righe.

---

## Entity Framework Core (migrazioni)

| Cosa | Comando |
|------|---------|
| Installa i tool del manifest (dopo un clone) | `dotnet tool restore` |
| Versione di dotnet-ef | `dotnet ef --version` |
| Crea una migrazione | `dotnet ef migrations add NomeInPascalCase --project Api` |
| Elenco delle migrazioni | `dotnet ef migrations list --project Api` |
| Annulla l'ultima migrazione (se non applicata) | `dotnet ef migrations remove --project Api` |
| Applica le migrazioni al database | `dotnet ef database update --project Api` |

Il messaggio `Failed executing DbCommand ... __EFMigrationsHistory` al **primo** `database update` è normale: conta l'ultima riga (`Done.`).

---

## .NET

| Cosa | Comando |
|------|---------|
| Versione dell'SDK | `dotnet --version` |
| Crea un progetto Web API | `dotnet new webapi -n Api` |
| Aggiungi un pacchetto NuGet | `dotnet add Api package NomePacchetto` |
| Interfaccia web per la documentazione API (Scalar) | `dotnet add Api package Scalar.AspNetCore` |
| Crea il manifest dei tool locali | `dotnet new tool-manifest` |
| Installa un tool locale | `dotnet tool install dotnet-ef` |
| Salva un segreto (es. connection string) | `dotnet user-secrets set "ConnectionStrings:Default" "Host=...;Password=..." --project Api` |
| Elenca i segreti | `dotnet user-secrets list --project Api` |

---

## npm

| Cosa | Comando | Da dove |
|------|---------|---------|
| Crea un progetto Vite + React + TS | `npm create vite@latest client -- --template react-ts` | radice |
| Installa le dipendenze | `npm install` | `client` |
| Installa le versioni esatte del lock (CI) | `npm ci` | `client` |
| Server di sviluppo | `npm run dev` | `client` |
| Esegui un programma del progetto | `npx nome-programma` | `client` |

---

## PowerShell

| Cosa | Comando |
|------|---------|
| Spostati in una cartella | `cd client` |
| Torna alla cartella superiore | `cd ..` |
| Elenco dei file | `Get-ChildItem` (o `ls`) |
| Dove si trova un programma | `Get-Command dotnet` |
| Variabile d'ambiente permanente | `[Environment]::SetEnvironmentVariable("NOME", "valore", "User")` |
| Copia un file | `Copy-Item .env.example .env` |
