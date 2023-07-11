from .client import Queries
from models import EventIn, EventOut
from typing import List
from bson.objectid import ObjectId


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

    def get_list(self) -> List[EventOut]:
        result = self.collection.find()
        result_list = list(result)
        for result in result_list:
            result["id"] = str(result["_id"])
        return [EventOut(**result) for result in result_list]

    def delete(self, id) -> bool:
        result = self.collection.delete_one(id)
        if result.deleted_count > 0:
            return True
        return False

    def update(self, id: str, event: EventIn) -> EventOut:
        filter = {"_id": ObjectId(id)}
        props = event.dict()
        new_values = {"$set": dict(props)}
        result = self.collection.find_one_and_update(
            filter,
            new_values,
            return_document=True
        )
        if result is None:
            return Exception("Event Not Found")
        result["id"] = str(result["_id"])
        return EventOut(**result)
