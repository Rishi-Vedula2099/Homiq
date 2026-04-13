# Homiq — Intelligent Real Estate Simulation Platform

Homiq is a premium, AI-powered real estate platform designed to revolutionize the home-buying and renting experience. Built with a **Dark Luxury** aesthetic, Homiq combines advanced property search, interactive 3D walkthroughs, and intelligent market insights into a single, seamless interface.

---

## 🏗️ Project Architecture

Homiq follows a modern full-stack architecture designed for performance, scalability, and self-hosting.

### 🔥 Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + [ShadCN UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
- **3D Engine**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- **Maps**: [Leaflet](https://leafletjs.com/) with Dark Mode tiles

### ⚡ Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Asynchronous Python)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [PostGIS](https://postgis.net/) for spatial queries
- **ORM**: [SQLAlchemy](https://www.sqlalchemy.org/) (Async) + [GeoAlchemy2](https://geoalchemy-2.readthedocs.io/en/latest/)
- **Migrations**: [Alembic](https://alembic.sqlalchemy.org/en/latest/)
- **Authentication**: JWT (JSON Web Tokens) with Password Hashing
- **File Storage**: [MinIO](https://min.io/) (S3-compatible object storage)
- **Caching/Task Queue**: [Redis](https://redis.io/) + [Celery](https://docs.celeryq.dev/)

---

## ✨ Key Features

### 🔹 Phase 1: Core Platform (MVP)
- **Advanced Navigation**: Premium glassmorphic navigation bar and footer.
- **Property Discovery**: Comprehensive listing page with advanced filters (price, location, amenities).
- **Interactive Maps**: Map-based browsing with custom dark-themed tiles and interactive markers.
- **Property Details**: Deep-dive pages with agent profiles, high-level AI insights, and amenity lists.
- **Auth System**: Role-based authentication (Buyer, Agent, Admin).
- **Communication UI**: Real-time chat interface for user-agent interaction.
- **Schedule Visits**: Integrated booking system for property walkthroughs.

### 🔹 Phase 2: AI Differentiators
- **HomiqAI Chatbot**: Intelligent RAG-powered chatbot for property recommendations and market analysis.
- **AI Insights**: Automated price prediction, ROI estimation, and locality safety/connectivity scores.
- **Smart Search**: Semantic search capabilities (Ollama + FAISS integration ready).

### 🔹 Phase 3: WOW Features
- **3D Interactive Viewer**: Immersive property walkthroughs with:
  - **Furniture Toggle**: Switch between furnished and unfurnished layouts.
  - **Lighting Simulation**: Toggle between Day, Evening, and Night modes.
- **Blueprint-to-3D**: AI-assisted generation of 3D models from 2D floor plans (In Progress).

---

## 📂 Project Structure

```text
Homiq/
├── frontend/         # Next.js 15 Client
│   ├── app/          # App Router (11+ Pages)
│   ├── components/   # UI & Layout components
│   ├── lib/          # API Client & Constants
│   ├── store/        # Zustand State
│   └── types/        # TypeScript Definitions
├── backend/          # FastAPI Server
│   ├── app/          # Core Application logic
│   ├── alembic/      # DB Migrations
│   └── requirements.txt
├── docker/           # Infrastructure Config
│   ├── nginx/        # Reverse Proxy
│   ├── postgres/     # PostGIS DB Init
│   └── docker-compose.yml
└── README.md
```

---

## 🚀 Getting Started

### 1. Requirements
- Node.js 18+
- Python 3.10+
- Docker & Docker Compose

### 2. Infrastructure Setup
```bash
cd docker
docker-compose up -d
```

### 3. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
# Run migrations
alembic upgrade head
# Seed realistic data
python -m app.scripts.seed_data
# Start server
uvicorn app.main:app --reload
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` to see the application.

---

## 🎨 Design Philosophy

Homiq uses a **Dark Luxury** aesthetic:
- **Base**: Deep Navy (`#0a0a0f`)
- **Accent**: Gold (`#d4a853`)
- **Secondary**: Blue Accent (`#3b82f6`)
- **Effects**: Heavy use of glassmorphism (backdrop blur), soft glows, and smooth Framer Motion animations.

