# Ricettario – Backlog

## Visione

Un'app web per salvare le proprie ricette, pianificare i pasti della settimana e generare
automaticamente la lista della spesa, con gli ingredienti uguali sommati.

**Stack:** ASP.NET Core Web API (C#, .NET 10) + React (Vite, TypeScript) + PostgreSQL, tutto in Docker Compose.

## Definition of Done

Una storia è "fatta" quando:

- funziona end-to-end: pagina React → API → database;
- è stata provata a mano nell'app avviata con `docker compose up --build`;
- l'app si compila senza errori (backend e frontend);
- le eventuali modifiche al database sono in una migrazione EF Core;
- il codice è committato su Git con un messaggio che cita la storia (es. `US-1: ...`);
- questo backlog è aggiornato (storia segnata come completata).

## Backlog

### Epic 1 – Ricette

| ID   | Storia | Stato |
|------|--------|-------|
| US-1 | Come utente voglio **creare una ricetta** (titolo, descrizione, porzioni) per salvarla. | Da fare |
| US-2 | Come utente voglio **vedere l'elenco delle mie ricette** per ritrovarle. | Fatto (#3) |
| US-3 | Come utente voglio **modificare ed eliminare una ricetta** per tenerla aggiornata. | Da fare |
| US-4 | Come utente voglio aggiungere **ingredienti** (nome, quantità, unità) a una ricetta. | Da fare |
| US-5 | Come utente voglio aggiungere i **passaggi** di preparazione in ordine. | Da fare |
| US-6 | Come utente voglio **cercare** una ricetta per nome o ingrediente. | Da fare |
| US-7 | Come utente voglio assegnare dei **tag** (es. "vegetariano", "veloce") e filtrare per tag. | Da fare |

### Epic 2 – Piano pasti

| ID    | Storia | Stato |
|-------|--------|-------|
| US-8  | Come utente voglio **assegnare una ricetta a un giorno e a un pasto** (colazione, pranzo, cena). | Da fare |
| US-9  | Come utente voglio vedere il piano in un **calendario settimanale**. | Da fare |
| US-10 | Come utente voglio **scalare le porzioni** di una ricetta nel piano. | Da fare |

### Epic 3 – Lista della spesa

| ID    | Storia | Stato |
|-------|--------|-------|
| US-11 | Come utente voglio **generare la lista della spesa** dal piano della settimana. | Da fare |
| US-12 | Come utente voglio che gli **ingredienti uguali vengano sommati** (stessa unità). | Da fare |
| US-13 | Come utente voglio **spuntare le voci acquistate**. | Da fare |
| US-14 | Come utente voglio aggiungere **voci manuali** alla lista. | Da fare |

### Epic 4 – Account

| ID    | Storia | Stato |
|-------|--------|-------|
| US-15 | Come visitatore voglio **registrarmi** con email e password. | Da fare |
| US-16 | Come utente voglio fare **login** e logout. | Da fare |
| US-17 | Come utente voglio che **ricette, piano e lista siano privati** e visibili solo a me. | Da fare |

## Sprint

### Sprint 0 – Setup (in corso)

Obiettivo: scheletro funzionante React → API → PostgreSQL in Docker Compose, con pagina che mostra "API ok | DB ok".

Ancora da fare: Dockerfile di API e client, nginx, avvio completo con `docker compose up --build`, tag `v0.1.0`.

### Sprint 1 – Prime ricette (in corso)

Storie: **US-1, US-2, US-3** (creare, elencare, modificare/eliminare ricette), senza login.

- [x] US-2 – elenco ricette (PR #3)
- [ ] US-1 – creare una ricetta
- [ ] US-3 – modificare ed eliminare una ricetta

Idee emerse durante lo sprint (da pianificare):
- filtro "Tutte le ricette" per categoria/tag, collegato a **US-7**;
- pulsante "Nuova ricetta" fisso in basso al centro;
- stato di caricamento nella pagina dell'elenco.
