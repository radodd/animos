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
    # Simulate account creation
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
    # Arrange
    app.dependency_overrides[AccountQueries] = fake_account_create

    # Test data for account creation
    data = {
        "email": "test@example.com",
        "first_name": "John",
        "last_name": "Doe",
        "password": "testpassword",
        "zipcode": "12345",
        "picture_url": "https://example.com/pic.jpg",
    }

    # Act
    response = client.post("/api/accounts", json=data)

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert "id" in response.json()
    assert response.json()["first_name"] == data["first_name"]
    assert response.json()["last_name"] == data["last_name"]
    assert response.json()["email"] == data["email"]
    assert response.json()["zipcode"] == data["zipcode"]
    assert response.json()["picture_url"] == data["picture_url"]
    assert len(response.json()["follower_list"]) == 0
    assert len(response.json()["following_list"]) == 0
    assert len(response.json()["pets"]) == 0
    assert len(response.json()["hosted_events"]) == 0
    assert len(response.json()["attending_events"]) == 0
