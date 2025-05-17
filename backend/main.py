import os
import shutil
import nltk
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from langchain_community.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain.prompts import ChatPromptTemplate

load_dotenv()
os.environ['OPENAI_API_KEY'] = os.getenv("OPENAI_API_KEY")

app = FastAPI()

#This is used to set up the middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

nltk.download('punkt')
DATA_PATH = "../public/dataset"  
CHROMA_PATH = "./chromafolder"

class QueryRequest(BaseModel):
    question: str

PROMPT_TEMPLATE = """
Answer the question based only on the following context:

{context}

---

Answer the question based on the above context: {question}
"""

def generate_data_store():
    documents = load_documents()
    chunks = split_text(documents)
    save_to_chroma(chunks)

def load_documents():
    loader = DirectoryLoader(DATA_PATH, glob="*.md")
    documents = loader.load()
    return documents

def split_text(documents: list[Document]):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=300,
        chunk_overlap=100,
        length_function=len,
        add_start_index=True,
    )
    chunks = text_splitter.split_documents(documents)
    print(f"Split {len(documents)} documents into {len(chunks)} chunks.")
    return chunks

def save_to_chroma(chunks: list[Document]):
    if os.path.exists(CHROMA_PATH):
        shutil.rmtree(CHROMA_PATH)
    db = Chroma.from_documents(
        chunks, OpenAIEmbeddings(), persist_directory=CHROMA_PATH
    )
    db.persist()
    print(f"Saved {len(chunks)} chunks to {CHROMA_PATH}.")

generate_data_store()

# These are the API endpoints/routes that will be called in the frontend program. 
@app.post("/ask")
async def ask_question(request: QueryRequest):
    query_text = request.question

    embedding_function = OpenAIEmbeddings()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    results = db.similarity_search_with_relevance_scores(query_text, k=1)
    if len(results) == 0 or results[0][1] < 0.1:
        return {"response": "No relevant results found.", "sources": []}

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)

    model = ChatOpenAI()
    response_text = model.predict(prompt)

    sources = [doc.metadata.get("source", None) for doc, _score in results]
    return {"response": response_text, "sources": sources}
