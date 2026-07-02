# Octofit Tracker Frontend

React 19 + Vite presentation tier for the Octofit Tracker multi-tier application.

## Environment

Codespaces API URLs are built from `VITE_CODESPACE_NAME`. Define it in `octofit-tracker/frontend/.env.local` when running in Codespaces:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, components call endpoints such as:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/
```

When it is unset, the frontend safely falls back to `http://localhost:8000/api/...` so it never creates `https://undefined-8000...` URLs.
