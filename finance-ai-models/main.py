from fastapi import FastAPI
from pydantic import BaseModel

from predict import clasificar_transaccion

app = FastAPI()

class predictRequest(BaseModel):
    descripcion: str

@app.get("/")
def home():
    return {"message": "Bienvenid@ la API de Finance IA Model funcionando."}

@app.post("/clasificar/")
async def clasificar(transaccion: predictRequest):
    resultado = clasificar_transaccion(transaccion.descripcion)
    return {"categoria": resultado}