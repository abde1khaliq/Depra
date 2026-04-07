# payd_api.py
from fastapi import FastAPI

app = FastAPI(title="Payd API Simulation")


@app.post("/v1/charge")
async def charge_v1(card: dict):
    # Deprecated endpoint
    return {"message": "Processed via v1 (deprecated)", "card": card}


@app.post("/v2/charge")
async def charge_v2(card: dict):
    # Active endpoint
    return {"message": "Processed via v2 (active)", "card": card}
