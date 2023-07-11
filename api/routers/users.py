from fastapi import APIRouter
from queries.client import user_collection
from models import User
from bson import ObjectId
from queries.users import users_serializer

user_api_router = APIRouter()


# Get list of all users
@user_api_router.get("/api/users")
async def get_users():
    if not user_collection.find():
        return {"status": "OK", "users": []}
    users = users_serializer(user_collection.find())
    return {"status": "OK", "data": users}



# Get a specific user
@user_api_router.get("/users/{id}")
async def get_user(id: str):
    user = users_serializer(user_collection.find({"_id": ObjectId(id)}))
    return {"status": "OK", "user": user}


# Create a user
@user_api_router.post("/users")
async def post_user(user: User):
    _id = user_collection.insert_one(dict(user))
    user = users_serializer(user_collection.find({"_id": _id.inserted_id}))
    return {"status": "OK", "user": user}


# Update a specific user
@user_api_router.put("/users/{id}")
async def update_user(id: str, user: User):
    user_collection.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": dict(user)}
    )
    user = users_serializer(user_collection.find({"_id": ObjectId(id)}))
    return {"status": "OK",
            "user": user}


# Delete a specific user
@user_api_router.delete("/users/{id}")
async def delete_user(id: str):
    user_collection.find_one_and_delete({"_id": ObjectId(id)})
    return {"status": "OK",
            "message": "User has been deleted",
            "user": []}
