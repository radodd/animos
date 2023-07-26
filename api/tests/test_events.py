from main import app
from fastapi.testclient import TestClient
from queries.events import EventQueries


client = TestClient(app)


class EmptyEventQueries:
    def get_list(self):
        return []


def test_get_events():
    app.dependency_overrides[EventQueries] = EmptyEventQueries
    response = client.get("/api/events/")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {"events": []}
