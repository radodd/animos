
from .client import Queries
from models import Account, AccountIn, AttendEvent, EventIn, UpdateAccount
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
        print("props:", props)
        # data = {"first_name": props.first_name, "last_name": props.last_name, "zipcode": props.zipcode, "picture_url": props.picture_url}
        new_values = {"$set": {"first_name": props["first_name"], "last_name": props["last_name"], "zipcode": props["zipcode"], "picture_url": props["picture_url"]}}
        updated_account = self.collection.find_one_and_update(filter, new_values, return_document=True)
        if updated_account is None:
            return Exception("Account not found")
        # updated_account["id"] = str(updated_account["_id"])
        print("update_account:", updated_account)
        return True
        # return Account(**updated_account)


        # if not account:
        #     return None
        # # Update the account with the new information
        # update_result = self.collection.update_one(
        #     {"email": email},
        #     {"$set": info.dict(exclude_unset=True)}
        # )
        # print("update_result from UPDATE:", update_result)
        # # Check if the update was successful
        # if update_result.modified_count == 1:
        #     print("email modified_count from UPDATE:", email)
        #     # Get the updated account from the database
        #     updated_account = self.get(info.email)
        #     return updated_account
        # else:
        #     return None


    def delete(self, email: str) -> bool:
        # Find the account with the specified email
        account = self.get(email)
        if not account:
            return False
        # Delete the account from the database
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
            filter,
            new_values, return_document=True
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
            filter,
            new_values, return_document=True
        )
        if result is None:
            return Exception("User Not Found")
        result["id"] = str(result["_id"])
        return Account(**result)
