from fastapi import APIRouter, Depends
from models import EventIn, EventOut, EventsList, AttendEvent
from queries.events import EventQueries
from queries.accounts import AccountQueries
from bson.objectid import ObjectId
from .auth import authenticator

router = APIRouter()


@router.post("/api/events", response_model=EventOut)
def create_event(
    event: EventIn,
    repo: EventQueries = Depends(),
    account_repo: AccountQueries = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
):
    event = repo.create(event)
    account_repo.add_hosting(event)
    return event


@router.get("/api/events/{id}", response_model=EventOut)
def get_event(
    id: str,
    repo: EventQueries = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
):
    event = repo.get({"_id": ObjectId(id)})
    return event


@router.get("/api/events", response_model=EventsList)
def get_events(
    repo: EventQueries = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
):
    return EventsList(events=repo.get_list())


@router.delete("/api/events/{id}", response_model=bool)
def delete_event(
    id: str,
    remove_obj: AttendEvent,
    event_repo: EventQueries = Depends(),
    account_repo: AccountQueries = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
):
    deleted_event = event_repo.delete({"_id": ObjectId(id)})
    account_repo.remove_hosted_event(remove_obj)
    return deleted_event


@router.put("/api/events/{id}", response_model=EventOut)
async def update_event(
    id: str,
    event: EventIn,
    repo: EventQueries = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
):
    updated_event = repo.update(id, event)
    return updated_event


@router.put("/api/events/attend", response_model=EventOut)
async def attend_event(
    attend: AttendEvent,
    event_repo: EventQueries = Depends(),
    account_repo: AccountQueries = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
):
    updated_event = event_repo.add_attendee(attend)
    account_repo.add_attending(attend)
    return updated_event
