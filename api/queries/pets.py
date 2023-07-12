from .client import Queries
from models import PetIn, PetOut
from typing import List
from bson.objectid import ObjectId
# from pymongo.errors import DuplicateKeyError

# class DuplicatePetError(ValueError):
#     pass


class PetQueries(Queries):
    DB_NAME = "animos-db"
    COLLECTION = "pets"

    def create(self, pet: PetIn) -> PetOut:
        props = pet.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return PetOut(**props)

    def get_pets(self) -> List[PetOut]:
        result = self.collection.find()
        petPropsList = list(result)

        for pet in petPropsList:
            pet["id"] = str(pet["_id"])
        return [PetOut(**props) for props in petPropsList]

    def get_pet(self, id) -> PetOut:
        result = self.collection.find_one(id)
        if result is None:
            raise Exception("Pet Not Found")
        result["id"] = str(result["_id"])
        return PetOut(**result)

    def update_pet(self, id: str, pet: PetIn) -> PetOut:
        filter = {"_id": ObjectId(id)}
        props = pet.dict()
        new_values = {"$set": dict(props)}
        result = self.collection.find_one_and_update(
            filter,
            new_values,
            return_document=True
        )
        if result is None:
            return Exception("Pet Not Found")
        result["id"] = str(result["_id"])
        return PetOut(**result)

    def delete_pet(self, id) -> bool:
        result = self.collection.delete_one(id)
        if result.deleted_count > 0:
            return True
        return False
