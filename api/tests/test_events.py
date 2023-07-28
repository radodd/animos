from main import app
from fastapi.testclient import TestClient
from queries.events import EventQueries
from models import EventIn, EventOut
from bson.objectid import ObjectId

client = TestClient(app)


class EmptyEventQueries:
    def get_list(self):
        return []


class MockEventQueries(EventQueries):
    def __init__(self):
        self.events = {}

    def update(self, id: str, event: EventIn):
        if id not in self.events:
            return None
        self.events[id] = event
        return EventOut(id=id, **event.dict())


def test_update_event():
    event_id = str(ObjectId())
    event_data = {
        "name": "Fun Event that was updated",
        "description": "Updated event description",
        "capacity": 1000,
        "picture_url": "www.picture.com",
        "date_start": "2023-07-27T10:00:00",
        "date_end": "2023-07-28T16:00:00",
        "location_id": "kj213j12d2313",
        "account_id": "ceawerr2312sdaa34",
        "attendees": ["12312sdadc", "aca234dasw2q131"],
    }
    response = client.put(f"/api/events/{event_id}", json=event_data)
    if response.status_code == 200:
        assert response.json() == {"id": event_id, **event_data}
    else:
        assert response.status_code == 404
        assert response.json() == {"detail": "Event not found"}


def test_get_events():
    app.dependency_overrides[EventQueries] = EmptyEventQueries
    response = client.get("/api/events/")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {"events": []}
