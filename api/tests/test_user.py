from main import app
from fastapi.testclient import TestClient
from unittest.mock import MagicMock
from models import Account
from queries.accounts import AccountQueries


client = TestClient(app)


class GetAllAccountQueries:
    def get_all(self):
        return []


def test_get_all_users():
    app.dependency_overrides[AccountQueries] = GetAllAccountQueries
    response = client.get("/api/accounts")
    assert response.status_code == 200
    response_data = response.json()
    assert isinstance(response_data, list)
    for user in response_data:
        assert "id" in user
        assert "first_name" in user
        assert "last_name" in user
        assert "email" in user
        assert "password" in user
        assert "zipcode" in user
        assert "picture_url" in user
        assert "follower_list" in user
        assert "following_list" in user
        assert "pets" in user
        assert "hosted_events" in user
        assert "attending_events" in user
    app.dependency_overrides = {}


class MockAccountQueries:
    def get_by_email(self, email: str) -> Account:
        if email == "Ihate@unittests.com":
            return Account(
                id="123456789123123456789123",
                email=email,
                first_name="Cat",
                last_name="Nip",
                password="highcats",
                zipcode="62150",
            )
        return None


def test_get_account_by_email():
    email = "Ihate@unittests.com"
    mock_account = Account(
        id="123456789123123456789123",
        email=email,
        first_name="Cat",
        last_name="Nip",
        password="highcats",
        zipcode="62150",
    )

    mock_get_by_email = MagicMock(return_value=mock_account)
    AccountQueries.get_by_email = mock_get_by_email

    response = client.get(f"/api/accounts/{email}")
    assert response.status_code == 200
    assert response.json() == {
        "id": "123456789123123456789123",
        "email": email,
        "first_name": "Cat",
        "last_name": "Nip",
        "password": "highcats",
        "zipcode": "62150",
        "picture_url": None,
        "follower_list": None,
        "following_list": None,
        "pets": None,
        "hosted_events": None,
        "attending_events": None,
    }

    mock_get_by_email.return_value = None
    response = client.get("/api/accounts/nonexistent@example.com")
    assert response.status_code == 404
