from fastapi import APIRouter, Depends, Response
from models import EventIn, EventOut, EventsList, AttendEvent, Error
from queries.events import EventQueries
from queries.accounts import AccountQueries
from bson.objectid import ObjectId
from typing import Union

router = APIRouter()


@router.post("/api/events", response_model=Union[EventOut, Error])
def create_event(
    response: Response,
    event: EventIn,
    repo: EventQueries = Depends(),
    account_repo: AccountQueries = Depends(),
):
    created_event = repo.create(event)
    account_repo.add_hosting(event)
    if event is None:
        response.status_code = 400
        return Error(message="Cannot find event")
    return created_event


@router.get("/api/events/{id}", response_model=Union[EventOut, Error])
def get_event(
    response: Response,
    id: str,
    repo: EventQueries = Depends(),
):
    event = repo.get({"_id": ObjectId(id)})
    if event is None:
        response.status_code = 400
        return Error(message="Cannot fetch event")
    return event


@router.get("/api/events", response_model=Union[EventsList, Error])
def get_events(
    response: Response,
    repo: EventQueries = Depends(),
):
    events = repo.get_list()
    if events is None:
        response.status_code = 400
        return Error(message="Cannot fetch events")
    return EventsList(events=repo.get_list())


@router.delete("/api/events/{id}", response_model=Union[bool, Error])
def delete_event(
    response: Response,
    id: str,
    remove_obj: AttendEvent,
    event_repo: EventQueries = Depends(),
    account_repo: AccountQueries = Depends(),
):
    deleted_event = event_repo.delete({"_id": ObjectId(id)})
    account_repo.remove_hosted_event(remove_obj)
    if deleted_event is False:
        response.status_code = 200
        return Error(message="Event Already Deleted or does not exist")
    return deleted_event


@router.put("/api/events/{id}", response_model=Union[EventOut, Error])
async def update_event(
    response: Response,
    id: str,
    event: EventIn,
    repo: EventQueries = Depends(),
):
    updated_event = repo.update(id, event)
    if updated_event is None:
        response.status_code = 400
        return Error(message="Cannot find event")
    return updated_event


@router.put("/api/events/attend", response_model=Union[EventOut, Error])
async def attend_event(
    response: Response,
    attend: AttendEvent,
    event_repo: EventQueries = Depends(),
    account_repo: AccountQueries = Depends(),
):
    updated_event = event_repo.add_attendee(attend)
    account_repo.add_attending(attend)
    if updated_event is None:
        response.status_code = 400
        return Error(message="Cannot find event")
    return updated_event
