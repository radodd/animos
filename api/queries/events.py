from .client import Queries
from models import EventIn, EventOut


class EventQueries(Queries):
    DB_NAME = "animos-db"
    COLLECTION = "events"

    def create(self, event: EventIn) -> EventOut:
        props = event.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return EventOut(**props)

    def get(self, id) -> EventOut:
        result = self.collection.find_one(id)
        if result is None:
            raise Exception("Event Not Found")
        result["id"] = str(result["_id"])
        return EventOut(**result)

    def get_list(self):
        pass
