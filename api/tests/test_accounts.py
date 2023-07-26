from mongomock import MongoClient
import pytest
from fastapi.testclient import TestClient
from main import app
from models import AccountIn
from accounts_queries import AccountQueries


@pytest.fixture
def mock_mongo_client():
    return MongoClient()


@pytest.fixture
def override_account_queries(mock_mongo_client):
    return AccountQueries(mock_mongo_client)


def test_create_account(override_account_queries):
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
