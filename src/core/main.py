from fastapi import FastAPI

from core.api.auth.login_route.endpoints import router as login_router
from core.api.auth.register_route.endpoints import router as register_router

title = "DEPRA - Deprecation Enforcement Proxy for retired APIs"

description = """
The Core problem it solves -> Let's say a company by the name Payd built POST /v1/charge 3 years ago,
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

app = FastAPI(title=title, description=description, summary=summary)
app.include_router(login_router, prefix="/auth", tags=['authentication'])
app.include_router(register_router, prefix="/auth", tags=['authentication'])