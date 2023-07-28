from fastapi import APIRouter, Depends
from models import EventIn, EventOut, EventsList, AttendEvent
from queries.events import EventQueries
from queries.accounts import AccountQueries
from bson.objectid import ObjectId

router = APIRouter()


@router.post("/api/events", response_model=EventOut)
def create_event(
    event: EventIn,
    repo: EventQueries = Depends(),
    account_repo: AccountQueries = Depends(),
):
    event = repo.create(event)
    account_repo.add_hosting(event)
    return event


@router.get("/api/events/{id}", response_model=EventOut)
def get_event(id: str, repo: EventQueries = Depends()):
    event = repo.get({"_id": ObjectId(id)})
    return event


@router.get("/api/events", response_model=EventsList)
def get_events(repo: EventQueries = Depends()):
    return EventsList(events=repo.get_list())


@router.delete("/api/events/{id}", response_model=bool)
def delete_event(
    id: str,
    remove_obj: AttendEvent,
    event_repo: EventQueries = Depends(),
    account_repo: AccountQueries = Depends(),
):
    deleted_event = event_repo.delete({"_id": ObjectId(id)})
    account_repo.remove_hosted_event(remove_obj)
    return deleted_event


@router.put("/api/events/{id}", response_model=EventOut)
async def update_event(
    id: str, event: EventIn, repo: EventQueries = Depends()
):
    updated_event = repo.update(id, event)
    return updated_event


@router.put("/api/events/attending")
async def attend_this_event(
    attend_info: AttendEvent,
    event_repo: EventQueries = Depends(),
    account_repo: AccountQueries = Depends(),
):
    event_repo.add_attendee(attend_info)
    account_repo.add_attending(attend_info)
    return True
