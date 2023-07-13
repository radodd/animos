from fastapi import APIRouter, Depends
from models import EventIn, EventOut, EventsList
from queries.events import EventQueries
from bson.objectid import ObjectId

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


@router.get("/api/events", response_model=EventsList)
def get_events(
    repo: EventQueries = Depends()
):
    return EventsList(events=repo.get_list())


@router.delete("/api/events/{id}", response_model=bool)
def delete_event(
    id: str,
    repo: EventQueries = Depends()
):
    return repo.delete({"_id": ObjectId(id)})


@router.put("/api/events/{id}", response_model=EventOut)
async def update_event(
    id: str,
    event: EventIn,
    repo: EventQueries = Depends()
):
    updated_event = repo.update(id, event)
    return updated_event
