from pydantic import BaseModel
from bson.objectid import ObjectId
from typing import List


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
    first_name: str
    last_name: str
    password: str
    zipcode: str
    picture_url: str
    friend_list: List[str]
    pets: List[str]
    hosted_events: List[str]
    attending_events: List[str]


class Account(AccountIn):
    id: PydanticObjectId


class AccountOut(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: str
    password: str
    zipcode: str
    picture_url: str
    friend_list: List[str]
    pets: List[str]
    hosted_events: List[str]
    attending_events: List[str]


class EventIn(BaseModel):
    name: str
    description: str
    capacity: int
    picture_url: str
    date_start: str
    date_end: str
    location_id: str
    account_id: str
    attendees: list


class EventOut(EventIn):
    id: str


class EventsList(BaseModel):
    events: List[EventOut]


# class User(BaseModel):
#     username: str
#     first_name: str
#     last_name: str
#     email: str
#     zipcode: str
#     picture_url: str


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


class PetIn(BaseModel):
    pet_name: str
    birth_adoption_date: str
    breed: str
    dietary_restrictions: str
    vibe: str
    size: str
    pet_picture_url: str
    user_id: str


class PetOut(PetIn):
    id: str


class PetsList(BaseModel):
    pets: List[PetOut]


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
