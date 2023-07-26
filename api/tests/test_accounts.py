from mongomock import MongoClient
import pytest
from main import app
from fastapi.testclient import TestClient
from models import AccountIn


@pytest.fixture
def mock_mongo_client():
    return MongoClient()


def test_create_account(mock_mongo_client):
    client = TestClient(app)
    info = AccountIn(
        email="example@example.com",
        first_name="John",
        last_name="Doe",
        password="password",
        zipcode="12345",
        picture_url="https://example.com/picture.jpg",
        follower_list=["user1", "user2"],
        following_list=["user3", "user4"],
        pets=["dog", "cat"],
        hosted_events=["event1", "event2"],
        attending_events=["event3", "event4"]
    )

    response = client.post("/api/accounts", json=info.dict())
    assert response.status_code == 200
    assert "account" in response.json()
