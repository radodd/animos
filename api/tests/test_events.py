from main import app
from fastapi.testclient import TestClient
from queries.events import EventQueries
from routers.auth import authenticator


client = TestClient(app)


class EmptyEventQueries:
    def get_list(self):
        return []


class FailedEventQueries:
    def get_list(self):
        return None


def mock_logged_in_account():
    return True


def mock_not_logged_in():
    return None


def test_get_events():
    app.dependency_overrides[EventQueries] = EmptyEventQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = mock_logged_in_account
    response = client.get("/api/events/")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {"events": []}


# def test_get_events_logged_in_failed_query():
#     app.dependency_overrides[EventQueries] = FailedEventQueries
#     app.dependency_overrides[
#         authenticator.try_get_current_account_data
#     ] = mock_logged_in_account
#     response = client.get("/api/events/")
#     app.dependency_overrides = {}
#     assert response.status_code == 400
#     assert response.json() == {"message": "Cannot fetch events"}
