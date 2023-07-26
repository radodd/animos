from pydantic import BaseModel
from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountQueries

client = TestClient(app)


class AccountOut(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: str
    zipcode: str
    picture_url: str
    follower_list: list
    following_list: list
    pets: list
    hosted_events: list
    attending_events: list


def fake_account_create(self, info, hashed_password):
    account_data = {
        "id": "fake_id",
        "first_name": info.first_name,
        "last_name": info.last_name,
        "email": info.email,
        "zipcode": info.zipcode,
        "picture_url": info.picture_url,
        "follower_list": [],
        "following_list": [],
        "pets": [],
        "hosted_events": [],
        "attending_events": [],
    }
    return AccountOut(**account_data)


def test_create_account():
    app.dependency_overrides[AccountQueries] = fake_account_create

    data = {
        "email": "test@example.com",
        "first_name": "John",
        "last_name": "Doe",
        "password": "testpassword",
        "zipcode": "12345",
        "picture_url": "https://example.com/pic.jpg",
    }

    response = client.post("/api/accounts", json=data)

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert "id" in response.json()
    assert response.json()["first_name"] == data["first_name"]
    assert response.json()["last_name"] == data["last_name"]
    assert response.json()["email"] == data["email"]
