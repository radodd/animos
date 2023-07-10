import os
import pymongo

DATABASE_URL = os.environ["DATABASE_URL"]
client = pymongo.MongoClient(DATABASE_URL)

# DB_NAME = os.environ.get("animos-db")
# db = client[DB_NAME]

class Queries:
    @property
    def collection(self):
        db = client[self.DB_NAME]
        return db[self.COLLECTION]
