from .client import Queries
from models import Account, AccountIn
from pymongo.errors import DuplicateKeyError

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

    def update(self, email: str, info: AccountIn) -> Account:
        # Find the account with the specified email
        account = self.get(email)
        print("account from UPDATE:", account)
        if not account:
            return None

        # Update the account with the new information
        update_result = self.collection.update_one(
            {"email": email},
            {"$set": info.dict(exclude_unset=True)}
        )
        print("update_result from UPDATE:", update_result)
        # Check if the update was successful
        if update_result.modified_count == 1:
            print("email modified_count from UPDATE:", email)
            # Get the updated account from the database
            updated_account = self.get(info.email)
            return updated_account
        else:
            return None
