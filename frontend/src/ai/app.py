import sys
import json
from langchain_pinecone import PineconeVectorStore
from langchain_groq import ChatGroq
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from src.prompt import *
from src.helper import download_hugging_face_embeddings
import os

load_dotenv()

PINECONE_API_KEY = os.environ.get('PINECONE_API_KEY')
GROQ_API_KEY = os.environ.get('GROQ_API_KEY')

os.environ["PINECONE_API_KEY"] = PINECONE_API_KEY
os.environ["GROQ_API_KEY"] = GROQ_API_KEY

embeddings = download_hugging_face_embeddings()

index_name = "mentalhealth"

docsearch = PineconeVectorStore.from_existing_index(
     index_name=index_name,
     embedding=embeddings
)

retriever = docsearch.as_retriever(search_type="similarity", search_kwargs={"k": 3})

llm = ChatGroq(api_key=GROQ_API_KEY, temperature=0.4, max_tokens=500)
prompt = ChatPromptTemplate.from_messages(
     [
          ("system", system_prompt),
          ("human", "{input}"),
     ]
)

question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)

def api_chat(input):
     msg = input
     
     combined_prompt = ChatPromptTemplate.from_messages(
          [("system", system_prompt), ("human", msg)]
     )
     
     question_answer_chain = create_stuff_documents_chain(llm, combined_prompt)
     rag_chain = create_retrieval_chain(retriever, question_answer_chain)
     
     response = rag_chain.invoke({"input": msg})
     
     return json.dumps({'answer': response['answer']})

if __name__ == "__main__":
    input_text = sys.argv[1]
    result = api_chat(input_text)
    print(result)
