import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import accounts, events, pets, auth
# from routers.users import user_api_router
from routers.locations import location_api_router
# from authenticator import authenticator


app = FastAPI()
# app.include_router(user_api_router)
app.include_router(location_api_router)
# app.include_router(authenticator.router)
# app.include_router(accounts.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.authenticator.router)
app.include_router(accounts.router)
app.include_router(events.router)
app.include_router(pets.router)
