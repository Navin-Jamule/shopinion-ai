# 🛒 Shopinion AI 

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Selenium](https://img.shields.io/badge/Selenium-43B02A?style=for-the-badge&logo=selenium&logoColor=white)](https://www.selenium.dev/)
[![HuggingFace](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-Models-orange?style=for-the-badge)](https://huggingface.co/)

**Shopinion AI** is an intelligent e-commerce assistant that uses Aspect-Based Sentiment Analysis (ABSA) to summarize thousands of product reviews into a concise list of the **Top 5 Pros and Cons**. Instead of scrolling through endless pages of comments, Shopinion provides a data-driven snapshot of product quality.

---

## 🏗️ System Architecture & Workflow

The project consists of a modern React frontend and a powerful Python-based processing engine.

```mermaid
graph TD
    User((User)) -->|Inputs Product URL| React[React Frontend]
    React -->|API Request| API[FastAPI Backend]
    
    subgraph "AI Processing Engine"
    API -->|Launch| Scraper[Selenium Scraper]
    Scraper -->|Extract Reviews| Models{Transformer Models}
    Models -->|Sentiment| R[RoBERTa]
    Models -->|Context| D[DeBERTa]
    
    R & D -->|Feature Scoring| Logic[+1 / -1 Aggregator]
    Logic -->|Filter| Top5[Top 5 Pros/Cons]
    end
    
    Top5 --> API
    API -->|JSON Response| React
    React -->|UI Update| User
```
## 🚀 Key Features

### 🔗 URL-to-Insight
Paste an e-commerce product URL to trigger deep sentiment analysis across user reviews.

### 🧠 Dual Transformer Pipeline
- **RoBERTa** – High-accuracy sentiment classification (Positive / Negative / Neutral)
- **DeBERTa** – Superior understanding of complex context and sentence structure

### 🧩 Aspect-Based Sentiment Analysis (ABSA)
Identifies sentiment for specific product aspects such as:
- Battery Life
- Screen Quality
- Build Quality

### 📊 Intelligent Scoring Logic
- Positive mention → **+1**
- Negative mention → **-1**

Scores are aggregated across hundreds of reviews to surface top **strengths and weaknesses**.

### 🌐 Dynamic Web Scraping
Uses **Selenium** to handle dynamic content and fetch the latest reviews in real time.

---

## 🛠️ Tech Stack

### Frontend (This Repository)
- **Framework:** React.js  
- **Styling:** Tailwind CSS  
- **Icons:** Lucide React  
- **HTTP Client:** Axios  

### Backend (Shopinion-AI-Backend)
- **Language:** Python 3.9+  
- **Framework:** FastAPI  
- **Scraping:** Selenium WebDriver  
- **AI Models:** Hugging Face Transformers  
  - `cardiffnlp/twitter-roberta-base-sentiment`
  - `microsoft/deberta-v3-base`

---

## 🚀 Installation & Local Setup

### 1️⃣ Setup Backend
The backend acts as the AI engine.

**Backend Repository:**  
https://github.com/Navin-Jamule/shopinion-ai-backend

```bash
git clone https://github.com/Navin-Jamule/shopinion-ai-backend.git
cd shopinion-ai-backend
pip install -r requirements.txt
uvicorn main:app --reload
