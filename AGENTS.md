# Repository guidance for coding agents

## Terminal and setup

- Use a WSL/Ubuntu terminal for commands in this repository. Do not use PowerShell for project commands unless the user explicitly requests it.
- Run npm commands from the directory that owns the relevant `package.json`; there are separate dependency trees in `backend/` and `frontend/`.
- Install dependencies with `npm install` in both `backend/` and `frontend/` when setup is needed. Never commit `node_modules/`, build output, or secrets.
- Read [`README.md`](README.md) for complete setup, MongoDB configuration, API examples, and troubleshooting.
- Keep `backend/.env` private. It must provide `MONGODB_URI`; use `PORT=3001` for local development. Never print, commit, or expose its values.

## Run and verify

- Backend development: from `backend/`, run `npm run dev`.
- Backend production-style start: from `backend/`, run `npm start`.
- Backend lint: from `backend/`, run `npm run lint`.
- Frontend development: from `frontend/`, run `npm run dev`.
- Frontend build: from `frontend/`, run `npm run build`.
- Frontend lint: from `frontend/`, run `npm run lint`.
- Frontend preview: from `frontend/`, run `npm run preview`.
- There is no useful root-level script and no automated test suite currently configured. Do not treat the backend `npm test` placeholder as a passing test command.
- The frontend `npm run server` JSON Server command is legacy; the current app uses Express and MongoDB instead.
- The backend `build:ui` script references an old `part2-notes-frontend` path and Unix copy/remove commands; do not rely on it without first correcting it for this repository.

## Architecture

- Request flow: React UI → Axios in `frontend/src/services/notes.js` → `/api/notes` → Vite proxy → Express → Mongoose → MongoDB.
- Backend entry and app wiring are in `backend/index.js` and `backend/app.js`.
- Notes CRUD routes belong in `backend/controllers/notes.js`; the Mongoose schema and JSON transformation belong in `backend/models/note.js`.
- Frontend state and application behavior belong in `frontend/src/App.jsx`; reusable presentation components belong in `frontend/src/components/`.
- Keep frontend API calls relative to `/api` so the Vite proxy works during development. Do not connect the browser directly to MongoDB.
- Note payloads use `{ content, important }`; note content must be at least five characters.

## Code conventions

- Backend uses CommonJS, single quotes, two-space indentation, LF line endings, and no semicolons. Follow `backend/eslint.config.mjs`.
- Frontend uses ES modules, React hooks, JSX, single quotes, two-space indentation, and no semicolons. Follow `frontend/eslint.config.js`.
- Preserve the existing API response shape, including the model's MongoDB `_id` to `id` JSON conversion, unless a change explicitly requires an API migration.
- After changes, lint the affected package from its own directory and build the frontend when frontend behavior or production assets change.

## Documentation and API checks

- Use [`frontend/notes.rest`](frontend/notes.rest) for current REST Client examples.
- Treat the older backend `.rest` examples as historical if their payloads differ from `{ content, important }`.
- For runtime debugging, inspect browser Network errors and backend logs, then exercise `/api/notes` directly with a WSL-compatible HTTP client such as `curl`.
