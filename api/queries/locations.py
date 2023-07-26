from .client import Queries
from models import LocationIn, LocationOut
from typing import List
from bson import ObjectId


class LocationQueries(Queries):
    DB_NAME = "animos-db"
    COLLECTION = "locations"

    def list_locations(self) -> List[LocationOut]:
        props = self.collection.find()
        locationsList = list(props)

        for props in locationsList:
            props["id"] = str(props["_id"])
        return [LocationOut(**props) for props in locationsList]

    def get_location(self, id: str) -> LocationOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return LocationOut(**props)

    def create(self, location: LocationIn) -> LocationOut:
        props = location.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return LocationOut(**props)

    def update(self, id: str, location: LocationIn) -> LocationOut:
        props = location.dict()
        updated_props = self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": dict(props)},
            return_document=True
        )
        if updated_props is None:
            return Exception("Location not found")
        updated_props["id"] = str(updated_props["_id"])
        return LocationOut(**updated_props)

    def delete(self, id: str) -> bool:
        props = self.collection.find_one({"_id": ObjectId(id)})
        if props is None:
            return Exception("Location not found")
        self.collection.delete_one({"_id": ObjectId(id)})
        return True
