from .client import Queries
from models import (
    Account,
    AccountIn,
    AttendEvent,
    EventIn,
    AddFriend,
    AccountOut,
    PetIn,
    UpdateAccount,
)
from pymongo.errors import DuplicateKeyError
from typing import List
from bson.objectid import ObjectId


class DuplicateAccountError(ValueError):
    pass


class AccountQueries(Queries):
    DB_NAME = "animos-db"
    COLLECTION = "accounts"

    def get(self, email: str) -> Account:
        props = self.collection.find_one({"email": email})
        print("props from GET:", props)
        if not props:
            return None
        props["id"] = str(props["_id"])
        return Account(**props)

    def create(self, info: AccountIn, hashed_password: str) -> Account:
        props = info.dict()
        props["password"] = hashed_password
        try:
            self.collection.insert_one(props)
        except DuplicateKeyError:
            raise DuplicateAccountError()
        props["id"] = str(props["_id"])
        return Account(**props)

    def update(self, email: str, info: UpdateAccount) -> bool:
        filter = {"email": email}
        props = info.dict()
        new_values = {
            "$set": {
                "first_name": props["first_name"],
                "last_name": props["last_name"],
                "zipcode": props["zipcode"],
                "picture_url": props["picture_url"],
            }
        }
        updated_account = self.collection.find_one_and_update(
            filter, new_values, return_document=True
        )
        if updated_account is None:
            raise Exception("Account not found")
        print("update_account:", updated_account)
        return True

    def delete(self, email: str) -> bool:
        account = self.get(email)
        if not account:
            return False
        delete_result = self.collection.delete_one({"email": email})
        if delete_result.deleted_count == 1:
            return True
        else:
            return False

    def get_all(self) -> List[Account]:
        accounts = self.collection.find()
        account_list = []
        for account in accounts:
            account["id"] = str(account["_id"])
            account_list.append(Account(**account))
        return account_list

    def get_by_email(self, email: str) -> Account:
        props = self.collection.find_one({"email": email})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return Account(**props)

    def add_attending(self, attend: AttendEvent) -> Account:
        props = attend.dict()
        filter = {"_id": ObjectId(props["user_id"])}
        new_values = {"$push": {"attending_events": props["event_id"]}}
        result = self.collection.find_one_and_update(
            filter, new_values, return_document=True
        )
        if result is None:
            return Exception("User Not Found")
        result["id"] = str(result["id"])
        return Account(**result)

    def add_pet(self, pet: PetIn) -> Account:
        props = pet.dict()
        filter = {"_id": ObjectId(props["user_id"])}
        new_values = {"$push": {"pets": props["id"]}}
        result = self.collection.find_one_and_update(
            filter, new_values, return_document=True
        )
        if result is None:
            return Exception("User Not Found")
        result["id"] = str(result["_id"])
        return Account(**result)

    def add_hosting(self, event: EventIn) -> Account:
        props = event.dict()
        filter = {"_id": ObjectId(props["account_id"])}
        new_values = {"$push": {"hosted_events": props["id"]}}
        result = self.collection.find_one_and_update(
            filter, new_values, return_document=True
        )
        if result is None:
            return Exception("User Not Found")
        result["id"] = str(result["_id"])
        return Account(**result)

    def remove_hosted_event(self, event: AttendEvent) -> Account:
        props = event.dict()
        find_by = {"_id": ObjectId(props["user_id"])}
        remove_value = {"$pull": {"hosted_events": props["event_id"]}}
        result = self.collection.find_one_and_update(find_by, remove_value)
        if result is None:
            return Exception("User not found")
        result["id"] = str(result["_id"])
        return Account(**result)

    def follow_user(self, friend: AddFriend) -> AccountOut:
        props = friend.dict()
        requesting_user = self.collection.find_one(
            {"_id": ObjectId(props["requesting_user_id"])}
        )
        if not requesting_user:
            return Exception("Requesting User Not Found")
        receiving_user = self.collection.find_one(
            {"_id": ObjectId(props["user_id"])}
        )
        if not receiving_user:
            return Exception("Requested Friend Not Found")

        if "following_list" not in requesting_user:
            requesting_user["following_list"] = []
        requesting_user_filter = {"_id": ObjectId(props["requesting_user_id"])}
        requesting_user_new_values = {
            "$push": {"following_list": props["user_id"]}
        }
        self.collection.find_one_and_update(
            requesting_user_filter,
            requesting_user_new_values,
            return_document=True,
        )
        receiving_user_filter = {"_id": ObjectId(props["user_id"])}
        receiving_user_new_values = {
            "$push": {"follower_list": props["requesting_user_id"]}
        }
        result = self.collection.find_one_and_update(
            receiving_user_filter,
            receiving_user_new_values,
            return_document=True,
        )
        if result is None:
            return Exception("Requesting User Not Found")

        result["id"] = str(result["_id"])
        return Account(**result)
