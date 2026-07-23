# SOLIDCORE ATS — Promotional Portal

Master promotional website for **SOLIDCORE ATS** (Athlete Training Seminary) and its flagship
product **SOLIDCORE AMS** (Athlete Monitoring System). All copy comes from the ATS factsheet.

| Layer    | Stack              | Port  |
| -------- | ------------------ | ----- |
| Frontend | Vite + React       | 5173  |
| Backend  | Node + Express 5   | 5001  |
| Database | MongoDB (Mongoose) | 27017 |

Support: **support@solidcoreats.com**

## Running

Three processes. Start MongoDB first.

**1. MongoDB** (`--fork` is unsupported on macOS — leave this in its own terminal)

```bash
/Users/apple/mongodb-macos-aarch64--8.3.4/bin/mongod --dbpath /Users/apple/data/db
```

**2. Backend**

```bash
cd backend
npm install
npm run seed     # one-time: loads factsheet content into MongoDB
npm start        # or: npm run dev
```

Prints on success:

```
✅ MongoDB connected successfully
   host: 127.0.0.1  db: solidcore_ats
🚀 SOLIDCORE ATS API listening on http://localhost:5001
```

**3. Frontend**

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
```

## The logo

The site looks for the official artwork at:

```
frontend/public/logo.png
```

Drop the file there and every placement — header, footer, app section — picks it up on reload, no
code change needed. Use a **transparent PNG**: the header and panels sit on slightly different
darks, so a baked-in background shows as a visible rectangle.

Until that file exists, [Logo.jsx](frontend/src/components/Logo.jsx) falls back to a layered vector
interpretation of the infinity mark (gunmetal ribbon, chrome edge, teal core, travelling
specular). The fallback is a stand-in, not the real brand asset.

## Checking the database connection

Connection status is deliberately **not** shown on the public page — it would expose the database
host and name to visitors. Check it either way below.

Backend terminal, on startup:

```
✅ MongoDB connected successfully
   host: 127.0.0.1  db: solidcore_ats
```

Or query the health endpoint any time:

```bash
curl -s localhost:5001/api/health
# {"status":"ok","database":{"connected":true,"message":"MongoDB connected successfully",...}}
```

Disconnects and reconnects are logged live to the same terminal.

## API

| Method | Route           | Purpose                                                             |
| ------ | --------------- | ------------------------------------------------------------------- |
| GET    | `/api/health`   | Server + database state (for your own checks; not surfaced in the UI) |
| GET    | `/api/features` | Factsheet content; `?category=pillar\|capability\|ecosystem\|value` |
| POST   | `/api/leads`    | Submit a contact enquiry                                            |
| GET    | `/api/leads`    | 50 most recent enquiries                                            |

CORS accepts any loopback/LAN origin in dev, so `localhost`, `127.0.0.1` and a machine IP all work.
Set `CLIENT_ORIGIN` (comma-separated) to pin specific origins for production.

## Configuration

`backend/.env`

```
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/solidcore_ats
CLIENT_ORIGIN=http://localhost:5173
```

`frontend/.env`

```
VITE_API_URL=http://localhost:5001
```

## Structure

```
backend/
  src/
    config/db.js      Mongoose connection + live state for /api/health
    models/           Feature, Lead
    routes/           health, features, leads
    seed.js           Loads factsheet content
    server.js
frontend/
  src/
    components/
      Logo.jsx        Official PNG with layered-vector fallback
      art.jsx         All content artwork (see below)
      Reveal.jsx      Scroll reveal + CountUp
      ContactForm.jsx
    constants.js      Support email, site URL
    App.jsx
```

### Artwork

Every illustration in [art.jsx](frontend/src/components/art.jsx) draws real AMS subject matter
rather than decorative filler, and animates when scrolled into view:

| Component        | Shows                                                     |
| ---------------- | --------------------------------------------------------- |
| `HeroVisual`     | Athlete app logging a session, with live data orbiting it |
| `ACWRGauge`      | Acute:Chronic Workload Ratio sweeping into the optimal band |
| `LoadSplit`      | Bowling / batting / fielding tracked apart from S&C        |
| `WellnessRadar`  | Daily check-in across sleep, fatigue, soreness, stress, mood |
| `DualInterface`  | Athlete mobile app syncing to the admin web dashboard      |
| `ExportArt`      | PDF / CSV / API export cards                               |
| `AppleBadge` `PlayBadge` | "Coming soon" App Store and Google Play badges     |

Motion respects `prefers-reduced-motion` — all animation collapses for users who ask for it.
