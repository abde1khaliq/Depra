from ast import main
from fastapi import FastAPI
from api.login_route.endpoints import router as login_router
from api.register_route.endpoints import router as register_router
import uvicorn

title = "Deprecation Enforcement Proxy for retired APIs (DEPRA)"

description = """
Let's say a company by the name Payd built POST /v1/charge 3 years ago,
It accepted raw card numbers - a security liability.
They built POST /v2/charge as the proper replacement.
But they have around 340 clients that still use the /v1 endpoint and they have no idea who exactly is calling it,
how often or who to warn. So v1 just sits there forever. Unmaintained. Dangerous. Untouchable.
"""

summary= """
A proxy-based backend system that sits between any API Company and their clients,
It intercepts all traffic, tracks who calls what, warns consumers before deprecated endpoints die,
and enforces hard cutoffs automatically. The API Company configures it once and the system runs itself.
"""

app = FastAPI(title=title, description=description, summary=summary, version='v1.0')
app.include_router(login_router, prefix="/auth", tags=['Authentication'])
app.include_router(register_router, prefix="/auth", tags=['Authentication'])

if __name__ == "__main__":
    uvicorn.run('main:app', port=8000, reload=True)