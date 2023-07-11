from pydantic import BaseModel
from bson.objectid import ObjectId
from pydantic import BaseModel
from typing import List
import datetime

class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value: ObjectId | str) -> ObjectId:
        if value:
            try:
                ObjectId(value)
            except:
                raise ValueError(f"Not a valid object id: {value}")
        return value


class AccountIn(BaseModel):
    email: str
    password: str
    full_name: str


class Account(AccountIn):
    id: PydanticObjectId


class AccountOut(BaseModel):
    id: str
    email: str
    full_name: str


class EventIn(BaseModel):
    name: str
    description: str
    capacity: int
    picture_url: str
    date_start: datetime.datetime
    date_end: datetime.datetime
    location_id: str
    account_id: str
    attendees: list


class EventOut(EventIn):
    id: str


class EventsList(BaseModel):
    events: List[EventOut]


class User(BaseModel):
    username: str
    first_name: str
    last_name: str
    email: str
    zipcode: str
    picture_url: str


class LocationIn(BaseModel):
    name: str
    zipcode: str
    description: str
    capacity: str
    picture_url: str


class Location(LocationIn):
    id: PydanticObjectId


class LocationOut(BaseModel):
    id: str
    name: str
    zipcode: str
    description: str
    capacity: str
    picture_url: str


class LocationList(BaseModel):
    locations: List[LocationOut]
