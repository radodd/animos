from main import app
from fastapi.testclient import TestClient
from queries.accounts import AccountQueries

client = TestClient(app)


class GetAllAccountQueries:
    def get_all(self):
        return []


def test_get_all_users():
    # arrange
    app.dependency_overrides[AccountQueries] = GetAllAccountQueries
    # Act
    response = client.get("/api/accounts")
    # Assert
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
    # Cleanup
    app.dependency_overrides = {}
