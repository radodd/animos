from .client import Queries
from models import ThingIn, ThingOut
from typing import List


class ThingQueries(Queries):
    DB_NAME = "thing_db"
    COLLECTION = "things_collection"

    def create(self, thing: ThingIn) -> ThingOut:
        props = thing.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        print("CREATE PROPS AQUI:", props)
        return ThingOut(**props)
    
    def get_all(self) -> List[ThingOut]:
        result = self.collection.find()
        print("RESULT HERE:", result)
        thingPropsList = list(result)
   
        for thing in thingPropsList:
            thing["id"] = str(thing["_id"])
        print("LOOK HERE!!!!!!", thingPropsList)
        return [ThingOut(**props) for props in thingPropsList]
        
        