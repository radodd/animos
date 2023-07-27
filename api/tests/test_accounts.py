from pydantic import BaseModel
from fastapi.testclient import TestClient
from main import app
from typing import List, Optional

client = TestClient(app)


class AccountOut(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: str
    password: str
    zipcode: Optional[str]
    picture_url: Optional[str]
    follower_list: Optional[List[str]]
    following_list: Optional[List[str]]
    pets: Optional[List[str]]
    hosted_events: Optional[List[str]]
    attending_events: Optional[List[str]]


def fake_get_current_account_data():
    account = AccountOut(
        id="user123",
        first_name="Pablo",
        last_name="Escobar",
        email="mousta.chio@ihateunittests.com",
        password="hashed_password",
        zipcode="62150",
        picture_url="https://catnip.com/high_cats.jpg",
        follower_list=["user456", "user789"],
        following_list=["user456"],
        pets=["Michou", "Robert"],
        hosted_events=["event123", "event456"],
        attending_events=["event789"]
    )
    return account.__dict__
