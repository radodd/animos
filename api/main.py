import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import accounts, events, pets, auth, locations


app = FastAPI()


@app.get("/")
def root():
    return {"message": "You hit the root path!"}


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
app.include_router(locations.location_api_router)
