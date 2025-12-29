# BeyondChats Internship Assignment – MERN Stack

This project automates the enhancement of blog articles by analyzing top-ranking Google search results and improving original content using AI.  
It includes backend APIs, an automation pipeline, and a responsive frontend UI to compare original and AI-updated articles.

---

## 🚀 Tech Stack

- **MongoDB** – Database
- **Express.js** – Backend REST APIs
- **React.js (Vite)** – Frontend UI
- **Node.js** – Backend & Automation
- **Puppeteer** – Dynamic web scraping
- **Google Custom Search API** – Fetching top-ranking articles
- **OpenAI API** – AI-based content rewriting
- **Tailwind CSS** – Modern UI styling

---

## 🧩 Architecture / Data Flow Diagram

```

BeyondChats Blog Page
↓
Puppeteer Scraper
↓
MongoDB (Original Articles)
↓
Express REST APIs
↓
Node Automation Script
├─ Google Search (Top 2 ranking articles)
├─ Content Scraping
├─ AI Content Rewrite (LLM)
↓
MongoDB (Updated Articles + References)
↓
React Frontend
(Original vs Updated Article Comparison)

````

---

## 🔁 Project Flow

1. Scrape the **oldest 5 blog articles** from BeyondChats
2. Store original articles in MongoDB
3. Fetch articles using backend REST APIs
4. Search article titles on Google
5. Scrape top 2 ranking articles from other websites
6. Rewrite original content using AI
7. Save updated content along with references
8. Display original and updated articles on frontend

---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/beyondchats-internship-assignment.git
cd beyondchats-internship-assignment
````

---

### 2️⃣ Backend Setup (Express + MongoDB)

```bash
cd backend
npm install
```

Create a `.env` file inside `backend`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/beyondchats
```

Run backend server:

```bash
node server.js
```

Backend API will run at:

```
http://localhost:5000/api/articles
```

---

### 3️⃣ Scrape BeyondChats Blogs (One Time)

```bash
node scrapeBeyondChats.js
```

This will:

* Open BeyondChats blogs page
* Scrape the oldest articles
* Store them in MongoDB

---

### 4️⃣ Automation Setup (Google Search + AI Rewrite)

```bash
cd ../automation
npm install
```

Create a `.env` file inside `automation`:

```env
API_URL=http://localhost:5000/api/articles
GOOGLE_API_KEY=your_google_api_key
GOOGLE_CX=your_google_search_engine_id
OPENAI_API_KEY=your_openai_api_key
```

Run automation script:

```bash
node index.js
```

This will:

* Fetch articles from backend
* Search titles on Google
* Scrape top 2 ranking articles
* Rewrite content using AI
* Update articles with references

---

### 5️⃣ Frontend Setup (React + Tailwind)

```bash
cd ../frontend
npm install
npm run dev
```

Open browser:

```
http://localhost:5173
```

You can view:

* Original article
* AI-updated article
* Reference links

---

## 🌐 Live Demo

- Frontend: https://your-vercel-live-link.vercel.app
- Backend API: https://beyondchats-internship-assignment-production.up.railway.app/api/articles


---

## ✨ Features

* Automated blog scraping
* AI-based article enhancement
* Google ranking–based content analysis
* Reference citation from external blogs
* Clean and responsive UI
* Comparison view (Original vs Updated)

---

## 📂 Project Structure

```
beyondchats-internship-assignment/
│
├── backend/          # Express backend + MongoDB
├── automation/       # Node automation + AI pipeline
├── frontend/         # React frontend (Tailwind UI)
├── .gitignore
└── README.md
```

---

## 🔐 Security Notes

* Environment variables are excluded from GitHub
* API keys are stored securely using `.env` files
* `.gitignore` prevents sensitive data leaks

---

## 👤 Author

**Daksh Saklecha**
MERN Stack Developer

---

## 📌 Notes for Reviewers

* Commits are made frequently to reflect development progress
* Project follows clean MERN architecture
* UI is optimized for readability and comparison
* Code is modular and easy to extend

````


