from .client import Queries
from models import EventIn, EventOut

class EventQueries(Queries):
  DB_NAME = "animos-db"
  COLLECTION = "accounts"

  def create(self, event: EventIn) -> EventOut:
    props = event.dict()
    self.collection.insert_one(props)
    props["id"] = str(props["_id"])
    return EventOut(**props)
