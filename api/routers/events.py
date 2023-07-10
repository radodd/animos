from fastapi import APIRouter, Depends
from models import EventIn, EventOut
from queries.events import EventQueries
from bson import ObjectId

router = APIRouter()


@router.post("/api/events", response_model=EventOut)
def create_event(
    event: EventIn,
    repo: EventQueries = Depends()
):
    event = repo.create(event)
    return event


@router.get("/api/events/{id}", response_model=EventOut)
def get_event(
    id: str,
    repo: EventQueries = Depends()
):
    event = repo.get({"_id": ObjectId(id)})
    return event
