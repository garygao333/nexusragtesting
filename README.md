# Nexus RAG ![Version](https://img.shields.io/badge/version-0.0.0-blue)
Retrieval Augmented Generation model for Clinical Trials

Implementation of RAG with sample clinical trial dataset using ChatGPT 3.5. This is part of the physician-to-physician knowledge sharing platform Hippra. 

Website implementation of Nexus RAG through FastAPI and Vite/React is on the web_testings branch. To start, run the following code in the terminal. 

### Step 1: Create frontend and backend terminal and install all dependencies.

For backend terminal: 
```
cd backend
npm install
```

### Step 2: Run Fast API's backend server.

```
uvicorn main:app --reload --host 127.0.0.1 --port 8000 
```
### Step 3: Run frontend webpage on localhost. 
```
npm run dev
```


