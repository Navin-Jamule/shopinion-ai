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



