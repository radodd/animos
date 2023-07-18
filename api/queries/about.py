from .client import Queries
from models import CreatorIn, CreatorOut
from typing import List
from bson.objectid import ObjectId

class AboutQueries(Queries):
    DB_NAME = "animos-db"
    COLLECTION = "about"

    def create(self, creator: CreatorIn) -> CreatorOut:
        result = creator.dict()
        self.collection.insert_one(result)
        result["id"] = str(result["_id"])
        return CreatorOut(**result)

    def get_creators(self) -> List[CreatorOut]:
        result = self.collection.find()
        results = list(result)
        for result in results:
            result["id"] = str(result["_id"])
        return [CreatorOut(**result) for result in results]
