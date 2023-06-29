from pymongo import MongoClient
import os

DATABASE_URL = os.environ.get("mongodb://animos:password@mongo")
DB_NAME = os.environ.get("animos-db")

client = MongoClient(DATABASE_URL)
db = client[DB_NAME]
